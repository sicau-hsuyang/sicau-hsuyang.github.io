export function findNumberOfLIS(nums: number[]): number {
  let n = nums.length;
  // 最长递增子序列的最大长度 初始化为1
  let maxDistance = 1;
  // 在1的情况下，所以每个元素都是参与计算的
  let maxDistanceCount = n;
  const dp: number[] = [1];
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = dp[j] + 1;
        if (dp[i] > maxDistance) {
          maxDistance = dp[i];
          maxDistanceCount = 1;
        } else if (dp[i] === maxDistance) {
          maxDistanceCount++;
        }
      }
    }
  }
  return maxDistanceCount;
}
