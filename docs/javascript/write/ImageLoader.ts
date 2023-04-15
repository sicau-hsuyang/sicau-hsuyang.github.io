import EventEmitter from "events";
type Task = () => Promise<string>;

interface Config {
  maxConcurrency: number;
  maxRetryCount: number;
}

type Handler = (...args: any[]) => any;

type EventType = "begin" | "change" | "pause" | "play" | "start" | "finish";

type State = "pending" | "finish" | "pause" | "idle";

export class ImageLoader extends EventEmitter {
  private config: Config = {
    maxConcurrency: 5,
    maxRetryCount: 10,
  };
  /**
   * 当前Loader的状态
   */
  private state: State = "idle";
  /**
   * 当前正在执行的任务
   */
  private runningTask = 0;
  /**
   * 待完成总任务
   */
  private totalTask = 0;
  /**
   * 已完成的任务
   */
  private finishTask = 0;
  /**
   * 无法实时完成的任务，需要用任务队列记录
   */
  private taskQueue: Task[] = [];
  /**
   * 异步任务的执行结果
   */
  private results: Map<Task, string | Error> = new Map();
  /**
   * 用于记录重试的次数
   */
  private retryCounter: WeakMap<Task, number> = new WeakMap();
  /**
   * 可以让外界调用配置，不调用则使用默认
   * @param config
   */
  public setConfig(config: Partial<Config>) {
    // 运行起来了之后，就不能再改变配置了
    if (this.state != "idle") {
      return;
    }
    Object.assign(this.config, config);
  }

  constructor(config: Partial<Config>) {
    super();
    this.setConfig(config);
  }

  /**
   * 重置Loader的状态
   */
  reset() {
    // 重置总任务
    this.totalTask = 0;
    // 重置已完成任务
    this.finishTask = 0;
    // 重置加载器的状态
    this.state = "idle";
    // 重置任务队列
    this.taskQueue = [];
    // 重置正在进行的任务
    this.runningTask = 0;
  }
  /**
   * 暂停任务
   */
  public pause() {
    // 当前状态设置为暂停
    this.state = "pause";
    // 对外抛出暂停事件
    this.emit("pause");
  }
  /**
   * 开始任务
   */
  public play() {
    // 标记当前状态
    this.state = "pending";
    // 对外抛出重新开始事件
    this.emit("play");
    // 重新开启任务
    this.runTask();
  }
  /**
   * 直接停止任务
   */
  public stop() {
    // 直接重置整个任务调度器
    this.reset();
    // 对外抛出终止事件
    this.emit("stop");
  }
  /**
   * 加入一个任务
   * @param task
   * @returns
   */
  public addTask(task: Task): void {
    // 如果一个任务已经结束，则无法再继续添加任务了，必须要手动调用重置方法
    if (this.state === "finish") {
      return;
    }
    // 总任务量增加
    this.totalTask++;
    // 将异步任务加入到队列中
    this.taskQueue.push(task);
    // 如果还没有开始运行，对外触发begin事件
    if (this.state === "idle") {
      this.emit("begin");
    }
    // 尝试执行任务
    this.runTask();
  }
  /**
   * 监听事件
   * @param channel
   * @param handler
   */
  public add(channel: EventType, handler: Handler): void {
    this.on(channel, handler);
  }
  /**
   * 监听事件，一次就销毁
   * @param channel
   * @param handler
   */
  public addOnce(channel: EventType, handler: Handler): void {
    this.once(channel, handler);
  }
  /**
   * 移除事件
   * @param channel
   * @param handler
   */
  public remove(channel: EventType, handler: Handler): void {
    this.off(channel, handler);
  }
  /**
   * 执行任务
   * @returns
   */
  private runTask() {
    // 没有待完成的任务或者暂停，或者超过了最大并发数，不再执行任务
    if (
      this.state === "pause" ||
      this.runningTask >= this.config.maxConcurrency
    ) {
      return;
    }
    // 如果当前没有超过最大并发数，可以继续执行
    const task = this.taskQueue.shift();
    // 如果没有任务了，就不在执行
    if (!task) {
      return;
    }
    const retryCounter = this.retryCounter.get(task!) || 0;
    // 如果已经超过了最大的重试次数
    if (retryCounter >= this.config.maxRetryCount) {
      // 递归调用这个任务，其实为的是直接处理下一个任务，因为这样子的话，比较简单，不用写while
      this.runTask();
      return;
    }
    // 标记当前并发的任务增加
    this.runningTask++;
    const p = task();
    // 用的是TS，但是转义到JS，有可能用户不按规定返回Promise，所以需要用Promise.resolve包一下
    Promise.resolve(p)
      .then((resp: string) => {
        // 已完成任务增加
        this.finishTask++;
        // 对外触发change事件
        this.emit("change", {
          current: this.finishTask,
          total: this.totalTask,
        });
        // 把结果加入到结果集中
        this.results.set(task, resp);
        // 重新开始下一个任务
        this.runningTask--;
        // 说明已经完成了
        if (this.totalTask === this.finishTask) {
          // 报告总任务量和完成结果
          this.emit("finish", {
            total: this.totalTask,
            results: [...this.results.entries()],
          });
        } else {
          this.runTask();
        }
      })
      .catch((err) => {
        // 正在运行的任务减少
        this.runningTask--;
        // 标记任务，失败的状态
        this.results.set(task, err);
        // 设置一下重试的次数
        const counter = this.retryCounter.get(task) || 0;
        this.retryCounter.set(task, counter + 1);
        // 将这个任务增加到队列最后，准备重试
        this.taskQueue.push(task);
        // 重新开始下一个任务
        this.runTask();
      });
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      resolve(base64data.split(",")[1]);
    };
    reader.onerror = () => {
      reject("Unable to convert blob to base64");
    };
  });
}

function loadImage(url: string): Promise<string> {
  return fetch(url)
    .then((resp) => {
      return resp.blob();
    })
    .then((blob) => {
      return blobToBase64(blob);
    });
}
