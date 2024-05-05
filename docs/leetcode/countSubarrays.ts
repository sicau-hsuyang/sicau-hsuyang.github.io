export function countSubarrays(nums: number[], k: number): number {
  // 求出数组的最大值
  const max = Math.max(...nums);
  let left = 0;
  let total = 0;
  let windowK = 0;
  let len = nums.length;
  for (let right = 0; right < len; right++) {
    const num = nums[right];
    // 等于最大值，
    if (num !== max) {
      continue;
    }
    // 窗口的最大值增加1
    windowK++;
    while (windowK >= k) {
      // for (let i = right; i < len; i++) {
      //   console.log(nums.slice(left, i + 1));
      //   total++;
      // }
      total += len - right
      if (nums[left] === max) {
        windowK--;
      }
      left++;
    }
  }
  return total;
}

/**

[1, 3, 2, 3]
[1, 3, 2, 3, 3]
[3, 2, 3]
[3, 2, 3, 3]



 */
