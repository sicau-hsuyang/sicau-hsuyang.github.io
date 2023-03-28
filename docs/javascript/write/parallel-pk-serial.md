## 异步加法

现在云计算早已融入了我们的日常生活，分布式服务随处可见，比如打开一个知名点儿的`App`，常常能看到“云计算服务由某某某提供”这类的字样。
所以，在有些时候，可能某些计算需要在远端进行，这就是我们这个问题产生的原因。

比如，要实现两个数的加法：

```js
function asyncAdd(a, b, callback) {
  // 遵循nodejs 异步API的约定
  // 1、参数列表最后一个为回调函数
  // 2、回调函数第一个参数为err，如果为null说明程序正常运行，后面是正常的参数，如果不为null，所以异步任务的执行过程中有错误产生。
  setTimeout(() => {
    callback(null, a + b);
  }, 1000);
}
```

可以使用`promisify`将其转为一个基于`Promise`的异步加法。

```js
const add = promisify(asyncAdd);
```

或者直接将其设计为基于`Promise`的异步加法。

```js
function add(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random();
      // 为了模拟异常的场景，假设有3%的概率抛出错误
      if (rnd <= 0.03) {
        reject(new Error("an error has occurred when calculating"));
      }
      resolve(a + b);
    }, 1000);
  });
}
```

现在有一个新的问题，一个数组有很多数，我们需要用这个异步加法对其进行求和。

### 串行

串行处理的思路很简单，就想普通数组的求和过程一样。

```js
function serialAccumulateAsync(data) {
  return new Promise((resolve, reject) => {
    // try-catch只能捕获同步错误
    try {
      data
        .reduce((prevVal, curVal) => {
          return Promise.resolve(prevVal).then((val) => {
            return add(val, curVal);
          });
        })
        .then(resolve)
        .catch(reject);
    } catch (exp) {
      reject(exp);
    }
  });
}
```

但是，串行的问题就是浪费了时间，每次求和都要等待，这个解法是一个非常不划算的（以`add`函数延迟`1S`计算，数组长度为`N`，计算要`N-1秒`，这是一个线性时间花费）。

### 并行

虽然`JS`没有多线程的能力，但是我们却可以通过设计让异步加法变的更快，其思路跟归并排序是一样的。

将一个数组，两两归并，得到一个新数组，如果新数组的**长度`大于1`，说明还能继续重复上述过程**，如果得到的新数组**长度`等于1`，说明计算已经完成了**，这个元素就是我们要求的和。

```js
function parallelAccumulateAsync(data) {
  if (data.length === 1) {
    return Promise.resolve(data[0]);
  }
  return new Promise((resolve, reject) => {
    // try-catch只能捕获同步错误
    try {
      let mergedArrPromise = [];
      for (let i = 0; i < data.length; i += 2) {
        // 有可能最后一个元素不存在，data[i + 1]可能是undefined
        mergedArrPromise.push(add(data[i], data[i + 1] || 0));
      }
      // 不用担心Promise.all的then方法部署的时候异步任务已经执行完了，因为then里面是在微任务队列中执行，即add的逻辑是在
      // 微任务队列的执行的，此刻还有同步任务代码逻辑需要执行，同步任务肯定是比微任务快的
      Promise.all(mergedArrPromise)
        .then((arr) => {
          // 递归调用求和函数
          return parallelAccumulateAsync(arr);
        })
        .then(resolve)
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}
```

根据`归并排序`中所学到的知识，`归并排序`的时间复杂度是`N*logN`，我们在这个计算过程中，假设数组长度是`10`个，第一次需要花费`1S`（`5个`任务同时并行），第二次需要花费`1S`(`3个`任务同时并行)，第三次需要花费`1S`，（`2个`任务同时并行），第四次再尝试计算的时候，发现数组长度已经为`1`，不再计算，整个过程就是二分的效果，所以总体的时间花费是`logN秒`，相比较串行计算，这个计算过程可是提高了非常多的效率。

## 测试

```js
function add(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random();
      // 为了模拟异常的场景，假设有3%的概率抛出错误
      if (rnd <= 0.03) {
        // 为了测试时间，就不模拟错误的场景了
        reject(new Error("an error has occurred when calculating"));
      }
      resolve(a + b);
    }, 1000);
  });
}

function parallelAccumulateAsync(data) {
  if (data.length === 1) {
    return Promise.resolve(data[0]);
  }
  return new Promise((resolve, reject) => {
    try {
      let mergedArrPromise = [];
      for (let i = 0; i < data.length; i += 2) {
        // 有可能最后一个元素不存在，data[i + 1]可能是undefined
        mergedArrPromise.push(add(data[i], data[i + 1] || 0));
      }
      // 不用担心Promise.all的then方法部署的时候异步任务已经执行完了，因为then里面是在微任务队列中执行，即add的逻辑是在
      // 微任务队列的执行的，此刻还有同步任务代码逻辑需要执行，同步任务肯定是比微任务快的
      Promise.all(mergedArrPromise)
        .then((arr) => {
          // 递归调用求和函数
          return parallelAccumulateAsync(arr);
        })
        .then(resolve)
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}

function serialAccumulateAsync(data) {
  return new Promise((resolve, reject) => {
    try {
      data
        .reduce((prevVal, curVal) => {
          return Promise.resolve(prevVal).then((val) => {
            return add(val, curVal);
          });
        })
        .then(resolve)
        .catch(reject);
    } catch (exp) {
      reject(exp);
    }
  });
}

// 待处理数据
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let now = Date.now();
console.log("并行异步任务开始了...");
parallelAccumulateAsync(data)
  .then((sum) => {
    console.log("并行异步任务完成了...");
    console.log(sum);
    console.log(Date.now() - now); // 约4S
  })
  .catch((err) => {
    console.log("并行异步任务出错了...");
    console.log(err);
  });

now = Date.now();
console.log("串行异步任务开始了...");
serialAccumulateAsync(data)
  .then((sum) => {
    console.log("串行异步任务完成了...");
    console.log(sum);
    console.log(Date.now() - now); // 约9S
  })
  .catch((err) => {
    console.log("串行异步任务出错了...");
    console.log(err);
  });
```
