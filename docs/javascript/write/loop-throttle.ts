// function loopThrottle(fn, ctx) {
//   let isExecuted = false;
//   function newFn(...args) {
//     const res = fn.apply(this, args);
//     isExecuted = true;
//     return res;
//   }
//   return function throttled(...args) {
//     if (isExecuted) {
//       return;
//     }
//     const response = newFn.apply(ctx || this, args);
//     Promise.resolve().then(() => {
//       isExecuted = false;
//     });
//     return response;
//   };
// }

// // const fn = () => {
// //   console.log("@@@@@@@@@fn@@@@@@@@@");
// // };

// // const throttledFn = loopThrottle(fn);

// // for (let i = 0; i < 10; i++) {
// //   throttledFn();
// // }

// // let count = 0;

// // function execute() {
// //   throttledFn();
// //   count++;
// //   if (count < 10) {
// //     setTimeout(execute, 0);
// //   }
// // }

// // execute();

export function eventLoopThrottle<T extends unknown[], R>(
  fn: (...args: T) => R,
  ctx: unknown
): (...args: T) => R {
  let isExecuted = false;
  return function throttled(...args: T) {
    if (isExecuted) {
      return;
    }
    const response = fn.apply(ctx || this, args);
    isExecuted = true;
    Promise.resolve().then(() => {
      isExecuted = false;
    });
    return response;
  };
}
