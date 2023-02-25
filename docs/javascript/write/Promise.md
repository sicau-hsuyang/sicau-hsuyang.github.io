## Promise

`Promise`的手写可以算的是前端面试中编码题中地狱级别的了，如果读者有幸遇到过，那么恭喜你，你可真是幸运呢。

这几年也看过很多版本的手写`Promise`实现了，我觉得都不怎么样（点名批评掘金的一些文章，纯属代码搬运工），某一天，在知乎上看到了一个前辈的文章，觉得挺好，因此本文中的实现，基本上参考[这里](https://github.com/xieranmaya/blog/issues/3)，原文中是用`ES5`的构造函数的形式实现的，但是我觉得不够优雅，于是采用的是`ES6`的`class`写法。

首先，`Promise`必须有一个构造器，里面传入的参数是我们部署的函数，并且这个函数有两个入参，一个是`resolve`，另一个是`reject`，这都是`Promise`内部的函数，当`Promise`执行的时候，会将其作为参数传递给我们部署的函数。

```js
/**
 * 定义Promise的三种状态
 */
const PENDING = "pending";

const FULFILLED = "fulfilled";

const REJECTED = "rejected";

class MyPromise {
  /**
   * 定义Promise的初始状态，初始状态为pending
   */
  state = PENDING;
  /**
   * 定义Promise的初始值，初始值为undefined
   */
  val = undefined;
  /**
   * 定义Promise的错误原因，初始值为undefined
   */
  reason = undefined;

  resolve = (val) => {
    // 只有状态为pending状态的才能变为FULFILLED
    if (this.state === PENDING) {
      this.val = val;
      this.state = FULFILLED;
    }
  };

  reject = (reason) => {
    // 只有状态为pending状态的才能变为REJECTED
    if (this.state === PENDING) {
      this.reason = reason;
      this.state = REJECTED;
    }
  };

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (exp) {
      this.reject(exp);
    }
  }
}
```

以上代码是最简单的实现，手写`Promise`有个基本的雏形了。

回想一下，我们在实际代码中，经常这样干：

```js
function doTask() {
  return new Promise((resolve, reject) => {
    // 模拟一些异步操作
    setTimeout(() => {
      reject(new Error("asynchronous task error"));
    }, 5000);
  });
}
```

很明显，`try-catch`是同步任务的代码，这个`setTimeout`的错误是捕获不了的。

因此，上述的代码进行第一步改造。

```js
/**
 * 定义Promise的三种状态
 */
const PENDING = "pending";

const FULFILLED = "fulfilled";

const REJECTED = "rejected";

class MyPromise {
  /**
   * 定义Promise的初始状态，初始状态为pending
   */
  state = PENDING;
  /**
   * 定义Promise的初始值，初始值为undefined
   */
  val = undefined;
  /**
   * 定义Promise的错误原因，初始值为undefined
   */
  reason = undefined;
  /**
   * 定义成功的异步任务队列
   */
  resolveCallbacks = [];
  /**
   * 定义失败的异步任务队列
   */
  rejectedCallbacks = [];

  resolve(val) {
    // 只有状态为pending状态的才能变为FULFILLED
    if (this.state === PENDING) {
      this.val = val;
      this.state = FULFILLED;
      // 清除异步任务队列
      while (this.resolveCallbacks.length) {
        const fn = this.resolveCallbacks.shift();
        typeof fn === "function" && fn(val);
      }
    }
  }

  reject(reason) {
    // 只有状态为pending状态的才能变为REJECTED
    if (this.state === PENDING) {
      this.reason = reason;
      this.state = REJECTED;
      // 清除异步任务队列
      while (this.rejectedCallbacks.length) {
        const fn = this.rejectedCallbacks.shift();
        typeof fn === "function" && fn(reason);
      }
    }
  }

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (exp) {
      this.reject(exp);
    }
  }
}
```

现在，我们增加了一个用于成功的任务队列，一个用于失败的任务队列。暂时还看不出来这个任务队列的内容从哪儿来，因为我们还没有写`Promise.prototype.then`方法。

到目前为止，`Promise`也不见得有多离谱，接下来就是要迎接地狱级的`then`方法了。`then`方法有两个参数，一个是我们部署的前一个`Promise`状态为`fulfilled`的处理器，另外一个是前一个`Promise`状态为`rejected`的处理器，并且`then`方法需要返回一个新的`Promise`。

```js

```
