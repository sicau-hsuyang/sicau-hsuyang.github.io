export function numSubarrayProductLessThanK(nums: number[], k: number): number {
  let total = 0;
  let accumVal;
  let left = 0;
  let right = 0;
  for (; right < nums.length; right++) {
    // 单个元素是否也可以形成子数组
    const num = nums[right];
    if (num < k) {
      console.log([num]);
      total++;
    }
    if (accumVal === undefined) {
      accumVal = num;
    } else {
      accumVal *= num;
    }
    let count = right - left + 1;
    while (accumVal >= k && count > 0) {
      count--;
      accumVal /= nums[left++];
    }
    if (left !== right) {
      console.log(nums.slice(left, right + 1));
      total++;
    }
  }
  while (right - left > 2) {
    console.log(nums.slice(left + 1, right + 1));
    left++;
    total++;
  }
  return total;
}
