export function longestSubarray(nums: number[], limit: number): number {
  let maxDistance = 0;
  let left = 0;
  const len = nums.length;
  // 当前窗口里面的最大值的位置
  let windowMaxPos = 0;
  // 当前窗口里的最小值的位置
  let windowMinPos = 0;
  for (let right = 0; right < len; right++) {
    let num = nums[right];
    // 窗口里面的最大值比来的小
    if (num > nums[windowMaxPos]) {
      // 
      if (limit > Math.abs(num - nums[windowMaxPos])) {
        windowMaxPos = right;
      }
      // 挪动位置
    } else if (num < nums[windowMinPos]) {
      if (limit > Math.abs(num - nums[windowMinPos])) {
        windowMinPos = right;
      }
    }
    // 不改变窗口的最大值，仅仅更新索引
    else if (nums[windowMaxPos] === num) {
      windowMaxPos = right;
    }
    // 不改变窗口的最小值，仅仅更新索引
    else if (nums[windowMinPos] === num) {
      windowMinPos = right;
    }
  }
}
