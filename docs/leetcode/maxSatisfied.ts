export function maxSatisfied(
  customers: number[],
  grumpy: number[],
  minutes: number
): number {
  // 不控制情绪直接可以使得顾客可以满意的人数
  let satisfied = 0;
  for (let i = 0; i < grumpy.length; i++) {
    if (grumpy[i] === 0) {
      satisfied += customers[i];
    }
  }
  // 尝试抑制情绪可以额外使得客人满意的人数
  let windowSatisfied = 0;
  for (let i = 0; i < minutes; i++) {
    if (grumpy[i] === 1) {
      windowSatisfied += customers[i];
    }
  }
  let maxWindowSatisfied = windowSatisfied;
  let left = 0;
  for (let i = minutes; i < customers.length; i++) {
    // 移出窗口的人数，如果是因为老板生气中，可以减少
    if (grumpy[left] === 1) {
      windowSatisfied -= customers[left];
    }
    // 进入窗口的人数，如果是因为老板生气中，可以增加
    if (grumpy[i] === 1) {
      windowSatisfied += customers[i];
    }
    if (maxWindowSatisfied < windowSatisfied) {
      maxWindowSatisfied = windowSatisfied;
    }
    left++
  }
  return satisfied + maxWindowSatisfied;
}
