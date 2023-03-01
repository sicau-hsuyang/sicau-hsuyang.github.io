## Promise

`Promise`的手写可以算的是前端面试中编码题中地狱级别的了，这里面不光有极多的场景需要考虑，并且蕴含很多编程技法在里面，如果读者有幸遇到过，那么恭喜你，你可真是幸运呢。

这几年也看过很多版本的手写`Promise`实现了，我觉得都不怎么样（点名批评掘金的一些文章，有些实现甚至都不能用，纯属代码搬运工，误人子弟），某一天，在知乎上看到了一个前辈的文章，觉得挺好，因此本文中的实现，基本上参考[这里](https://github.com/xieranmaya/blog/issues/3)，原文中是用`ES5`的构造函数的形式实现的，但是我觉得不够优雅，于是采用的是`ES6`的`class`写法。

本文非常长，请耐心阅读。

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
      // 异步任务队列里面记住了需要做但是还尚未做的事儿，因此需清除异步任务队列
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
      // 异步任务队列里面记住了需要做但是还尚未做的事儿，因此需清除异步任务队列
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

### 1、`Promise.prototype.then`方法

到目前为止，`Promise`也不见得有多离谱，接下来就是要迎接地狱级的`then`方法了。`then`方法有两个参数，一个是我们部署的前一个`Promise`状态为`fulfilled`的处理器，另外一个是前一个`Promise`状态为`rejected`的处理器，并且`then`方法需要返回一个新的`Promise`。

```js
MyPromise.prototype.then = function (onFulfilledCallback, onRejectedCallback) {
    // 待返回的新的Promise
    let promise2;
    // 如果没有部署成功的回调，部署一个默认的，并且透传上一个Promise的成功值
    onFulfilledCallback =
      typeof onFulfilledCallback === "function"
        ? onFulfilledCallback
        : (v) => v;
    // 如果没有部署失败的回调，部署一个默认的，并且透传上一个Promise的错误
    onRejectedCallback =
      typeof onRejectedCallback === "function"
        ? onRejectedCallback
        : (reason) => {
            throw reason;
          };
    // 向外界返回一个新的Promise
    return (promise2 = new MyPromise((resolve, reject) => {
      // 定义fulfilled的微任务处理器
      const fulfilledMicroTask = () => {
        queueMicroTask(() => {
          try {
            const fulfilledVal = onFulfilledCallback(this.val);
            /**
             * Promise A+规范中提到的
             */
            /**
             * If a promise is resolved with a thenable that participates in a circular thenable chain,
             * such that the recursive nature of [[Resolve]](promise, thenable) eventually causes [[Resolve]](promise, thenable) to be called again,
             * following the above algorithm will lead to infinite recursion. Implementations are encouraged,
             * but not required, to detect such recursion and reject promise with an informative TypeError as the reason
             */
            if (fulfilledVal === promise2) {
              throw new TypeError("detect promise recursion called");
            }
            // 如果上一个Promise的返回值是Promise的话，就相当于插入了一个多的Promise，所以，我们把当前Promise的resolve方法和reject方法部署在它的then上
            if (fulfilledVal instanceof MyPromise) {
              fulfilledVal.then(resolve, reject);
            } else {
              resolve(fulfilledVal);
            }
          } catch (exp) {
            reject(exp);
          }
        });
      };
      // 定义rejected的微任务处理
      const rejectedMicroTask = () => {
        queueMicroTask(() => {
          try {
            const rejectedVal = onRejectedCallback(this.reason);
            if (rejectedVal === promise2) {
              throw new TypeError("detect promise recursion called");
            }
            if (rejectedVal instanceof MyPromise) {
              fulfilledMicroTask.then(resolve, reject);
            } else {
              resolve(rejectedVal);
            }
          } catch (exp) {
            reject(exp);
          }
        });
      };
      // 上一个Promise还是pending状态，因此，需要把当前的函数加入到异步任务队列里面去，
      // 为什么需要使用queueMicroTask呢，因为then的代码是在事件轮循当前同步任务关联的微任务队列里面执行的
      if (this.state === PENDING) {
        this.rejectedCallbacks.push(rejectedMicroTask);
        this.resolveCallbacks.push(fulfilledMicroTask);
      } else if (this.state === REJECTED) {
        // 如果上一个Promise的状态已经变成rejected了，可以直接执行异常逻辑
        rejectedMicroTask();
      } else if (this.state === FULFILLED) {
        // 如果上一个Promise的状态已经变成resolved了，可以直接执行正常逻辑
        fulfilledMicroTask();
      }
    }));
  }
}
```

上面的代码，真是老太太的裹脚布，又臭又长。

不过拆开来看，其实不是特别难理解，首先先不看占了很大篇幅的`rejectedMicroTask`和`fulfilledMicroTask`，因为`then`方法有些时候是先部署，并不是立马就会执行到的，所以上一个`Promise`仍然还有可能是`pending`状态的。之前我们定义的异步队列就可以在此时把要做的事儿先记下来，到了某个时刻再做就行了。实际开发中，这种手段是经常用的（比如`A`方法依赖一个脚本才能运行，但是又不知道这个脚本在什么时候加载完成，但是我页面初始化就要调用`A方法`, 就可以考虑这个手段，所以我个人觉得有些时候去学习一些源码其实是对我们编程手段的补充，并不是造火箭，因为平时工作你只能用到你`20%`的知识，但是你另外`80%`的知识积累决定的是你最终能跑多远。）

如果当前的`Promise`已经不是`pending`了，直接就可以执行了，比如`Promise.reject`或者`Promise.resolve`这类场景，直接就可以执行了，所以这就是后面两个分支的意义。

然后，对于`onFulfilledCallback`, `onRejectedCallback`这两个函数需要兜底并且向后透传上一个`Promise`的信息，因为实际开发中，编写代码并不是每次都会循规蹈矩的把两个回调都写上，但是我们的`Promise链`仍然可以正常调用，正是这个原因

接着来看我们定义的两个函数，一个用于处理成功即`fulfilledMicroTask`，一个用于处理失败即`rejectedMicroTask`，因为`then`方法是在事件轮循当前同步任务关联的微任务队列里面执行的，这就是为什么我们要用`queueMicroTask`这个`API`将其包裹起来的原因（如果没有`queueMicroTask`的话，那就只能用`setTimeout`了）。

如果当前`Promise`返回的值是`then`新创建的`promise2`，这将形成循环调用，这肯定不行的，因此需要抛出错误，根据`Promise A+`的规范，需要抛出一个`TypeError`的错误。

如果当前`Promise`返回的值又是一个`Promise`的话，就好比在当前`Promise`和`then`方法返回的`Promise`之间插入了一个新的`Promise`，因此，要把`then`方法生成的`Promise`的`resolve`和`reject`回调部署在插入的这个`Promise`的`then`的回调上。

上述代码看起来比较冗余，明显这个判断逻辑被我们写了两遍，因此，将其抽离成一个函数，并且把最开始的构造函数相关的代码补齐，就得到了下述代码：

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
   * 定义失败的一部任务队列
   */
  rejectedCallbacks = [];

  resolve = (val) => {
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
  };

  reject = (reason) => {
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
  };

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (exp) {
      this.reject(exp);
    }
  }

  then(onFulfilledCallback, onRejectedCallback) {
    let promise2;
    // 如果没有部署成功的回调，部署一个默认的，并且透传上一个Promise的成功值
    onFulfilledCallback =
      typeof onFulfilledCallback === "function"
        ? onFulfilledCallback
        : (v) => v;
    // 如果没有部署失败的回调，部署一个默认的，并且透传上一个Promise的错误
    onRejectedCallback =
      typeof onRejectedCallback === "function"
        ? onRejectedCallback
        : (reason) => {
            throw reason;
          };
    // 向外界返回一个新的Promise
    return (promise2 = new MyPromise((resolve, reject) => {
      // 抽离的一个用于判断当前Promise的返回值逻辑
      function resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
          /**
           * Promise A+规范中提到的
           */
          /**
           * If a promise is resolved with a thenable that participates in a circular thenable chain,
           * such that the recursive nature of [[Resolve]](promise, thenable) eventually causes [[Resolve]](promise, thenable) to be called again,
           * following the above algorithm will lead to infinite recursion. Implementations are encouraged,
           * but not required, to detect such recursion and reject promise with an informative TypeError as the reason
           */
          throw new TypeError("detect promise recursion called");
        }
        // 如果是一个Promise，就部署resolve和reject在其then方法上 （这个地方应该改成类Promise更科学）
        if (x instanceof MyPromise) {
          x.then(resolve, reject);
        } else {
          // 普通值，直接当做fulfilled处理
          resolve(x);
        }
      }
      // 定义fulfilled的微任务处理器
      const fulfilledMicroTask = () => {
        queueMicroTask(() => {
          try {
            const fulfilledVal = onFulfilledCallback(this.val);
            resolvePromise(promise2, fulfilledVal, resolve, reject);
          } catch (exp) {
            reject(exp);
          }
        });
      };

      // 定义rejected的微任务处理
      const rejectedMicroTask = () => {
        queueMicroTask(() => {
          try {
            const rejectedVal = onRejectedCallback(this.reason);
            resolvePromise(promise2, rejectedVal, resolve, reject);
          } catch (exp) {
            reject(exp);
          }
        });
      };

      // 上一个Promise还是pending状态，因此，需要把当前的函数加入到异步任务队列里面去，
      // 为什么需要使用queueMicroTask呢，因为then的代码是在事件轮循当前同步任务关联的微任务队列里面执行的
      if (this.state === PENDING) {
        this.rejectedCallbacks.push(rejectedMicroTask);
        this.resolveCallbacks.push(fulfilledMicroTask);
      } else if (this.state === REJECTED) {
        // 如果上一个Promise的状态已经变成rejected了，可以直接执行异常逻辑
        rejectedMicroTask();
      } else if (this.state === FULFILLED) {
        // 如果上一个Promise的状态已经变成resolved了，可以直接执行正常逻辑
        fulfilledMicroTask();
      }
    }));
  }
}
```

以下是我们上述代码的测试用例：

```js
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(300);
  }, 3000);
})
  .then((val) => {
    return val * 100;
  })
  .then((val) => {
    throw new Error(val);
  })
  .then()
  .then(null, (error) => {
    console.log(error);
  })
  .then()
  .then(() => {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(1000);
      }, 1000);
    });
  })
  .then((val) => {
    console.log(val);
  });
