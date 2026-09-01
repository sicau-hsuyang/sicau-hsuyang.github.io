PENDING = "pending";

FULFILLED = "fulfilled";

REJECTED = "rejected";

class Promise {
  state = PENDING;

  value = undefined;

  reason = "";

  resolveCallbackQueues = [];

  rejectedCallBackQueues = [];

  resolveFn = (val) => {
    if (this.state === PENDING) {
      if (val instanceof Promise) {
        val.then(this.rejectFn, this.rejectFn);
      } else {
        this.value = val;
        this.state = FULFILLED;
        while (this.resolveCallbackQueues.length) {
          const fn = this.resolveCallbackQueues.shift();
          fn();
        }
      }
    }
  };

  rejectFn = (reason) => {
    if (this.state === PENDING) {
      this.reason = reason;
      this.state = REJECTED;
      while (this.rejectedCallBackQueues.length) {
        const fn = this.rejectedCallBackQueues.shift();
        fn();
      }
    }
  };

  constructor(executor) {
    try {
      executor(this.resolveFn, this.rejectFn);
    } catch (exp) {
      this.rejectFn(exp);
    }
  }

  then(resolve, reject) {
    resolve = typeof resolve === "function" ? resolve : (val) => val;
    reject =
      typeof reject === "function"
        ? reject
        : (reason) => {
            throw reason;
          };
    const promise = new Promise((resolveFn, rejectFn) => {
      const resolvePromise = (p, promise, resolve, reject) => {
        if (p === promise) {
          throw new Error("promise chain detected");
        }
        if (p instanceof Promise) {
          p.then(resolve, reject);
        } else {
          resolve(p);
        }
      };

      const resolveCallback = () => {
        queueMicrotask(() => {
          try {
            const val = resolve(this.value);
            resolvePromise(val, promise, resolveFn, rejectFn);
          } catch (exp) {
            rejectFn(exp);
          }
        });
      };

      const rejectedCallback = () => {
        queueMicrotask(() => {
          try {
            const reason = reject(this.reason);
            resolvePromise(reason, promise, resolveFn, rejectFn);
          } catch (exp) {
            rejectFn(exp);
          }
        });
      };

      if (this.state === PENDING) {
        this.rejectedCallBackQueues.push(rejectedCallback);
        this.resolveCallbackQueues.push(resolveCallback);
      } else if (this.state === FULFILLED) {
        resolveCallback();
      } else if (this.state === REJECTED) {
        rejectedCallback();
      }
    });
    return promise;
  }
}
