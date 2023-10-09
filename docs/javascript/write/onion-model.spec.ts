import { TaskManager } from "./onion-model";

describe("task manager", () => {
  it("case 1", () => {
    const task = new TaskManager();

    task.addTask(async (next) => {
      console.log(1, "start");
      await next();
      console.log(1, "end");
    });

    task.addTask(async (next) => {
      console.log(2, "start");
      await next();
      console.log(2);
    });

    task.addTask(() => {
      console.log(3);
    });

    task.run();
  });
});