```

如果你认真的看到了这儿，恭喜你，`Promise`你已经掌握了~。

参考文章实现的`then`到此并没有完，它还考虑了不同实现的`Promise`的通信问题，本文不考虑，有兴趣的读者可以参考原文。

接下来要做的事儿就相对比较简单了，我们把`Promise`身上的一些方法补全。

### 2、`Promise.prototype.catch`方法

这个方法是一个语法糖，为了避免我们在写`Promise链`的时候每个`then`上都去部署`reject`的回调

```js
MyPromise.prototype.catch = function (fn) {
  return this.then(null, fn);
};
```

### 3、`Promise.prototype.finally`方法

这个方法也是一个语法糖，因为有些时候我们不需要关心上一个`Promise`的执行结果，都必须要做一些事儿，如果没有这个方法，我们的代码就必须写成这样

```js
const a = new Promise((resolve, reject) => {
  Math.random() > 0.5 ? resolve() : reject();
});

a.then(() => {
  console.log("今天你的运气真的好");
  console.log("今天的抽奖已经结束");
}).catch(() => {
  console.log("今天你的运气真的不好");
  console.log("今天的抽奖已经结束");
});
```

从上面的写法也看的出来，其实就是需要在`then`方法的两个分支上部署同一个回调函数，因此，实现就比较简单了。

```js
MyPromise.prototype.finally = function (fn) {
  return this.then(
    () => {
      fn();
    },
    () => {
      fn();
    }
  );
};
```

所以，我们的业务代码就可以改写成这样：

```js
const a = new Promise((resolve, reject) => {
  Math.random() > 0.5 ? resolve() : reject();
});

