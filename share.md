# 从`Promise`到`Async`函数

今天的分享不跟大家分享各种`API`怎么使用，主要分享一些我觉得有价值的东西，要理解本文所阐述的内容，需要熟练的应用`Symbol`和`ES6`迭代器相关的知识点。

## `Promise`

首先，编写一个简单的`Promise`。

```js
/**
 * 定义Promise的3个状态
 */
const PENDING = "pending";

const FULFILLED = "fulfilled";

const REJECTED = "rejected";

class MyPromise {
  /**
   * 定义初始化的值
   */
  val = undefined;
  /**
   * 定义初始化的rejected的原因
   */
  reason = undefined;
  /**
   * 初始化状态为pending
   */
  state = PENDING;

  /**
   * 内部的resolve触发函数
   */
  resolve = (val) => {
    // Promise的状态只能从pending->fulfilled
    if (this.state === PENDING) {
      this.val = val;
      this.state = FULFILLED;
    }
  };
  /**
   * 内部的reject触发函数
   */
  reject = (reason) => {
    // Promise的状态只能从pending->rejected
    if (this.state === PENDING) {
      this.reason = reason;
      this.state = REJECTED:
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

这个`Promise`是一个不支持异步的`Promise`，为此，还需要对它进行改进：

```js
/**
 * 定义Promise的3个状态
 */
const PENDING = "pending";

const FULFILLED = "fulfilled";

const REJECTED = "rejected";

class MyPromise {
  /**
   * 定义初始化的值
   */
  val = undefined;
  /**
   * 定义初始化的rejected的原因
   */
  reason = undefined;
  /**
   * 初始化状态为pending
   */
  state = PENDING;

  /**
   * 定义一个成功的异步队列，用来记住需要做的事儿，但是又不能立马做的事儿
   */
  fulfilledAsyncQueue = []

  /**
   * 定义一个失败的异步队列，用来记住需要做的事儿，但是又不能立马做的事儿
   */
  rejectedAsyncQueue = [];

