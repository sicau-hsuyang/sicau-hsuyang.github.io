function promisify(fn) {
  return function promised(...args) {
    return new Promise((resolve, reject) => {
      fn.apply(this, [
        ...args,
        (err, ...callbackArgs) => {
          if (!err) {
            resolve(callbackArgs);
          } else {
            reject(err);
          }
        },
      ]);
    });
  };
}

function callbackify(fn) {
  return function callbackFn(...args) {
    // 提取出最后一个参数作为回调函数
    const inputArgs = args.slice(0, args.length - 1);
    const callback = args[args.length - 1];
    fn.apply(this, inputArgs)
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
}
