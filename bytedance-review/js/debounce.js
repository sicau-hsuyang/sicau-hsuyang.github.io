function debounce(fn, ms) {
  let timer;
  return function debounced() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    const args = [...arguments];
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}
