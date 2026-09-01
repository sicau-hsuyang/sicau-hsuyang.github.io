export function merge(intervals: number[][]): number[][] {
  // 先排序
  intervals.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });
  const res: number[][] = [];
  let sentinel = -1;
  while (intervals.length) {
    // 直接开启一个新区间
    if (sentinel === -1) {
      const cur = intervals.shift()!;
      res.push([cur[0], -1]);
      sentinel = cur[1];
    }
    // 已经开启了新区间
    else if (sentinel !== -1) {
      const top = intervals[0];
      if (sentinel < top[0]) {
        res[res.length - 1][1] = sentinel;
        sentinel = -1;
      } else {
        // 弹出第一个
        intervals.shift();
        sentinel = Math.max(sentinel, top[1]);
      }
    }
  }
  if (sentinel !== -1) {
    res[res.length - 1][1] = sentinel;
    sentinel = -1;
  }
  return res;
}