a.then(() => {
  console.log("今天你的运气真的好");
})
  .catch(() => {
    console.log("今天你的运气真的不好");
  })
  .finally(() => {
    console.log("今天的抽奖已经结束");
  });
```

### 4、`Promise.resolve`方法

`Promise.resolve`方法`MDN`的阐述是这样的：`Promise.resolve(value)` 方法返回一个以给定值解析后的`Promise`对象。

- 如果这个值是一个`Promise`，那么将返回这个`Promise`；
- 如果这个值是`thenable`（即带有`then`方法，但是又不是一个`Promise`），返回的`Promise` 会“跟随”这个`thenable`的对象，采用它的最终状态；
- 否则返回的`Promise`将以此值完成。
- 此函数将`类Promise对象`的多层嵌套展平。

```js
MyPromise.resolve = function (value) {
  // 如果这个值是一个`Promise`，那么将返回这个`Promise`
  if (value instanceof MyPromise) {
    return value;
  } else if (value && typeof value.then === "function") {
    return new MyPromise((resolve, reject) => {
      value.then(resolve, reject);
    }).then(
      (val) => {
        // 递归抹平类Promise，这一点也很重要
        return val && typeof val.then === "function"
          ? MyPromise.resolve(val)
          : val;
      },
      (err) => {
        // 透传错误
        throw err;
      }
    );
  } else {
    // 将普通值包裹成一个Promise
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
};
```

:::danger
不要在解析为自身的`thenable`上调用`Promise.resolve`。这将导致无限递归，因为它试图展平无限嵌套的`Promise`。
:::

```js
let thenable = {
  then: (resolve, reject) => {
    resolve(thenable);
  },
};

Promise.resolve(thenable); //这会造成一个死循环
```

### 5、`Promise.reject`方法

`MDN`的阐述是：`Promise.reject`方法返回一个带有拒绝原因的`Promise`对象。

因为一切对象都可能是`Promise`拒绝的原因，相比`Promise.resolve`就没有那么复杂了。

```js
MyPromise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
```

### 6、`Promise.all`方法

`MDN`的阐述是：

`Promise.all`方法接收一个`Promise`的`Iterable`类型 **（注：`Array`，`Map`，`Set`，`Generator`函数的执行结果都属于`ES6`的`Iterable`类型）** 的输入，并且只返回一个`Promise`实例，那个输入的所有`Promise`的`resolve`回调的结果是一个数组。这个`Promise`的`resolve`回调执行是在所有输入的 `Promise`的`resolve`回调都结束，或者输入的`Iterable`里没有`Promise`了的时候。

它的`reject`回调执行时，只要任何一个输入的`Promise`的 `reject`回调执行或者输入不合法的`Promise`就会立即抛出错误，并且`reject`的是第一个抛出的错误信息。

这个阐述可是真的让人摸不着头脑。我根据我的开发经验进行转述，`Promise.all`接受一个可迭代对象，返回一个`Promise`，如果入参里面的所有`Promise`的状态都变成`fulfilled`之后，这个`Promise`变成`fulfilled`状态，并且结果是根据入参组成的数组（比如迭代器第一次的值是个`Promise`，就返回这个`Promise`状态为`fulfilled`之后的值，如果是普通对象，直接原路返回），如果迭代过程中的第一个`Promise`变成了`rejected`，这个返回的`Promise`的状态则为`rejected`，原因则是透传的第一个`reject`的原因。

以下是实现的`Promise.all`

```js
MyPromise.all = function (iterator) {
  let arr;
  // 强制将迭代器转成数组，如果当前对象不是迭代器，那就是报类型错误
  arr = [...iterator];
  // 如果传入的参数是空，快速响应
  if (arr.length === 0) {
    return MyPromise.resolve([]);
  }
  return new MyPromise((resolve, reject) => {
    // 记录最终的结果
    let records = [];
    // 记录已经fulfilled的Promise的个数
    let size = 0;
    for (let i = 0; i < arr.length; i++) {
      let p = arr[i];
      // 如果不是MyPromise的实例，包裹，因为这样才能够延迟响应（微任务队列里面完成）
      if (!(p instanceof MyPromise)) {
        p = MyPromise.resolve(p);
      }
      p.then((val) => {
        // 在then里面处理结果和处理已经fulfilled的Promise的个数，如果所有的Promise都已经fulfilled了的话，返回的Promise就可以fulfilled了
        records[i] = val;
        size++;
        if (size === arr.length) {
          resolve(records);
        }
      }).catch((err) => {
        // 只有上述有任何一个出错了，直接透传错误的reason
        reject(err);
      });
    }
  });
};
```

### 7、`Promise.race` 方法

`MDN`的解释是：

`Promise.race(iterable)`方法返回一个`Promise`，一旦迭代器中的某个`Promise`的状态不再是`pending`，返回的`Promise`就会变成`fulfilled`或者`rejected`。

简言之就是哪个`Promise`的状态先改变，返回的`Promise`的结果就以谁的为准。需要注意的是，如果传的迭代是空的，则返回的`Promise`将永远等待。

如果迭代包含一个或多个非`Promise`值或`fulfilled`或`rejected`的`Promise`，则`Promise.race`将解析为迭代中找到的第一个值。(简言之就是，返回第一个普通值或者状态已经改变的`Promise`的值)。

比如：

```js
const p1 = Promise.race([]); //p1的状态永远是pending

const p2 = Promise.race([
  1,
  2,
  new Promise((resolve, reject) => {
    setTimeout(resolve, 0);
  }),
]);
// p2的状态暂时是pending，在本轮事件循环完成，微任务队列清空之后，状态为fulfilled，值为1
```

因此，实现大致如下：

```js
MyPromise.race = function (iterator) {
  const arr = [...iterator];
  return new MyPromise((resolve, reject) => {
    // 如果arr为空，则永远pending
    for (let i = 0; i < arr.length; i++) {
      let p = arr[i];
      // 如果不是MyPromise的实例，包裹
      if (!(p instanceof MyPromise)) {
        p = MyPromise.resolve(p);
      }
      p.then((val) => {
        // 任意一个状态变化了，就可以直接返回fulfilled的值
        resolve(val);
      }).catch((err) => {
        // 任意一个出错，就透传这个错误
        reject(err);
      });
    }
  });
};
```

### 8、`Promise.allSettled` 方法

`MDN`的解释是：

`Promise.allSettled`方法以 `Promise`组成的可迭代对象作为输入，并且返回一个`Promise`实例。当输入的所有`Promise`都已敲定时（包括传递空的可迭代类型），返回的`Promise`将变成`fulfilled`，并带有描述每个 `Promise`结果的对象数组。

如果传递的是空，则直接返回一个`fulfilled`的`Promise`，否则，当给定的`Iterable`中所有`Promise`已经敲定时（要么`fulfilled`，要么`rejected`）。`fulfilled`的值是一个对象数组，其中的对象按照`Iterable`中`Promise`传递的顺序，描述每一个`Promise`的结果，无论完成顺序如何。

用简单的话解释起来就是，`Promise.allSettled`得到的`Promise`不会出现`rejected`的状态，如果传入参数是空，直接返回，如果传入的有参数，那么就挨个把每个`Promise`的结果按传入的顺序返回`PromiseSettledResult`(我起的名字)。

```ts
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
type STATUS = FULFILLED | REJECTED;
interface PromiseSettledResult {
  // 结果的状态
  status: STATUS;
  // 结果的值
  value?: any;
  // 错误的原因
  reason: Error;
}
```

因此，大致实现如下：

```js
MyPromise.allSettled = function (iterator) {
  const arr = [...iterator];
  return new MyPromise((resolve) => {
    // 如果数组是空的，直接返回一个fulfilled的结果
    if (arr.length === 0) {
      resolve([]);
    }
    // 定义每个Promise的结果记录数组 和 计数器
    let size = 0;
    let results = [];
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      if (!(p instanceof MyPromise)) {
        p = MyPromise.resolve(p);
      }
      // 无论是成功还是失败，都要把结果记录下来
      p.then((val) => {
        size++;
        results[i] = {
          value: val,
          status: FULFILLED,
        };
        if (size === arr.length) {
          resolve(results);
        }
      }).catch((err) => {
        size++;
        results[i] = {
          status: REJECTED,
          reason: err,
        };
        if (size === arr.length) {
          resolve(results);
        }
      });
    }
  });
};
```

### 9、`Promise.any` 方法

`Promise.any`接收一个由`Promise`所组成的可迭代对象，该方法会返回一个新的`Promise`，一旦可迭代对象内的任意一个`Promise`变成了`fulfilled`状态，那么由该方法所返回的`Promise`就会变成`fulfilled`状态，并且它的`fulfilled`值就是可迭代对象内的首先`fulfilled`的`Promise`的`fulfilled`值。如果可迭代对象内的`Promise`最终都没有`fulfilled`（即所有`Promise`都被`reject`了），那么该方法所返回的`Promise`就会变成`rejected`状态，并且它的`reason`会是一个`AggregateError`实例，这是`Error`的子类，用于把单一的错误集合在一起。

如果传入了一个空的可迭代对象，那么就会返回一个`rejected`的`Promise`。

如果传入了一个不含有`Promise`的可迭代对象，那么就会返回一个异步`fulfilled`的 `Promise`。

其余情况下都会返回一个`pending`状态的`Promise`。如果可迭代对象中的任意一个`Promise`的状态变成`fulfilled`了，那么这个处于等待状态的`Promise`就会异步地(本轮事件循环同步任务结束，并且微任务队列也已经清空)切换至`fulfilled`状态。如果可迭代对象中的所有`Promise`都`rejected`了，那么这个`pending`状态的`Promise`就会异步地切换至`rejected`。

```js
MyPromise.any = function (iterator) {
  const arr = [...iterator];
  // 入了一个空的可迭代对象，那么就会返回一个已经被拒的promise
  if (arr.length === 0) {
    return MyPromise.reject(new AggregateError([]));
  }
  return new MyPromise((resolve, reject) => {
    // 定义被拒绝的计数和错误数组
    let rejectedSize = 0;
    let rejectedErrs = [];
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      if (!(p instanceof MyPromise)) {
        p = MyPromise.resolve(p);
      }
      p.then((val) => {
        // 有一个promise fulfilled，则这个promise的值就是最终返回的Promise的值
        resolve(val);
      }).catch((err) => {
        // 如果所有的Promise都拒绝了，则抛出错误
        rejectedSize++;
        rejectedErrs[i] = err;
        if (rejectedSize === arr.length) {
          reject(new AggregateError(rejectedErrs));
        }
      });
    }
  });
};
```

综合以上的阐述，以下是我实现的一个完整的`Promise`类。

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
   * 定义失败的一部任务队列
   */
  rejectedCallbacks = [];

  resolve = (val) => {
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
  };

  reject = (reason) => {
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
  };

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (exp) {
      this.reject(exp);
    }
  }

  then(onFulfilledCallback, onRejectedCallback) {
    let promise2;
    // 如果没有部署成功的回调，部署一个默认的，并且透传上一个Promise的成功值
    onFulfilledCallback =
      typeof onFulfilledCallback === "function"
        ? onFulfilledCallback
        : (v) => v;
    // 如果没有部署失败的回调，部署一个默认的，并且透传上一个Promise的错误
    onRejectedCallback =
      typeof onRejectedCallback === "function"
        ? onRejectedCallback
        : (reason) => {
            throw reason;
          };
    // 向外界返回一个新的Promise
    return (promise2 = new MyPromise((resolve, reject) => {
      // 抽离的一个用于判断当前Promise的返回值逻辑
      function resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
          /**
           * Promise A+规范中提到的
           */
          /**
           * If a promise is resolved with a thenable that participates in a circular thenable chain,
           * such that the recursive nature of [[Resolve]](promise, thenable) eventually causes [[Resolve]](promise, thenable) to be called again,
           * following the above algorithm will lead to infinite recursion. Implementations are encouraged,
           * but not required, to detect such recursion and reject promise with an informative TypeError as the reason
           */
          throw new TypeError("detect promise recursion called");
        }
        // 如果是一个Promise，就部署resolve和reject在其then方法上
        if (x instanceof MyPromise) {
          x.then(resolve, reject);
        } else {
          // 普通值，直接当做fulfilled处理
          resolve(x);
        }
      }
      // 定义fulfilled的微任务处理器
      const fulfilledMicroTask = () => {
        queueMicrotask(() => {
          try {
            const fulfilledVal = onFulfilledCallback(this.val);
            resolvePromise(promise2, fulfilledVal, resolve, reject);
          } catch (exp) {
            reject(exp);
          }
        });
      };
      // 定义rejected的微任务处理
      const rejectedMicroTask = () => {
        queueMicrotask(() => {
          try {
            const rejectedVal = onRejectedCallback(this.reason);
            resolvePromise(promise2, rejectedVal, resolve, reject);
          } catch (exp) {
            reject(exp);
          }
        });
      };
      // 上一个Promise还是pending状态，因此，需要把当前的函数加入到异步任务队列里面去，
      // 为什么需要使用queueMicroTask呢，因为then的代码是在事件轮循当前同步任务关联的微任务队列里面执行的
      if (this.state === PENDING) {
        this.rejectedCallbacks.push(rejectedMicroTask);
        this.resolveCallbacks.push(fulfilledMicroTask);
      } else if (this.state === REJECTED) {
        // 如果上一个Promise的状态已经变成rejected了，可以直接执行异常逻辑
        rejectedMicroTask();
      } else if (this.state === FULFILLED) {
        // 如果上一个Promise的状态已经变成resolved了，可以直接执行正常逻辑
        fulfilledMicroTask();
      }
    }));
  }

  catch(fn) {
    return this.then(null, (err) => {
      return fn(err);
    });
  }

  finally(fn) {
    return this.then(
      () => {
        // 不能直接绑定fn，需要吃掉返回值
        fn();
      },
      () => {
        // 不能直接绑定fn，需要吃点reason
        fn();
      }
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    } else if (value && typeof value.then === "function") {
      return new MyPromise((resolve, reject) => {
        value.then(resolve, reject);
      }).then(
        (val) => {
          // 递归的解类Promise对象
          return val && typeof val.then === "function"
            ? MyPromise.resolve(val)
            : val;
        },
        (err) => {
          throw err;
        }
      );
    } else {
      return new MyPromise((resolve) => {
        resolve(value);
      });
    }
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(iterator) {
    // 强制将迭代器转成数组
    let arr = [...iterator];
    if (arr.length === 0) {
      return MyPromise.resolve([]);
    }
    return new MyPromise((resolve, reject) => {
      let records = [];
      let size = 0;
      for (let i = 0; i < arr.length; i++) {
        let p = arr[i];
        // 如果不是MyPromise的实例，包裹
        if (!(p instanceof MyPromise)) {
          p = MyPromise.resolve(p);
        }
        p.then((val) => {
          records[i] = val;
          size++;
          if (size === arr.length) {
            resolve(records);
          }
        }).catch((err) => {
          reject(err);
        });
      }
    });
  }

  static allSettled(iterator) {
    const arr = [...iterator];
    return new MyPromise((resolve) => {
      // 如果数组是空的，直接返回一个兑现的结果
      if (arr.length === 0) {
        resolve([]);
      }
      // 定义每个Promise的结果记录数组 和 计数器
      let size = 0;
      let results = [];
      for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        if (!(p instanceof MyPromise)) {
          p = MyPromise.resolve(p);
        }
        p.then((val) => {
          size++;
          results[i] = {
            value: val,
            status: FULFILLED,
          };
          if (size === arr.length) {
            resolve(results);
          }
        }).catch((err) => {
          size++;
          results[i] = {
            status: REJECTED,
            reason: err,
          };
          if (size === arr.length) {
            resolve(results);
          }
        });
      }
    });
  }

  static race(iterator) {
    const arr = [...iterator];
    return new MyPromise((resolve, reject) => {
      // 如果arr为空，则永远pending
      for (let i = 0; i < arr.length; i++) {
        let p = arr[i];
        // 如果不是MyPromise的实例，包裹
        if (!(p instanceof MyPromise)) {
          p = MyPromise.resolve(p);
        }
        p.then((val) => {
          // 任意一个状态变化了，就可以直接返回fulfilled的值
          resolve(val);
        }).catch((err) => {
          // 任意一个出错，就透传这个错误
          reject(err);
        });
      }
    });
  }

  static any(iterator) {
    const arr = [...iterator];
    // 入了一个空的可迭代对象，那么就会返回一个已经被拒的promise
    if (arr.length === 0) {
      return MyPromise.reject(new AggregateError([]));
    }
    return new MyPromise((resolve, reject) => {
      // 定义被拒绝的计数和错误数组
      let rejectedSize = 0;
      let rejectedErrs = [];
      for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        if (!(p instanceof MyPromise)) {
          p = MyPromise.resolve(p);
        }
        p.then((val) => {
          // 有一个promise fulfilled，则这个promise的值就是最终返回的Promise的值
          resolve(val);
        }).catch((err) => {
          // 如果所有的Promise都拒绝了，则抛出错误
          rejectedSize++;
          rejectedErrs[i] = err;
          if (rejectedSize === arr.length) {
            reject(new AggregateError(rejectedErrs));
          }
        });
      }
    });
  }
}
```
