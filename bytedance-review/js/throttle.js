// function throttle(fn, ms) {
//   let now = Date.now();
//   return function throttled() {
//     const cur = Date.now();
//     if (now - cur > ms) {
//       fn.apply(this, arguments);
//       now = cur;
//     }
//   };
// }
// //

function throttle(fn, ms) {
  let timer;
  let flag = true;
  return function throttled() {
    if (!flag) {
      return;
    }
    flag = false;
    timer = setTimeout(() => {
      flag = true;
    }, ms);
    const res = fn(this, arguments);
    return res;
  };
}
