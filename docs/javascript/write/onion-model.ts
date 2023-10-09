type NextExecutor = () => void;

type Runner = (next: NextExecutor) => unknown;

export class TaskManager {
  /**
   * 定义存储任务的队列
   */
  queue: Runner[] = [];

  /**
   * next函数调用触发器
   */
  private nextCaller = async () => {
    while (this.queue.length) {
      const fn = this.queue.shift()!;
      await fn(this.nextCaller);
    }
  };

  /**
   * 增加一个任务
   * @param task
   */
  public addTask(task: Runner) {
    this.queue.push(task);
  }

  /**
   * 执行任务
   * @returns
   */
  public async run() {
    if (!this.queue.length) {
      return;
    }
    const fn = this.queue.shift()!;
    await fn(this.nextCaller);
    // 如果外界没有调用，手动调用
    this.nextCaller();
  }
}
