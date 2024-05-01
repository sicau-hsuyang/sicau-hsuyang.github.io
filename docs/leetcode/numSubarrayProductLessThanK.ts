export function numSubarrayProductLessThanK(nums: number[], k: number): number {
  let total = 0;
  let accumVal = nums[0];
  let left = 0;
  let right = 1;
  while (right < nums.length) {
    while (accumVal < k && right < nums.length) {
      console.log(nums.slice(left, right + 1));
      right++;
      accumVal *= nums[right];
    }
    while (accumVal >= k && left <= right) {
      accumVal /= nums[left];
      left++;
      // console.log(nums.slice(left, right + 1));
    }
  }
  while (right - left > 1) {
    left++;
    console.log(nums.slice(left, right + 1));
    accumVal /= nums[left];
  }
  return total;
}
