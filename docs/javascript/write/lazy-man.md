## 设计`LazyMan`类

### 1、要求

设计一个`LazyMan`函数，能够满足一下输出：

```js
LazyMan("Tony");
// Hi I am Tony

LazyMan("Tony").sleep(10).eat("lunch");
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan("Tony").eat("lunch").sleep(10).eat("dinner");
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan("Tony")
  .eat("lunch")
  .eat("dinner")
  .sleepFirst(5)
  .sleep(10)
  .eat("junk food");
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```

### 2、分析

首先观察，调用构造函数（因为我为了`jest`测试方便，本文以一个类的形式实现的）或者调用`eat`方法，**看起来**(实际上，另说嘛)好像是立即输出了内容，调用`sleetFirst`需要先进行等待然后才可以执行`eat`的内容，调用`sleep`看起来就是一个普通的延迟任务，不会导致`eat`的执行顺序改变。

这个实现的难点在于第三个测试用例，连续调用了两次`eat`方法，但是一旦调用了`sleetFirst`方法，反而先执行的是等待，根据事件轮询常考的知识点，可以一下就有一个大概的思路，`eat`方法肯定不是在同步代码执行的，如果是在`setTimeout(() => {}, 0)` 这样的宏任务执行的话，那就说得通了，因为连续调用 `2`次`eat`都在执行同步代码，调用`sleepFirst`也是同步代码，下一个事件轮循真正开始干活儿，并且`eat`方法在调用前每次都要先清空定时器。

这类异步问题，`99%`都是基于队列来实现的。

另外，可以看到的是，`sleepFirst`优先级明显要高于`eat`和`sleep`，那么，有了权重的概念，本文是可以用`堆`来实现的。

如果不用`堆`来做的话，那就用`2`个队列（不过，如果后续需要增加不同权重的任务类型，那代码就得修改成基于`堆`实现，这是跑不掉的），所以，本着满足简单，本文就不以堆来实现了。

大概描绘一下实现思路，每个操作都产生一个`Promise`，优先级高的加到高优先级队列里，优先级低的加到普通队列里，开始执行的时候，根据优先级取出所有的任务组合成一个新队列（原来的也要清空），利用这个新队列构建一个`Promise`链，上一个`Promise`状态改变才能执行下一个异步任务。

构建`Promise`链也就是这个题目的核心，也是刷这道面试题的实际意义，如果你看过`axios`的源码的话，就明白怎么做，**`axios`的拦截器就是用的是`Promise`链处理的**

构建`Promise链`使用递归的实现非常简单的，其原理就跟`async`的编译结果差不多：

```js
/**
 * @params { Array<Task> } 任务队列
 */
function fn(list) {
  if (list.length <= 0) {
    return;
  }
  const task = list.shift();
  task().then(fn);
}
```

用迭代来做的话，这个操作就比较难懂了：

```js
function build(list) {
  // 定义一个用于开始迭代的Promise，其实也是为了方便编程
  let p = Promise.resolve();
  // 不处理完成所有的异步任务不结束
  while (list.length) {
    // 取出一个任务
    const task = list.shift();
    // 将当前的task部署在上一个Promise的then方法上，令p = p.then(task)，
    // 相当于得到了task()执行返回的结果，从而可以在同步的代码中部署出一个Promise链。
    // 需要注意的是，这个时刻只是部署，至于触发，还是得等到任务节点的状态改变，
    // 这个写法就是axios源码中对拦截器管理的实现
    p = p.then(task);
  }
}
```

这个实现，一定不要朝着首先取出一个任务节点，再取出一个节点，两个节点进行关联这种思路做，因为第二个否则会越走越远了。

以下是<Badge type="error">错误</Badge>的实现：

```js
function build(list) {
  const task = list.shift();
  while (task) {
    const nextTask = list.shift();
    if (nextTask) {
      // 很明显，此刻的nextTask已经部署了
      task().then(nextTask);
    } else {
      task();
    }
    // 如果将nextTask交给task，下轮循环进来的时候，task执行就执行了，
    // 那就会出现后面的任务跑到前面任务执行的错误
    task = nextTask;
  }
}
```

### 3、递归实现

