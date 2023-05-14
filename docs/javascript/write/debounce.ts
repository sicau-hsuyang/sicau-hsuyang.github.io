/**
 * 防抖
 * @param fn 原函数
 * @param delay 延迟时间
 * @returns
 */
export function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timer;
  return function debounced() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
