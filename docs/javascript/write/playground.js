const PENDING = "pending";

const FULFILLED = "fulfilled";

const REJECTED = "reject";

class MyPromise {
  value;

  reason;

  state = PENDING;

  resolveAsyncCallbacks = [];

  rejectAsyncCallbacks = [];

  resolve = (val) => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = val;
      while (this.resolveAsyncCallbacks.length) {
        const fn = this.resolveAsyncCallbacks.shift();
        fn?.(val);
      }
    }
  };

  reject = (reason) => {
    if (this.state === PENDING) {
      this.reason = reason;
      this.state = REJECTED;
      while (this.rejectAsyncCallbacks.length) {
        const fn = this.rejectAsyncCallbacks.shift();
        fn?.(reason);
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

  then(fulfilledCallback, rejectedCallback) {
    const onFulfilledCallback =
      typeof fulfilledCallback === "function" ? fulfilledCallback : (v) => v;
    const onRejectedCallback =
      typeof rejectedCallback === "function"
        ? rejectedCallback
        : (reason) => {
            throw reason;
          };
    const promise2 = new MyPromise((resolve, reject) => {
      const resolveFn = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilledCallback(this.value);
            if (x === promise2) {
              throw new TypeError("promise chain called");
            }
            if (x && typeof x.then === "function") {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (exp) {
            reject(exp);
          }
        });
      };

      const rejectFn = () => {
        queueMicrotask(() => {
          try {
            const x = onRejectedCallback(this.reason);
            if (x === promise2) {
              throw new TypeError("promise chain called");
            }
            if (x && typeof x.then === "function") {
              x.then(resolve, reject);
            } else {
              reject(x);
            }
          } catch (exp) {
            reject(exp);
          }
        });
      };

      if (this.state === PENDING) {
        this.resolveAsyncCallbacks.push(resolveFn);
        this.rejectAsyncCallbacks.push(rejectFn);
      } else if (this.state === FULFILLED) {
        resolveFn();
      } else if (this.state === REJECTED) {
        rejectFn();
      }
    });
    return promise2;
  }
}
