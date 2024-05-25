export function maxOperations(nums: number[], k: number): number {
  nums.sort((a, b) => {
    return a - b;
  });
  let left = 0;
  let right = nums.length - 1;
  let counter = 0;
  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === k) {
      left++;
      right--;
      counter++;
    } else if (sum < k) {
      left++;
    } else {
      right--;
    }
  }
  return counter;
}
