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
    onFulfilled =
      typeof onFulfilledCallback === "function"
        ? onFulfilledCallback
        : (v) => v;
    // 如果没有部署失败的回调，部署一个默认的，并且透传上一个Promise的错误
    onRejected =
      typeof onRejectedCallback === "function"
        ? onRejectedCallback
        : (reason) => {
            throw reason;
          };
    // 向外界返回一个新的Promise
    return (promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicroTask = queueMicrotask(() => {
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
          if (fulfilledVal === this) {
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

      const rejectedMicroTask = queueMicrotask(() => {
        try {
          const rejectedVal = onRejectedCallback(this.reason);
          if (rejectedVal === this) {
            throw new TypeError("detect promise recursion called");
          }
          if (rejectedVal instanceof MyPromise) {
            fulfilledMicroTask.then(resolve, reject);
          } else {
            reject(rejectedVal);
          }
        } catch (exp) {
          reject(exp);
        }
      });
      // 上一个Promise还是pending状态，因此，需要把当前的函数加入到异步任务队列里面去
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