  /**
   * 内部的resolve触发函数
   */
  resolve = (val) => {
    // Promise的状态只能从pending->fulfilled
    if (this.state === PENDING) {
      this.val = val;
      this.state = FULFILLED;
      // 如果异步队列里面有内容，清空异步内容
      while(this.fulfilledAsyncQueue.length) {
        const fn = this.fulfilledAsyncQueue.shift();
        fn(val);
      }
    }
  };
  /**
   * 内部的reject触发函数
   */
  reject = (reason) => {
    // Promise的状态只能从pending->rejected
    if (this.state === PENDING) {
      this.reason = reason;
      this.state = REJECTED:
      // 如果异步队列里面有内容，清空异步内容
      while(this.rejectedAsyncQueue.length){
        const fn = this.rejectedAsyncQueue.shift();
        fn(reason);
      }
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

### `Promise.prototype.then`

上面只定义了异步队列，异步队列的内容得从`then`里面来，`then`方法需要返回一个`Promise`。

```js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 待返回的新的promise
  let promise2 = null;
  // 兜底，并且透传值
  typeof onFulfilled !== "function" && (onFulfilled = (val) => val);
  // 兜底，并且透传错误原因
  typeof onRejected !== "function" &&
    (onRejected = (reason) => {
      throw reason;
    });

  return (promise2 = new MyPromise((resolve, reject) => {
    // 此刻的 Promise，仍然可能有3种状态
    if (this.state === PENDING) {
      // 需要处理失败，但是又不是现在处理，所以得把现在要做的事儿，加到异步队列里面去
    } else if (this.state === FULFILLED) {
      // 处理成功
    } else if (this.state === REJECTED) {
      // 处理失败
    }
  }));
};
```

接着看怎么处理成功和失败：

```js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 待返回的新的promise
  let promise2 = null;
  // 兜底，并且透传值
  typeof onFulfilled !== "function" && (onFulfilled = (val) => val);
  // 兜底，并且透传错误原因
  typeof onRejected !== "function" &&
    (onRejected = (reason) => {
      throw reason;
    });

  return (promise2 = new MyPromise((resolve, reject) => {
    const fulfilledProcessHandler = () => {
      try {
        // 当前Promise的
        const x = onFulfilled(this.val);
        if (x === promise2) {
          throw new TypeError("promise chain called");
        }
        if (x instanceof MyPromise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    };

    const rejectedProcessHandler = () => {
      try {
        // 当前Promise的
        const x = onRejected(this.reason);
        if (x === promise2) {
          throw new TypeError("promise chain called");
        }
        if (x instanceof MyPromise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    };

    // 此刻的 Promise，仍然可能有3种状态
    if (this.state === PENDING) {
      // 需要分别处理成功与失败，但是又不是现在处理，所以得把现在要做的事儿，加到异步队列里面去
      this.fulfilledAsyncQueue.push(fulfilledProcessHandler);
      this.rejectedAsyncQueue.push(rejectedProcessHandler);
    } else if (this.state === FULFILLED) {
      // 处理成功
      fulfilledProcessHandler();
    } else if (this.state === REJECTED) {
      // 处理失败
      rejectedProcessHandler();
    }
  }));
};
```

因为`then`方法是在微任务上执行的，所以，上述代码还需要增加一个异步调用的处理:

```js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 待返回的新的promise
  let promise2 = null;
  // 兜底，并且透传值
  typeof onFulfilled !== "function" && (onFulfilled = (val) => val);
  // 兜底，并且透传错误原因
  typeof onRejected !== "function" &&
    (onRejected = (reason) => {
      throw reason;
    });

  return (promise2 = new MyPromise((resolve, reject) => {
    const fulfilledProcessHandler = () => {
      // 如果没有queueMicroTask可用，用setTimeout 0也行
      queueMicroTask(() => {
        try {
          // 当前Promise的val传递给then作为入参回调函数的入参。
          const fulfilledVal = onFulfilled(this.val);
          if (fulfilledVal === promise2) {
            throw new TypeError("promise chain called");
          }
          if (fulfilledVal instanceof MyPromise) {
            fulfilledVal.then(resolve, reject);
          } else {
            resolve(fulfilledVal);
          }
        } catch (err) {
          reject(err);
        }
      });
    };

    const rejectedProcessHandler = () => {
      // 如果没有queueMicroTask可用，用setTimeout 0也行
      queueMicroTask(() => {
        try {
          // 当前Promise的reason传递给then作为入参回调函数的入参。
          const rejectedVal = onRejected(this.reason);
          if (rejectedVal === promise2) {
            throw new TypeError("promise chain called");
          }
          if (rejectedVal instanceof MyPromise) {
            rejectedVal.then(resolve, reject);
          } else {
            resolve(rejectedVal);
          }
        } catch (err) {
          reject(err);
        }
      });
    };

    // 此刻的 Promise，仍然可能有3种状态
    if (this.state === PENDING) {
      // 需要分别处理成功与失败，但是又不是现在处理，所以得把现在要做的事儿，加到异步队列里面去
      this.fulfilledAsyncQueue.push(fulfilledProcessHandler);
      this.rejectedAsyncQueue.push(rejectedProcessHandler);
    } else if (this.state === FULFILLED) {
      // 处理成功
      fulfilledProcessHandler();
    } else if (this.state === REJECTED) {
      // 处理失败
      rejectedProcessHandler();
    }
  }));
};
```

上面在结果的处理上有点儿冗余，因此，提取出一个函数以减少代码冗余：

```js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 待返回的新的promise
  let promise2 = null;
  // 兜底，并且透传值
  typeof onFulfilled !== "function" && (onFulfilled = (val) => val);
  // 兜底，并且透传错误原因
  typeof onRejected !== "function" &&
    (onRejected = (reason) => {
      throw reason;
    });

  return (promise2 = new MyPromise((resolve, reject) => {
    function resolvePromise(promise2, x, resolve, reject) {
      if (x === promise2) {
        throw new TypeError("promise chain called");
      }
      if (x instanceof MyPromise) {
        x.then(resolve, reject);
      } else {
        resolve(x);
      }
    }

    const fulfilledProcessHandler = () => {
      // 如果没有queueMicroTask可用，用setTimeout 0也行
      queueMicroTask(() => {
        try {
          // 当前Promise的val传递给then作为入参回调函数的入参。
          const fulfilledVal = onFulfilled(this.val);
          resolvePromise(promise2, fulfilledVal, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
    };

    const rejectedProcessHandler = () => {
      // 如果没有queueMicroTask可用，用setTimeout 0也行
      queueMicroTask(() => {
        try {
          // 当前Promise的reason传递给then作为入参回调函数的入参。
          const rejectedVal = onRejected(this.reason);
          resolvePromise(promise2, rejectedVal, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
    };

    // 此刻的 Promise，仍然可能有3种状态
    if (this.state === PENDING) {
      // 需要分别处理成功与失败，但是又不是现在处理，所以得把现在要做的事儿，加到异步队列里面去
      this.fulfilledAsyncQueue.push(fulfilledProcessHandler);
      this.rejectedAsyncQueue.push(rejectedProcessHandler);
    } else if (this.state === FULFILLED) {
      // 处理成功
      fulfilledProcessHandler();
    } else if (this.state === REJECTED) {
      // 处理失败
      rejectedProcessHandler();
    }
  }));
};
```

### `Promise.prototype.catch`

有了`then`之后，剩下的内容就比较好写了。

```js
MyPromise.prototype.catch = function (fn) {
  return this.then(null, fn);
};
```

### `Promise.prototype.finally`

```js
MyPromise.prototype.finally = function (fn) {
  return this.then(
    () => {
      typeof fn === "function" && fn();
    },
    () => {
      typeof fn === "function" && fn();
    }
  );
};
```

### `Promise.reject`

```js
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};
```

### `Promise.resolve`

这个包含一些知识点，如果原值是`Promise`，不做处理，如果是`普通值`，包裹成`Promise`，如果是`类Promise对象`，得到一个跟随`类Promise`状态的`Promise`，并且支持递归的展平`类Promise`。

什么是`类Promise`?

```js
const thenable = {
  then(resolve, reject) {
    resolve("hello world");
  },
};
```

以上就是一个`类Promise`

```js
MyPromise.resolve = function (val) {
  if (val instanceof MyPromise) {
    return val;
  } else if (val && typeof val.then === "function") {
    return new MyPromise((resolve, reject) => {
      // 透传Promise的两个函数给类Promise，这样这个新Promise的状态就由类Promise决定了
      val.then(resolve, reject);
    }).then((val) => {
      // 返回的结果仍然可能是一个类Promise对象，递归展平它
      return val && typeof val.then === "function"
        ? MyPromise.resolve(val)
        : val;
    });
  } else {
    // 将非Promise的值包裹成Promise
    return new Promise((resolve) => {
      resolve(val);
    });
  }
};
```

### `Promise.prototype.all`

`Promise.prototype.all`接受的参数是一个迭代器，不是一个数组，需要注意一下。

```js
MyPromise.prototype.all = function (iterator) {
  // 如果解不出来，报错就交给调用者去处理错误，因此本地不捕获错误
  const arr = [...iterator];
  return new MyPromise((resolve, reject) => {
    if (arr.length === 0) {
      resolve([]);
      return;
    }
    let size = 0;
    const results = [];
    // 这儿必须要用let，充分的利用TDZ的能力，for循环体内就必须写成IIFE了
    for (let i = 0; i < arr.length; i++) {
      let p = arr[i];
      if (!(p instanceof MyPromise)) {
        p = Promise.resolve(p);
      }
      // 同步挂载，并行执行
      p.then((val) => {
        size++;
        results[i] = val;
        // 不知道Promise完成的先后顺序，只知道哪些完成了，所有的都fulfilled了就可以resolve了
        if (size === arr.length) {
          resolve(results);
        }
      }).catch(reject);
    }
  });
};
```

### `Promise.prototype.race`

```js
MyPromise.prototype.race = function (iterator) {
  const arr = [...iterator];
  return new MyPromise((resolve, reject) => {
    // 在这儿我们并没有兜底数组长度为0的情况，这其实是符合预期的，空值得到的将会永远是pending状态的Promise
    for (let i = 0; i < arr.length; i++) {
      let p = arr[i];
      if (!(p instanceof MyPromise)) {
        p = MyPromise.resolve(p);
      }
      // 哪个先执行，不管成功失败，就是哪个的结果
      p.then(resolve).catch(reject);
    }
  });
};
```

### `Promise.prototype.allSettled`

```ts
interface SettledPromiseResult {
  value: any;
  reason?: Error;
  state: FULFILLED | REJECTED;
}
```

```js
MyPromise.prototype.allSettled = function (iterator) {
  const arr = [...iterator];
  // 这是一个永远不会返回失败的Promise
  return new Promise((resolve) => {
    if (arr.length === 0) {
      resolve([]);
    }
    const results = [];
    let size = 0;
    // 同样需要TDZ
    for (let i = 0; i < arr.length; i++) {
      let p = arr[i];
      if (!(p instanceof MyPromise)) {
        p = MyPromise.resolve(p);
      }
      // 并行执行
      p.then((val) => {
        size++;
        results[i] = {
          value: val,
          status: FULFILLED,
        };
        // 所有状态改变，resolve
        if (size === arr.length) {
          resolve(results);
        }
      }).catch((err) => {
        size++;
        results[i] = {
          reason: err,
          status: REJECTED,
        };
        // 所有状态改变，resolve
        if (size === arr.length) {
          resolve(results);
        }
      });
    }
  });
};
```

### `Promise.prototype.any`

```js
MyPromise.prototype.any = function (iterator) {
  const arr = [...iterator];
  return new MyPromise((resolve, reject) => {
    // 如果空，肯定没有一个能成功，返回AggregateError
    if (arr.length === 0) {
      reject(new AggregateError([]));
    }
    let size = 0;
    const errors = [];
    for (let i = 0; i < arr.length; i++) {
      let p = arr[p];
      if (!(p instanceof MyPromise)) {
        p = MyPromise.resolve(p);
      }
      p.then((val) => {
        // 成功一个，以成功的这个为结果
        resolve(val);
      }).catch((err) => {
        // 失败，记录下每个失败的原因
        errors[i] = err;
        size++;
        // 所有都失败，报告聚合错误
        if (size === arr.length) {
          reject(new AggregateError(errors));
        }
      });
    }
  });
};
```

### 从`Promise`实现中的收获

有些时候看起来有点儿迷糊的写法，现在看也不迷糊了，因为`then`方法返回的是一个 promise

```js
function doSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, "hello world");
  }).then((res) => {
    return "yangxu 对你说:" + res;
  });
}

doSomething().then((res) => {
  console.log(res); // yangxu 对你说: hello world
});
```

`catch`捕获到了错误之后仍然可以继续链式调用。

```js
function doSomething() {
  return new Promise((resolve, reject) => {
    throw new Error("这是一个测试错误");
  })
    .catch((err) => {
      console.log(error);
      return "我捕获到了错误，但是我还是可以接着链式调用";
    })
    .then((res) => {
      console.log(res); //"我捕获到了错误，但是我还是可以接着链式调用"
    });
}
```

`Promise`返回结果没有必要显示的包裹某个值为`Promise`。

```js
function doSomething() {
  return new Promise((resolve, reject) => {
    resolve("hhhh");
  }).then(() => {
    return 1; // 可不比显式的Promise.resolve(1)
  });
}
```

`resolve` 和 `reject`其实是`Promise`内部两个触发器的实际参数，因此，可以用它来做一些化腐朽为神奇的事。

比如`axios`的`CancellationTokenSource`

```js
// 文件位置: axios>lib>cancel>CancelToken.js 版本——>0.21.1
class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    // 外部定义一个变量，把Promise的resolve记下来
    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    this.promise.then((cancel) => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = (onfulfilled) => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };
    // 把这个Promise包裹起来，传递给外界
    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }
      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel,
    };
  }
}
```

在`XHR`的`adaptor`里面:

```js
// 文件位置: axios>lib>adapters>xhr.js 版本——>0.21.1
// 已省略部分非关键代码
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    var request = new XMLHttpRequest();
    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(
      config.method.toUpperCase(),
      buildURL(fullPath, config.params, config.paramsSerializer),
      true
    );
    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }
      if (
        request.status === 0 &&
        !(request.responseURL && request.responseURL.indexOf("file:") === 0)
      ) {
        return;
      }
      // 监听取消操作
      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(createError("Request aborted", config, "ECONNABORTED", request));
        // Clean up request
        request = null;
      };

      // 如果用户配置了CancelToken,在此注册异步取消操作，当用户触发取消以后，调用xhr的abort方法取消xhr，并做一些清理工作
      if (config.cancelToken) {
        // 因为Promise的触发器已经交给了外界，一旦我们在外界调用CancelToken的cancel，这个Promise的状态就发生变化，立刻触发取消操作
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }
          // 发出取消指令
          request.abort();
          reject(cancel);
          // Clean up request
          request = null;
        });
      }
      // Send the request
      request.send(requestData);
    };
  });
};
```

`异步管道`操作，这一点非常重要。

来看一下`axios`的拦截器是怎么做的

```js
// 文件位置: axios>lib>core>Axios.js 版本——>0.21.1

// 以省略无关代码
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  // 注册两个拦截器的管理器
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}

Axios.prototype.request = function request(config) {
  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  // 处理请求拦截器
  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor
  ) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  // 处理响应拦截器
  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor
  ) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  // 部署一个Promise链，类似链表的头插法操作，像多米罗骨牌那样的链式反应，是反向部署的
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  // 返回最开头的那个Promise给外界，到时候就可以起到导火索的作用
  return promise;
};
```

记住这一点，后面`Async`函数我们还会用到这种手段。

## `Generator`函数

### 如何判断一个函数是否是`Generator`

```js
const isGenerator = (o) => {
  return o && o[Symbol.toStringTag] === "GeneratorFunction";
};
```

### 基础知识补充

`Generator`函数，函数名前加一个`*`，函数执行后返回一个迭代器，迭代器第一次调用`next`函数无法传递参数，因为`next`函数的入参是上一个`yield`表达式的值, 第一次调用的时候前面没有`yield`表达式。

`return语句`执行的时候，返回的结果是`done`为`true`。

`for-of`，不会消费`done`为`true`的值，故无法遍历到`return`语句。

`babel`编译`Generator函数`会把一个名叫`generator/runtime`的库（来源于脸书）打包进去，这个库实现了`Generator`函数内部状态的流转过程。

### `设计模式`之`状态模式`

先来回顾一下`设计模式`中`状态模式`的应用。

下面是一个状态模式的`UML`图：

![alt 状态模式的URL图](https://res.cdn.changbaimg.com/-/fb229e73c4eb51e5/%E7%8A%B6%E6%80%81%E6%A8%A1%E5%BC%8F.png)

根据这个`UML`图，举一个实际一点儿的例子：

```ts
/**
 * 定义一个上下文类
 */
class Context {
  // 定义初试的状态
  private _state: State;

  get state() {
    return this._state;
  }

  set state(val: State) {
    console.log('下一阶段的状态': state.stateName);
    this._state = val;
  }

  constructor(state: State) {
    this._state = state;
  }

  public request(): void {
    this._state.handler(this);
  }
}

// 定义一个抽象的状态类
abstract class State {
  stateName: string;
  public abstract handler(ctx: Context): void;
}

class GetUpState extends State {
  stateName = "起床状态";

  handler(ctx) {
    console.log("起床啦，今天又是元气满满的一天~");
    ctx.state = new EatingState();
  }
}

// 不同的具象类实现抽象类
class EatingState extends State {
  stateName = "吃饭状态";

  handler(ctx) {
    console.log("吃早饭啦~");
    // 吃完饭之后刷牙
    ctx.state = new BrushTeethState();
  }
}

class BrushTeethState extends State {
  stateName = '刷牙状态'；

  handler(ctx) {
    console.log("刷牙，准备干活儿啦~");
    ctx.state = new WorkState();
  }
}

class WorkState extends State {
  // 工作状态
  stateName = '工作状态';

  handler(ctx) {
    console.log("工作中...");
  }
}

function bootstrap() {
  const ctx = new Context(new GetUpState());
  ctx.request();
  // 起床啦，今天又是元气满满的一天~
  ctx.request();
  // 吃早饭啦~
  ctx.request();
  // 刷牙，准备干活儿啦~
  ctx.request();
  // 工作中...
  ctx.request();
  // 工作中...
  ctx.request();
  // 工作中...
}
```

然后再回想一下`Generator`的使用场景：

```js
function* func() {
  yield a();
  yield b();
  yield c();
  yield d();
  return e;
}

const it = func();

it.next(); //{ value: ???, done: false }
it.next(); //{ value: ???, done: false }
it.next(); //{ value: ???, done: false }
it.next(); //{ value: ???, done: false }
it.next(); //{ value: ???, done: true }
```

### 单线程的协程

其实，我们没有必要把`Generator`函数想的那么神秘，经常看论坛上吹的什么其神的“什么遇到`yield`表达式交出当前的执行权”，或者还有更牛逼的说“`Generator函数`可以保留函数的状态”等言论。

非要把简单的问题复杂化。

我们执行多次`Generator`函数了吗，并没有，所以哪儿来的什么保留了内部的执行状态的之说呢？`Generator`函数跟普通函数一样，还是返回的是一个值，至于是一个什么样的值，那肯定就大有学问了。

其实，`Generator`函数里面的`yield`表示是只不过是一个边界划定的东西而已（本文不讨论`yield *`），比如从开头到第一个`yield`语句是一个任务，后面的以此类推，直到`return`语句。

就好比上周周鹏分享`gitlab`的`CI-CD`我们需要配置`stages`一样。`Generator`函数的`yield`语句将流程划分成一个一个的步骤，执行`Generator`函数得到的结果是一个迭代器，调用这个迭代器的过程中，就是不断的在把`Generator`内部预设的流程往前推而已（回想一下`Promise`章节中的`Promise`链，是否有一些似曾相识呢），没有论坛上说的那么夸张。

### `Tree-shaking`中需要注意的问题

以下是我们期待`Tree-shaking`掉的代码 `yield 1000`

```js
function* func() {
  yield 1;
  yield 2;
  yield 3;
  if (process.env.NODE_ENV !== "production") {
    yield 1000;
  }
  yield 4;
  return 5;
}
```

转换之后：

```js
function func() {
  return _regeneratorRuntime().wrap(function func$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          _context.next = 4;
          return 2;

        case 4:
          _context.next = 6;
          return 3;

        case 6:
          if (!(process.env.NODE_ENV !== "production")) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return 1000;

        case 9:
          _context.next = 11;
          return 4;

        case 11:
          return _context.abrupt("return", 5);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```

因为`Generator`函数会被`babel`转码成状态机的执行形式，所以，想要在这里面处理`Tree-shaking`是达不到你的预期的。

## `Async`函数

如果你不明白`Generator`函数，其实是不大影响你理解`Async`函数的，但是前提你要清楚的明白，`Generator`函数是一个状态机，并且里面的内容完全可以使用`ES5`进行·polyfill`。

### 如何判断一个函数是否是`Async`函数?

```js
const isAsyncFunction = (o) => {
  return o && o[Symbol.toStringTag] === "AsyncFunction";
};
```

### 如何实现`Async`函数的自动执行?

在`Generator`节中，我们已经看到了，`Generator`函数可以将其划分成不同阶段的子任务去执行。但是如果我们直接去写`next`调度的话，那肯定太累了，流程也繁琐，而且也要求大家必须熟练的掌握`Generator`，这对于开发的要求太高了。

所以问题回归到怎么实现`Async`函数的自动执行呢？在最开头的时候我们讲过的，利用`Promise链`来实现。

```js
function spawn(gen) {
  if (!isGenerator(gen)) {
    return Promise.reject("parameter error");
  }
  return new Promise((resolve, reject) => {
    const ite = gen();
    const step = (val, action) => {
      try {
        const next = ite[action](val);
        // 迭代器遍历完成了，以最终的结果作为Promise的返回值
        if (next.done) {
          resolve(next.value);
        }
      } catch (error) {
        reject(error);
        return;
      }
      // 递归的调用step方法，不断的将Generator函数中的流程向后推
      Promise.resolve(next.value).then((val) => step(val, 'next'), (err) => _throw);
    };
    Promise.resolve(undefined).then(step, _throw);
  });
}
```
