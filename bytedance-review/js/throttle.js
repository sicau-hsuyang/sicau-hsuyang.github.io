function throttle(fn, ms) {
  let now = Date.now();
  return function throttled() {
    const cur = Date.now();
    if (now - cur > ms) {
      fn.apply(this, arguments);
      now = cur;
    }
  };
}
