export function findLHS(nums: number[]): number {
  if (nums.length <= 1) {
    return 0;
  }
  nums.sort((a, b) => {
    return a - b;
  });
  let left = 0;
  let right = 1;
  let startMin = nums[0];
  let maxDistance = 0;
  while (right < nums.length) {
    while (nums[right] - startMin > 1) {
      left++;
      startMin = nums[left];
    }
    const distance = right - left + 1;
    if (nums[right] - nums[left] === 1 && distance > maxDistance) {
      maxDistance = distance;
    }
    right++;
  }
  return maxDistance;
}
