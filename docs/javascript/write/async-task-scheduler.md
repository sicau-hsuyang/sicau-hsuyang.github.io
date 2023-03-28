## 异步任务调度器

这是一道`字节跳动`的面试题，我觉得是一道非常有实际意义的题。

有以下代码，并且期待如下输出，请实现`TaskScheduler`类

```js
function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const taskScheduler = new TaskScheduler();

function addTask(time, name) {
  taskScheduler()
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(10000, 1); // 10000ms后输出 任务1完成
addTask(5000, 2); // 5000ms后输出 任务2完成
addTask(3000, 3); // 8000ms后输出 任务3完成
addTask(4000, 4); // 12000ms后输出 任务4完成
addTask(5000, 5); // 15000ms后输出 任务5完成
```

先分析一下这个输出流程，前两个异步任务，加进去，正常情况，如果不受限制的话，`5S`后输出`任务2`,`10S`后输出`任务1`，但是第三个任务加进去的时候，却是`8S`后输出，说明什么呢，**说明这个任务调度器最多只能支持`2个`异步任务同时进行**，`第2个`异步任务在`5S`后完成，此时`任务3`能进来了，过了`3S`（即`8S`时刻）, `任务3`完成，如果基于我们上述猜测的话，`第4个`任务已经能进来了，再过`2S`，`任务1`已经能够完成了(即第`10S`)，此刻`任务5`能够进来了；再过`2S`（即第`12S`），`任务4`完成了，最后`任务5`在第`15S`的时候完成。

有了这铺垫之后，我们就知道这个异步任务调度器的实现要点了。

首先做这题需要有一个知识铺垫，如何让`Promise`停在那儿等待异步任务的完成，我在[`设计模式`-`观察者模式`](/design-pattern/watcher.html)那一节有阐述过曾经我改写`SDK`的一个经历，里面用发布订阅模式实现了`Promise`的暂停。**其关键就是在于你对`Promise`理解的深度，`Promise`跟返回内容无关，关键是你需要把它的两个触发器(`resolve`和`reject`)记录下来，在你希望的时刻调用。**

```js
class AsyncTaskScheduler {
  /**
   * 定义当前正在执行的异步任务
   */
  runningTask = 0;
  /**
   * 定义任务调度器允许的最大异步并发量
   */
  maxTask = 2;
  /**
   * 异步任务队列，用于记录暂时无法处理稍候需要处理的内容
   */
  asyncTaskQueue = [];
  /**
   * 定义方法，供外界任务内容加入到当前的调度器中执行
   */
  add(fn) {
    return new Promise((resolve, reject) => {
      // 如果当前没有超出最大的任务并发限制，当前任务可以直接执行
      if (this.runningTask < this.maxTask) {
        // 标记当前运行中的任务量增加1
        this.runningTask++;
        // 将外部函数传入的值包裹成Promise(因为有可能用户传递的不是Promise)
        Promise.resolve(fn())
          .then((response) => {
            // 将来在异步任务完成的时候，让运行中的异步任务减少
            this.runningTask--;
            // 返回异步任务的内容
            resolve(response);
            // 此刻外部可能已经堆积了很多异步任务待处理了，因此，需要处理pending中的异步任务
            this.run();
          })
          .catch((err) => {
            // 对外界报告错误，并且继续执行pending中的异步任务
            this.runningTask--;
            reject(err);
            this.run();
          });
      } else {
        // 将任务加入到异步队列中，在将来执行，注意在这儿一定要把resolve和reject一并带上，将来外部作用域才能改变这个Promise的状态
        this.asyncTaskQueue.push({
          resolve,
          reject,
          fn,
        });
      }
    });
  }
  /**
   * 处理延时等待的异步任务
   */
  run() {
    // while的退出条件大家可以想一下为什么是这样？因为不能超过最大允许的并发量，并且还必须要有那么多pending的任务等待做才行
    while (this.asyncTaskQueue.length && this.runningTask < this.maxTask) {
      const task = this.asyncTaskQueue.shift();
      // 取出延迟执行的异步任务
      const { fn, resolve, reject } = task;
      // 标记当前进行中的异步任务量增加
      this.runningTask++;
      fn()
        .then((response) => {
          // 异步任务完成，运行中的异步任务递减
          this.runningTask--;
          resolve(response);
          // 继续运行还在等待执行中的异步任务
          this.run();
        })
        .catch((err) => {
          // 异步任务完成，运行中的异步任务递减
          this.runningTask--;
          reject(err);
          // 继续运行还在等待执行中的异步任务
          this.run();
        });
    }
    // 另外，为什么我没有用Promise.all或者Promise.allSettled，因为这两个API都取决于所有Promise状态的改变，实际上我们并不需要等所有的都执行完，
    // 要珍惜宝贵的并发资源，完成一个，等待的任务就要去执行一个。
    // 除此之外，为什么run方法的递归调用为什么写在了then和catch里面而不是写在while后面，因为是异步任务，写在外面，可能上一轮的任务并没有完成，
    // 然后不断的去调用run，增加了无意义的尝试次数，写在then和catch里面一定能够确定的是再调run方法的时候有了并发的资源可用了。
  }
}
```
