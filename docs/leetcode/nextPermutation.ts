/**
 Do not return anything, modify nums in-place instead.
 */
export function nextPermutation(nums: number[]): void {
  // 最后一个位置
  let k = nums.length - 1;
  while (k > 0 && nums[k] <= nums[k - 1]) {
    k--;
  }
  // 5 4 3 2 1, 直接排序
  if (k === 0) {
    nums.sort((a, b) => {
      return a - b;
    });
    return;
  }
  // 找到下降的位置
  let minVal = nums[k];
  let pos = k;
  // 找到了, 向后找到一个大于nums[k-1]的最小值
  for (let i = k + 1; i < nums.length; i++) {
    if (nums[i] <= minVal && nums[i] > nums[k - 1]) {
      minVal = nums[i];
      pos = i;
    }
  }
  let temp = nums[k - 1];
  nums[k - 1] = minVal;
  nums[pos] = temp;
  let left = k;
  let right = nums.length - 1;
  while (left < right) {
    let t = nums[right];
    nums[right] = nums[left];
    nums[left] = t;
    right--;
    left++;
  }
}

export function eventLoopThrottle<T extends unknown[], R>(
  fn: (...args: T) => R,
  ctx: unknown
): (...args: T) => R {
  let isExecuted = false;
  return function throttled(...args: T) {
    // 如果已经执行过，不再执行
    if (isExecuted) {
      return;
    }
    // 执行函数，并且拿到结果
    const response = fn.apply(ctx || this, args);
    // 设置标记，同一轮事件循环内将无法再次执行
    isExecuted = true;
    Promise.resolve().then(() => {
      // 在下一个宏任务里面清除已经执行的标记
      isExecuted = false;
    });
    return response;
  };
}
