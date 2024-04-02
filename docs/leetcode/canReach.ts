export function canReach(
  arr: number[],
  start: number,
  set: Set<number> = new Set()
): boolean {
  const el = arr[start];
  const left = start - el;
  const right = start + el;
  const len = arr.length;
  // 已经尝试过了，即走回头路 或者 两种方案都落到了数组的外面
  if (start < 0 || start >= len || set.has(start)) {
    return false;
  }
  // 找到了满意的答案
  if (arr[start] == 0) {
    return true;
  }
  // 往两边跳都有可能
  else {
    set.add(start);
    const leftPlan = canReach(arr, left, set);
    const rightPlan = canReach(arr, right, set);
    return leftPlan || rightPlan;
  }
}
