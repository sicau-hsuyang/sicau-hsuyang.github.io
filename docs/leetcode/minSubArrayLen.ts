/**
 * 求满足和大于等于target的最小连续子数组
 * @param {number} target 目标值
 * @param {number[]} arr 原数组
 */
export function minSubArrayLen(target: number, nums: number[]) {
  let sum = 0;
  let left = 0;
  let minDistance = Infinity;
  for (let right = 0; right < nums.length; right++) {
    const num = nums[right];
    sum += num;
    while (sum >= target) {
      let D = right - left + 1;
      if (minDistance > D) {
        minDistance = D;
      }
      sum -= nums[left++];
    }
  }
  return Number.isFinite(minDistance) ? minDistance : 0;
}
