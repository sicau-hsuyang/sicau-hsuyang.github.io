/**
function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const taskScheduler = new TaskScheduler();

function addTask(time, name) {
  taskScheduler.add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(10000, 1); // 10000ms后输出 任务1完成
addTask(5000, 2); // 5000ms后输出 任务2完成
addTask(3000, 3); // 8000ms后输出 任务3完成
addTask(4000, 4); // 12000ms后输出 任务4完成
addTask(5000, 5); // 15000ms后输出 任务5完成
*/

interface AsyncTask {
  resolve: (value: unknown) => void;

  reject: (reason: any) => void;

  fn: (...args: any[]) => Promise<unknown>;
}

export class AsyncTaskScheduler {
  /**
   * 定义当前正在执行的异步任务
   */
  private runningTask = 0;
  /**
   * 定义任务调度器允许的最大异步并发量
   */
  private maxTask = 2;
  /**
   * 异步任务队列，用于记录暂时无法处理稍候需要处理的内容
   */
  private asyncTaskQueue: AsyncTask[] = [];
  /**
   * 定义方法，供外界任务内容加入到当前的调度器中执行
   */
  add(fn: (...args: any[]) => Promise<unknown>) {
    return new Promise((resolve, reject) => {
      if (this.runningTask < this.maxTask) {
        this.runningTask++;
        fn()
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
        this.asyncTaskQueue.push({
          resolve,
          reject,
          fn,
        });
      }
    });
  }

  private run() {
    while (this.asyncTaskQueue.length && this.runningTask < this.maxTask) {
      const task = this.asyncTaskQueue.shift();
      const { fn, resolve, reject } = task!;
      this.runningTask++;
      fn()
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
