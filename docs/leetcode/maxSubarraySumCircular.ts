export function maxSubarraySumCircular(nums: number[]): number {
  let minSum = Infinity;
  let maxSum = -Infinity;
  let sum = 0;
  let tempMinSum = Infinity;
  let tempMaxSum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    tempMaxSum = Math.max(tempMaxSum + nums[i], nums[i]);
    tempMinSum = Math.min(tempMinSum + nums[i], nums[i]);
    minSum = Math.min(tempMinSum, minSum);
    maxSum = Math.max(tempMaxSum, maxSum);
  }
  // 如果数组中全部都是负数
  if (minSum === sum) {
    return maxSum;
  }
  // 否则，求边界的，或者直接的最大数组和
  return Math.max(sum - minSum, maxSum);
}
