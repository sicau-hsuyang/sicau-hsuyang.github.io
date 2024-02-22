export function thirdMax(nums: number[]): number {
  nums = [...new Set(nums)];
  if (nums.length <= 2) {
    return Math.max(...nums);
  }
  for (let k = 0; k < 3; k++) {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > nums[i + 1]) {
        let temp = nums[i + 1];
        nums[i + 1] = nums[i];
        nums[i] = temp;
      }
    }
  }
  return nums[nums.length - 3];
}
