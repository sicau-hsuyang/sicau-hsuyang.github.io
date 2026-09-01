function spawn(genFunc) {
  return new Promise((resolve, reject) => {
    const step = (it, val, fn, resolve, reject) => {
      try {
        const result = Reflect.apply(it, fn, [val]);
        if (result.done) {
          resolve(result.value);
        } else {
          Promise.resolve(result.value).then(
            (resp) => {
              step(it, resp, "next", resolve, reject);
            },
            (error) => {
              // 主要是 为了 generator内部的 try-catch如果还有后续逻辑的话，能够执行的到
              step(it, error, "throw", resolve, reject);
            }
          );
        }
      } catch (exp) {
        reject(exp);
      }
    };

    const iterator = genFunc();

    step(iterator, undefined, "next", resolve, reject);
  });
}
