export function numSubarraysWithSum(nums: number[], goal: number): number {
  let total = 0;
  let left = 0;
  let sum = 0;
  for (let right = 0; right < nums.length; right++) {
    const num = nums[right];
    sum += num;
    while (sum >= goal && left <= right) {
      console.log(nums.slice(left, right + 1));
      sum -= nums[left];
      left++;
    }
  }
  return total;
}
