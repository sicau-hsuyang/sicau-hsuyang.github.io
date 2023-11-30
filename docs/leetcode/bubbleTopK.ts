export function bubbleTopK(nums: number[], k: number) {
  for (let i = nums.length - 1; i >= k; i--) {
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
  return nums[nums.length - k];
}
