const PromiseStateEnum = {
  Pending: "PENDING",
  Resolved: "RESOLVED",
  Rejected: "Rejected",
};

class MyPromise {
  value = undefined;

  state = PromiseStateEnum.Pending;

  reason = undefined;

  resolvedFnQueue = [];

  rejectedFnQueue = [];

  resolveFn = (val) => {
    if (this.state !== PromiseStateEnum.Pending) {
      return;
    }
    this.state = PromiseStateEnum.Resolved;
    while (this.resolvedFnQueue.length) {
      const fn = this.resolvedFnQueue.shift();
      fn(val);
    }
    if (val instanceof MyPromise) {
      val.then(this.resolveFn, this.rejectFn);
    } else {
      this.value = val;
    }
  };

  rejectFn = (reason) => {
    if (this.state !== PromiseStateEnum.Pending) {
      return;
    }
    while (this.rejectedFnQueue.length) {
      const fn = this.rejectedFnQueue.shift();
      fn(reason);
    }
    this.state = PromiseStateEnum.Rejected;
    this.reason = reason;
  };

  constructor(executor) {
    try {
      executor(this.resolveFn, this.rejectFn);
    } catch (exp) {
      this.rejectFn(exp);
    }
  }

  then(resolveFnExecutor, rejectFnExecutor) {
    resolveFnExecutor = resolveFnExecutor || ((v) => v);
    rejectFnExecutor =
      rejectFnExecutor ||
      ((reason) => {
        throw reason;
      });
    const p = new MyPromise((resolve, reject) => {
      const onResolvedFn = () => {
        queueMicrotask(() => {
          try {
            const val = resolveFnExecutor(this.value);
            if (x === p) {
              throw new Error("promise chain detected");
            }
            if (val instanceof MyPromise) {
              val.then(resolve, reject);
            } else {
              resolve(val);
            }
          } catch (exp) {
            reject(exp);
          }
        });
      };

      const onRejectedFn = () => {
        queueMicrotask(() => {
          try {
            const reason = rejectFnExecutor(this.reason);
            if (x === p) {
              throw new Error("promise chain detected");
            }
            if (reason instanceof MyPromise) {
              reason.then(resolve, reject);
            } else {
              reject(reason);
            }
          } catch (exp) {
            reject(exp);
          }
        });
      };

      if (this.state === PromiseStateEnum.Resolved) {
        onResolvedFn();
      } else if (this.state === PromiseStateEnum.Rejected) {
        onRejectedFn();
      } else {
        this.resolvedFnQueue.push(onRejectedFn);
        this.rejectedFnQueue.push(onRejectedFn);
      }
    });
    return p;
  }

  finally(fn) {
    return this.then(
      (val) => {
        fn(val);
      },
      (reason) => {
        fn(reason);
      }
    );
  }

  catch(fn) {
    return this.then(
      () => {},
      (reason) => {
        fn(reason);
      }
    );
  }
}
