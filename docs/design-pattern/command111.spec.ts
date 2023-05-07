const CancelledReason = Symbol("Async task has been cancelled");
/**
 * 可取消的任务
 */
interface CancellableTask<T> {
  /**
   * 异步操作执行函数
   * @param args
   * @returns
   */
  action: (...args: any[]) => Promise<T>;
  /**
   * 取消任务
   * @returns
   */
  cancel: () => void;
}

/**
 * 将一个普通任务包裹成一个可取消的任务
 * @param fn 普通任务
 * @param args 任务参数
 * @returns
 */
function createCancellableTask<T>(
  fn: (...args: any[]) => T | Promise<T>,
  ...args: any[]
): CancellableTask<T> {
  let trigger: ((reason?: any) => void) | null = null;
  let isCancel = false;
  const action = () => {
    // 如果在action方法调用之前就已经调用，那么此刻直接返回一个取消的Promise
    if (isCancel) {
      return Promise.reject(CancelledReason);
    }
    // 部署真正的异步任务，若在异步任务未完成之前取消，则返回取消的原因，否则取最终的结果作为Promise的结果
    return new Promise<T>((resolve, reject) => {
      trigger = reject;
      Promise.resolve(fn(...args))
        .then(resolve)
        .catch(reject);
    });
  };
  const cancel: () => void = () => {
    isCancel = true;
    typeof trigger === "function" && trigger(CancelledReason);
  };
  return {
    action,
    cancel,
  };
}

interface AsyncTaskNode<T> {
  resolve: (value: T) => void;

  reject: (reason: any) => void;

  cancellableTask: CancellableTask<T>;
}

type InsertAction = "push" | "unshift";

class AsyncTaskScheduler<T> {
  /**
   * 定义当前正在执行的异步任务
   */
  private runningTask = 0;
  /**
   * 定义任务调度器允许的最大异步并发量
   */
  private maxTask = 5;
  /**
   * 异步任务队列，用于记录暂时无法处理稍候需要处理的内容
   */
  private asyncTaskQueue: AsyncTaskNode<T>[] = [];
  /**
   * 定义方法，供外界任务内容加入到当前的调度器中执行
   */
  add(cancellableTask: CancellableTask<T>, ac: InsertAction = "push") {
    return new Promise((resolve, reject) => {
      if (this.runningTask < this.maxTask) {
        this.runningTask++;
        const { action } = cancellableTask;
        action()
          .then((response) => {
            this.runningTask--;
            resolve(response);
            this.run();
          })
          .catch((err) => {
            this.runningTask--;
            reject(err);
            this.run();
          });
      } else {
        this.asyncTaskQueue[ac]({
          resolve,
          reject,
          cancellableTask,
        });
      }
    });
  }

  /**
   * 优先插入的任务
   * @param cancellableTask
   */
  addFirst(cancellableTask: CancellableTask<T>) {
    this.add(cancellableTask, "unshift");
  }

  private run() {
    while (this.asyncTaskQueue.length && this.runningTask < this.maxTask) {
      const task = this.asyncTaskQueue.shift();
      const { cancellableTask, reject, resolve } = task!;
      const { action } = cancellableTask;
      this.runningTask++;
      action()
        .then((response) => {
          this.runningTask--;
          resolve(response);
          this.run();
        })
        .catch((err) => {
          this.runningTask--;
          reject(err);
          this.run();
        });
    }
  }
}

function printMsg(msg: string) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(msg);
    }, 3000);
  });
}

function errorMsg(msg: string) {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      reject(msg);
    }, 3000);
  });
}

describe("error", () => {
  let task: CancellableTask<string>;
  let scheduler: AsyncTaskScheduler<string>;

  beforeEach(() => {
    task = createCancellableTask<string>(errorMsg, "hello world");
    scheduler = new AsyncTaskScheduler<string>();
  });

  it("test command 1", (done) => {
    const p = scheduler.add(task);

    p.then((resp) => {
      console.log(resp);
    }).catch((reason) => {
      done();
      expect(reason).toBe(CancelledReason);
    });

    setTimeout(() => {
      task.cancel();
    }, 300);
  });

  it("test command 2", (done) => {
    const now = Date.now();
    const p = scheduler.add(task);

    p.catch((err) => {
      console.log(Date.now() - now);
      done();
      expect(err).toBe("hello world");
    });
  });
});

describe("success", () => {
  let task: CancellableTask<string>;
  let scheduler: AsyncTaskScheduler<string>;

  beforeEach(() => {
    task = createCancellableTask<string>(printMsg, "hello world");
    scheduler = new AsyncTaskScheduler<string>();
  });

  it("test command 1", (done) => {
    const p = scheduler.add(task);

    p.then((resp) => {
      console.log(resp);
    }).catch((reason) => {
      done();
      expect(reason).toBe(CancelledReason);
    });

    setTimeout(() => {
      task.cancel();
    }, 300);
  });

  it("test command 2", (done) => {
    const now = Date.now();
    const p = scheduler.add(task);

    p.then((resp) => {
      console.log(Date.now() - now);
      done();
      expect(resp).toBe("hello world");
    });
  });

  it("test command 3", (done) => {
    const now = Date.now();
    const p = scheduler.add(task);

    p.catch((err) => {
      console.log(Date.now() - now);
      expect(err).toBe(CancelledReason);
      done();
    });

    task.cancel();
  });

  it("test command 4", (done) => {
    const now = Date.now();
    const p = scheduler.add(task);

    p.then((resp) => {
      console.log(Date.now() - now);
      expect(resp).toBe("hello world");
      done();
    });

    setTimeout(() => {
      task.cancel();
    }, 4000);
  });
});
