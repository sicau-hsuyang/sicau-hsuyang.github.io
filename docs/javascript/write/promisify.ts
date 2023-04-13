/**
 * 将一个基于回调的异步处理操作转化成基于Promise的异步处理操作
 * @param fn 函数
 * @param ctx 指定promisifyFn执行的函数上下文
 */
export function promisify(
  fn: Function,
  ctx?: object
): (...args: any[]) => Promise<unknown> {
  if (typeof fn !== "function") {
    throw new Error("promisify must enhance a function");
  }
  return function promisifyFn(): Promise<unknown> {
    const context = ctx || this;
    return new Promise((resolve, reject) => {
      const inputArgs = [...arguments];
      fn.apply(context, [
        ...inputArgs,
        function asyncTaskCallback() {
          const params = [...arguments];
          const realParams = params.slice(1);
          // 将参数提取出来，以简化调用方的使用
          const resolveParams =
            realParams.length <= 1 ? realParams[0] : realParams;
          const err = params[0];
          if (err) {
            reject(err);
          } else {
            resolve(resolveParams);
          }
        },
      ]);
    });
  };
}
