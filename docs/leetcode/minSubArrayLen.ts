/**
 * 求满足和大于等于target的最小连续子数组
 * @param {number} target 目标值
 * @param {number[]} arr 原数组
 */
export function minSubArrayLen(target: number, arr: number[]) {
  let minLength = Infinity;
  let left = 0;
  let sum = 0;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum >= target) {
      let subLength = right - left + 1;
      if (subLength < minLength) {
        minLength = subLength;
      }
      sum -= arr[left++];
    }
  }
  return Number.isFinite(minLength) ? minLength : 0;
}