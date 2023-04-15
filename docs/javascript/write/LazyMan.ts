// LazyMan("Tony");
// // Hi I am Tony

// LazyMan("Tony").sleep(10).eat("lunch");
// // Hi I am Tony
// // 等待了10秒...
// // I am eating lunch

// LazyMan("Tony").eat("lunch").sleep(10).eat("dinner");
// // Hi I am Tony
// // I am eating lunch
// // 等待了10秒...
// // I am eating diner

// LazyMan("Tony")
//   .eat("lunch")
//   .eat("dinner")
//   .sleepFirst(5)
//   .sleep(10)
//   .eat("junk food");
// // Hi I am Tony
// // 等待了5秒...
// // I am eating lunch
// // I am eating dinner
// // 等待了10秒...
// // I am eating junk food

export class LazyMan {
  private emergencyQueue: Array<() => Promise<void>> = [];

  private normalQueue: Array<() => Promise<void>> = [];

  private timer: NodeJS.Timeout | null = null;

  done: null | Function = null;

  constructor(name: string) {
    console.log("Hi I am " + name);
  }

  private wrapperAwaitTask(second: number) {
    return (msg: string) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          if (msg) {
            console.log(msg);
          }
          resolve();
        }, second * 1000);
      });
  }

  setFinish(fn: Function) {
    this.done = fn;
  }

  sleepFirst(second: number) {
    const task = this.wrapperAwaitTask(second);
    this.emergencyQueue.push(() => task("等待了" + second + "秒..."));
    return this;
  }

  sleep(second: number) {
    const task = this.wrapperAwaitTask(second);
    this.normalQueue.push(() => task("等待了" + second + "秒..."));
    return this;
  }

  private run() {
    const queue: Array<() => Promise<void>> = [
      ...this.emergencyQueue,
      ...this.normalQueue,
      async () => {
        this.done && this.done();
        this.done = null;
      },
    ];
    this.emergencyQueue = [];
    this.normalQueue = [];

    const fn = () => {
      if (queue.length <= 0) {
        return;
      }
      const task = queue.shift();
      let t = setInterval(() => {
        console.log("等待中...");
      }, 100);
      task!().then(() => {
        clearInterval(t);
        fn();
      });
    };

    fn();
  }

  eat(meal: string) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const task = this.wrapperAwaitTask(0);
    this.normalQueue.push(() => task("I am eating " + meal));
    this.timer = setTimeout(() => {
      this.run();
    }, 0);
    return this;
  }
}
