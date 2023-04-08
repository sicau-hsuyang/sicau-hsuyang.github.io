/**
 * 1、传入参数为一个函数列表，满足Promise.all的特性。
 * 2、函数返回一个start和pause函数，start可以开启任务的执行，返回结果是一个Promise，其结果可能所有任务执行的结果，也可能是错误信息；start函数可以多次执行，
 *    每次得到的Promise部署then方法之后都能得到预期的结果；pause函数可以暂停任务的执行。
 * 3、每个任务具有原子性，也就是说只能在任务的间隙才可以实现任务的暂停，暂停无法阻止已经开始执行的任务。
 * @param {Function []} taskList
 * @returns
 */
function processTask(taskList) {
  let isRunning = false;
  let taskState = null;
  let resolveCallback = [];
  let rejectCallback = [];
  let taskError = null;
  // 不改变原数据
  const taskQueue = [...taskList];
  // 记录所有异步任务的执行结果
  const results = [];

  function run() {
    if (taskQueue.length <= 0) {
      console.warn("没有任务可执行");
      return;
    }
    if (!isRunning) {
      console.warn("任务已暂停，无法继续执行");
      return;
    }
    if (taskState === "pending") {
      console.warn("当前有任务正在执行中，请等待");
      return;
    }
    if (taskError) {
      console.warn("任务执行过程中存在错误，无法继续执行");
      return;
    }
    taskState = "pending";
    const task = taskQueue.shift();
    const p = Promise.resolve(task());
    p.then(
      (resp) => {
        taskState = "fulfilled";
        results.push({
          status: "fulfilled",
          data: resp,
        });
        // 有可能之前的异步结果不是成功的，因此需要判断所有的异步任务都成功才能返回成功
        if (results.length === taskList.length) {
          while (resolveCallback.length) {
            const resolve = resolveCallback.shift();
            resolve(results);
          }
          isRunning = false;
        } else {
          run();
        }
      },
      (err) => {
        taskState = "rejected";
        taskError = err;
        isRunning = false;
        while (rejectCallback.length) {
          const reject = rejectCallback.shift();
          reject(err);
        }
      }
    );
  }

  return {
    start() {
      isRunning = true;
      // 重新唤起任务，如果当前正在执行任务，可不必要再次执行
      taskState != "pending" && run();
      const p = new Promise((resolve, reject) => {
        // 如果任务已经完成了，那么可以直接给结果
        if (taskError) {
          reject(taskError);
        } else if (results.length === taskList.length) {
          resolve(results);
        } else {
          // 可以支持多个Promise同时状态进行改变
          resolveCallback.push(resolve);
          rejectCallback.push(reject);
        }
      });
      return p;
    },
    pause() {
      isRunning = false;
    },
  };
}

function task1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("task1");
      resolve();
    }, 1000);
  });
}

function task2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("task2");
      resolve();
    }, 1000);
  });
}

function task3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("task3");
      resolve();
    }, 1000);
  });
}

const { start, pause } = processTask([task1, task2, task3]);

const p = start();

p.then(() => {
  console.log("完成");
});

const o = start();

o.then(() => {
  console.log("完成2");
});

console.log("开始暂停任务");
pause();

setTimeout(() => {
  console.log("恢复任务");
  start();
}, 30000);
