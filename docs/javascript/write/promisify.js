// /**
//  * 将一个回调函数形式调用的函数转化成Promise调用的函数
//  * @param {Function} fn 需要转换的函数
//  * @param {object} ctx 指定函数执行的上下文
//  */
// function promisify(fn, ctx) {
//   /**
//    * nodeCallback 有两个条件：
//    * 1. 回调函数在主函数中的参数位置必须是最后一个；
//    * 2. 回调函数参数中的第一个参数必须是error；
//    */
//   return function promisifyFn() {
//     const args = [...arguments];
//     const execCtx = ctx || this;
//     return new Promise((resolve, reject) => {
//       fn.apply(execCtx, [
//         ...args,
//         function callbackExecutor() {
//           const response = [...arguments];
//           const error = response[0];
//           const params = response.slice(1);
//           const resolveParam = params.length > 1 ? params : params[0];
//           if (error) {
//             reject(error);
//           } else {
//             resolve(resolveParam);
//           }
//         },
//       ]);
//     });
//   };
// }

/**
 * 将一个基于回调的异步处理操作转化成基于Promise的异步处理操作
 * @param {Function} fn 函数
 * @param {object} ctx 指定promisifyFn执行的函数上下文
 */
function promisify(fn, ctx) {
  if (typeof fn !== "function") {
    throw new Error("promisify must enhance a function");
  }
  return function promisifyFn() {
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
            resolve(realParams);
          }
        },
      ]);
    });
  };
}

const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "./promise.md");

// fs.readFile(
//   filePath,
//   {
//     encoding: "utf-8",
//   },
//   function callback(err, data) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(data);
//   }
// );

const readFilePromise = promisify(fs.readFile);

readFilePromise(path.resolve(__dirname, "./promise.md"), {
  encoding: "utf-8",
}).then((resp) => {
  console.log(resp);
});

// function d() {
//   return new Promise((resolve) => {
//     resolve.apply(this, [1, 2, 3, 4, 5]);
//   }).then((a, b, c, d) => {
//     console.log(a, b, c, d);
//   });
// }
