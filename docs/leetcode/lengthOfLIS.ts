export function lengthOfLIS(nums: number[]): number {
  // 初始化的时候，肯定是有一个的
  let dp: number[] = [1];
  let maxDistance = 1;
  for (let i = 1; i < nums.length; i++) {
    let maxLength = 1;
    // 从i到j，找到所有比num[i]小的的数，根据它们去推导，从而找到最大的可能性
    for (let j = 0; j < i; j++) {
      // 找i之前每个比nums[i]小的数，根据它们的长度推导出包含nums[i]的最长长度
      let D = nums[j] < nums[i] ? dp[j] + 1 : 0;
      // 更新以nums[i]结尾的递增子序列的最大长度
      maxLength = Math.max(maxLength, D);
    }
    // 找到了以nums[i]结尾的最大子序列的长度
    dp[i] = maxLength;
    // 更新最终的结果长度
    maxDistance = Math.max(maxDistance, dp[i]);
  }
  return maxDistance;
}
