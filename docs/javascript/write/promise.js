// function genPromise(num) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(num);
//     }, 1000);
//   });
// }

// let res = null;

// const p = new Promise((resolve, reject) => {
//   res = resolve;
// });

// let head = p;
// let start = head;

// for (let i = 1; i <= 10; i++) {
//   const node = genPromise(i);
//   head.then((value) => {
//     console.log(value);
//     return node;
//   });
//   head = node;
// }

// res(111);

// /**
//  * 定义Promise的三种状态
//  */
// const PENDING = "pending";

// const FULFILLED = "fulfilled";

// const REJECTED = "rejected";

// class MyPromise {
//   /**
//    * 定义Promise的初始状态，初始状态为pending
//    */
//   state = PENDING;
//   /**
//    * 定义Promise的初始值，初始值为undefined
//    */
//   val = undefined;
//   /**
//    * 定义Promise的错误原因，初始值为undefined
//    */
//   reason = undefined;

//   resolve(val) {
//     // 只有状态为pending状态的才能变为FULFILLED
//     if (this.state === PENDING) {
//       this.val = val;
//       this.state = FULFILLED;
//     }
//   }

//   reject(reason) {
//     // 只有状态为pending状态的才能变为REJECTED
//     if (this.state === PENDING) {
//       this.reason = reason;
//       this.state = REJECTED;
//     }
//   }

//   constructor(executor) {
//     try {
//       executor(this.resolve, this.reject);
//     } catch (exp) {
//       this.reject(exp);
//     }
//   }
// }

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

// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(300);
//   }, 3000);
// })
//   .then((val) => {
//     return val * 100;
//   })
//   .then((val) => {
//     throw new Error(val);
//   })
//   .then()
//   .then(null, (error) => {
//     console.log(error);
//   })
//   .then()
//   .then(() => {
//     return new MyPromise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(1000);
//       }, 1000);
//     });
//   })
//   .then((val) => {
//     console.log(val);
//   });

// const a = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("a Promise");
//     resolve("promise a");
//   }, 3000);
// });

// const b = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("b Promise");
//     resolve("promise b");
//   }, 3000);
// });

// const c = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("c Promise");
//     resolve("promise c");
//   }, 3000);
// });

// const tmp = [1, a, 2, 4, b, c];

// const it = {
//   [Symbol.iterator]() {
//     let idx = 0;
//     return {
//       next() {
//         const res = {
//           value: tmp[idx],
//           done: idx === tmp.length,
//         };
//         idx++;
//         return res;
//       },
//     };
//   },
// };
// console.log(Date.now());

// Promise.all(it).then((res) => {
//   console.log(res);
//   console.log(Date.now());
// });

// function* gen() {
//   yield a;
//   yield b;
//   yield c;
// }

// Promise.all(gen()).then((res) => {
//   console.log(res);
// });

// // we are passing as argument an array of promises that are already resolved,
// // to trigger Promise.all as soon as possible
// var resolvedPromisesArray = [
//   Promise.resolve(33).then(() => {
//     console.log(2222);
//     return 111;
//   }),
//   Promise.resolve(44).then(() => {
//     console.log(333);
//     return 222;
//   }),
// ];

// var p = Promise.all(resolvedPromisesArray);
// // immediately logging the value of p
// console.log(p);

// p.then((res) => {
//   console.log(res);
// });

// // using setTimeout we can execute code after the stack is empty
// setTimeout(function () {
//   console.log("the stack is now empty");
//   console.log(p);
// });

// var p = Promise.all([]); // will be immediately resolved
// var p2 = Promise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously

// p.then(() => {
//   console.log("1111");
// });

// console.log(p.state);
// console.log(p2);
// setTimeout(function () {
//   console.log("the stack is now empty");
//   console.log(p2);
// });

// logs
// Promise { <state>: "fulfilled", <value>: Array[0] }
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }

// var p1 = MyPromise.resolve(3);
// var p2 = 1337;
// var p3 = new MyPromise((resolve, reject) => {
//   setTimeout(resolve, 100, "foo");
// });

// MyPromise.all([p1, p2, p3]).then((values) => {
//   console.log(values); // [3, 1337, "foo"]
// });

// this will be counted as if the iterable passed is empty, so it gets fulfilled
// var p = MyPromise.all([1, 2, 3]);
// // this will be counted as if the iterable passed contains only the resolved promise with value "444", so it gets fulfilled
// var p2 = MyPromise.all([1, 2, 3, MyPromise.resolve(444)]);
// // this will be counted as if the iterable passed contains only the rejected promise with value "555", so it gets rejected
// var p3 = MyPromise.all([1, 2, 3, MyPromise.reject(555)]);

// // using setTimeout we can execute code after the stack is empty
// setTimeout(function () {
//   console.log(p);
//   console.log(p2);
//   console.log(p3);
// });

// logs
// Promise { <state>: "fulfilled", <value>: Array[3] }
// Promise { <state>: "fulfilled", <value>: Array[4] }
// Promise { <state>: "rejected", <reason>: 555 }

// we are passing as argument an array of promises that are already resolved,
// to trigger Promise.all as soon as possible
// var resolvedPromisesArray = [MyPromise.resolve(33), MyPromise.resolve(44)];

// var p = MyPromise.all(resolvedPromisesArray);
// // immediately logging the value of p
// console.log(p);

// // using setTimeout we can execute code after the stack is empty
// setTimeout(function(){
//     console.log('the stack is now empty');
//     console.log(p);
// });

// logs, in order:
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }

// var p = MyPromise.all([]); // will be immediately resolved
// var p2 = MyPromise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously
// console.log(p);
// console.log(p2);
// setTimeout(function () {
//   console.log("the stack is now empty");
//   console.log(p2);
// });

// logs
// Promise { <state>: "fulfilled", <value>: Array[0] }
// Promise { <state>: "pending" }
// the stack is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }

// var p1 = new MyPromise((resolve, reject) => {
//   setTimeout(resolve, 1000, "one");
// });
// var p2 = new MyPromise((resolve, reject) => {
//   setTimeout(resolve, 2000, "two");
// });
// var p3 = new MyPromise((resolve, reject) => {
//   setTimeout(resolve, 3000, "three");
// });
// var p4 = new MyPromise((resolve, reject) => {
//   setTimeout(resolve, 4000, "four");
// });
// var p5 = new MyPromise((resolve, reject) => {
//   reject("reject");
// });

// MyPromise.all([p1, p2, p3, p4, p5]).then(
//   (values) => {
//     console.log(values);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

// //From console:
// //"reject"

// //You can also use .catch
// MyPromise.all([p1, p2, p3, p4, p5])
//   .then((values) => {
//     console.log(values);
//   })
//   .catch((reason) => {
//     console.log(reason);
//   });

//From console:
//"reject"

const p = MyPromise.allSettled([]);

console.log(p);
