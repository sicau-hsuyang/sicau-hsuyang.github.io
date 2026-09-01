function creator(count) {
  let maxLimit = count;
  let runningTaskCount = 0;
  const queue = [];

  function setup(fn) {
    return new Promise((resolve, reject) => {
      if (runningTaskCount >= maxLimit) {
        queue.push({
          callback: setup.bind(this, fn),
          resolve,
          reject,
        });
      } else {
        // 没有超过最大限制，可以直接执行
        runningTaskCount++;
        fn()
          .then((resp) => {
            resolve(resp);
            // 重新唤起任务开始执行
            runningTaskCount--;
            while (runningTaskCount < maxLimit && queue.length) {
              const {
                callback,
                resolve: resolveCallback,
                reject: rejectCallback,
              } = queue.shift();
              callback().then(resolveCallback).catch(rejectCallback);
            }
          })
          .catch((err) => {
            runningTaskCount--;
            reject(err);
          });
      }
    });
  }
  return setup;
}
