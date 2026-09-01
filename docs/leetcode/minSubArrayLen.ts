/**
 * 求满足和大于等于target的最小连续子数组
 * @param {number} target 目标值
 * @param {number[]} arr 原数组
 */
export function minSubArrayLen(target: number, nums: number[]) {
  let left = 0;
  let maxDistance = Infinity;
  let windowSum = 0;
  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];
    while (windowSum >= target) {
      let currentDistance = right - left + 1;
      maxDistance = Math.min(maxDistance, currentDistance);
      windowSum -= nums[left];
      left++;
    }
  }
  return maxDistance == Infinity ? 0 : maxDistance;
}
