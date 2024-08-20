export function firstMissingPositive(nums: number[]): number {
  let n = nums.length;
  let right = n;
  let left = 0;
  while (left < right) {
    if (nums[left] === left + 1) {
      left++;
    } else if (
      nums[left] <= left ||
      nums[left] > right ||
      nums[nums[left] - 1] === nums[left]
    ) {
      right--;
    } else {
      let temp = nums[right];
      nums[right] = nums[nums[left] - 1];
      nums[nums[left] - 1] = temp;
    }
  }
  return left + 1;
}
