import { AsyncTaskScheduler } from "./async-task-scheduler";
describe("async task scheduler", () => {
  let taskScheduler: AsyncTaskScheduler;
  function timeout(time: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  function addTask(time, name) {
    return taskScheduler
      .add(() => {
        let now = Date.now();
        console.log(`异步任务${name}加入时间:${now}`);
        return timeout(time);
      })
      .then(() => {
        console.log(`异步任务完成时间:${Date.now()}`);
        console.log(`任务${name}完成`);
      });
  }

  beforeEach(() => {
    taskScheduler = new AsyncTaskScheduler();
  });

  it("test", async () => {
    addTask(10000, 1); // 10000ms后输出 任务1完成
    addTask(5000, 2); // 5000ms后输出 任务2完成
    addTask(3000, 3); // 8000ms后输出 任务3完成
    addTask(4000, 4); // 12000ms后输出 任务4完成
    await addTask(5000, 5); // 15000ms后输出 任务5完成
  }, 60000);
});