```ts
export class LazyMan {
  private emergencyQueue: Array<() => Promise<void>> = [];

  private normalQueue: Array<() => Promise<void>> = [];

  private timer: NodeJS.Timeout | null = null;

  done: null | Function = null;

  constructor(name: string) {
    console.log("Hi I am " + name);
  }

  private wrapperAwaitTask(second: number) {
    return (msg: string) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          if (msg) {
            console.log(msg);
          }
          resolve();
        }, second * 1000);
      });
  }

  setFinish(fn: Function) {
    // 这个方法是给Jest用的，可以无需关心
    this.done = fn;
  }

  sleepFirst(second: number) {
    const task = this.wrapperAwaitTask(second);
    this.emergencyQueue.push(() => task("等待了" + second + "秒..."));
    return this;
  }

  sleep(second: number) {
    const task = this.wrapperAwaitTask(second);
    this.normalQueue.push(() => task("等待了" + second + "秒..."));
    return this;
  }

  private run() {
    this.timer = null;
    const queue: Array<() => Promise<void>> = [
      ...this.emergencyQueue,
      ...this.normalQueue,
      // 这个任务也是给Jest通知异步任务完成的，不用Jest做测试可以忽略这个函数
      async () => {
        this.done && this.done();
        this.done = null;
      },
    ];
    this.emergencyQueue.length = 0;
    // this.emergencyQueue = [];
    this.normalQueue.length = 0;
    // this.normalQueue = [];
    const fn = () => {
      if (queue.length <= 0) {
        return;
      }
      const task = queue.shift();
      task!().then(() => {
        fn();
      });
    };
    fn();
  }

  eat(meal: string) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const task = this.wrapperAwaitTask(0);
    this.normalQueue.push(() => task("I am eating " + meal));
    this.timer = setTimeout(() => {
      this.run();
    }, 0);
    return this;
  }
}
```

### 4、迭代实现

```ts
export class LazyMan {
  private emergencyQueue: Array<() => Promise<void>> = [];

  private normalQueue: Array<() => Promise<void>> = [];

  private timer: NodeJS.Timeout | null = null;

  done: null | Function = null;

  constructor(name: string) {
    console.log("Hi I am " + name);
  }

  private wrapperAwaitTask(second: number) {
    return (msg: string) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          if (msg) {
            console.log(msg);
          }
          resolve();
        }, second * 1000);
      });
  }

  setFinish(fn: Function) {
    this.done = fn;
  }

  sleepFirst(second: number) {
    const task = this.wrapperAwaitTask(second);
    this.emergencyQueue.push(() => task("等待了" + second + "秒..."));
    return this;
  }

  sleep(second: number) {
    const task = this.wrapperAwaitTask(second);
    this.normalQueue.push(() => task("等待了" + second + "秒..."));
    return this;
  }

  private run() {
    const queue: Array<() => Promise<void>> = [
      ...this.emergencyQueue,
      ...this.normalQueue,
      async () => {
        this.done && this.done();
        this.done = null;
      },
    ];
    // 此处可以采用这种变通的方法清空数组，因为这个跟框架无关，不需要关心数据的响应式，如果在Vue框架内，就不能用这种写法了，数组无法监听改变
    this.emergencyQueue.length = 0;
    // this.emergencyQueue = [];
    this.normalQueue.length = 0;
    // this.normalQueue = [];

    // 此处是在构建Promise链
    let p = Promise.resolve();
    while (queue.length) {
      const task = queue.shift();
      p = p.then(() => {
        return task!();
      });
    }
  }

  eat(meal: string) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const task = this.wrapperAwaitTask(0);
    this.normalQueue.push(() => task("I am eating " + meal));
    this.timer = setTimeout(() => {
      this.run();
    }, 0);
    return this;
  }
}
```

### 5、测试用例

```ts
import { LazyMan } from "./LazyMan";

describe("lazy man design", () => {
  it("case 1", (done) => {
    const man = new LazyMan("Tony");
    man.setFinish(done);
    man.sleep(10).eat("lunch");
  }, 100000);

  it("case 2", (done) => {
    const man = new LazyMan("Tony");
    man.setFinish(done);
    man.eat("lunch").sleep(10).eat("dinner");
  }, 100000);

  it("case 3", (done) => {
    const man = new LazyMan("Tony");
    man.setFinish(done);
    man.eat("lunch").eat("dinner").sleepFirst(5).sleep(10).eat("junk food");
  }, 100000);
});
```
