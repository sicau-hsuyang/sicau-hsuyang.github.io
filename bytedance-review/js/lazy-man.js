/**

LazyMan("Tony");
// Hi I am Tony

LazyMan("Tony").sleep(10).eat("lunch");
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan("Tony").eat("lunch").sleep(10).eat("dinner");
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan("Tony")
  .eat("lunch")
  .eat("dinner")
  .sleepFirst(5)
  .sleep(10)
  .eat("junk food");
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food



 */

function LazyMan(name) {
  // 打印初始化输出
  console.log("Hi I am" + name);

  const LazyManStruct = {
    sleep,
    eat,
    sleepFirst,
  };

  /**
   * 用于存放普通任务
   */
  const normalQueue = [];
  /**
   * 用于存放优先级比较高的任务
   */
  const priorityQueue = [];

  let triggerTaskSentinelTimer;

  /**
   * 包裹一个ms延时的异步任务
   * @param {number} ms
   * @returns
   */
  const genDelayTask = (ms) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms * 1000);
    });
  };

  /**
   * 清理异步任务
   */
  const clearTask = async () => {
    while (priorityQueue.length) {
      const task = priorityQueue.shift();
      await task();
    }
    while (normalQueue.length) {
      const task = normalQueue.shift();
      await task();
    }
  };

  function sleep(time) {
    normalQueue.push(() => genDelayTask(time));
    return LazyManStruct;
  }

  function eat(food) {
    // 在同步任务里面调用的话，立马就被清理掉了，否则在下一轮事件循环就开始执行
    if (triggerTaskSentinelTimer) {
      clearTimeout(triggerTaskSentinelTimer);
    }
    normalQueue.push(() => {
      // 可以同步执行
      console.log("I am eating " + food);
    });
    triggerTaskSentinelTimer = setTimeout(clearTask, 0);
    return LazyManStruct;
  }

  function sleepFirst(time) {
    priorityQueue.push(() => genDelayTask(time));
    return LazyManStruct;
  }

  return LazyManStruct;
}
