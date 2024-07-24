function stolenMaxPlan1(nums: number[]) {
  if (nums.length == 1) {
    return nums[0];
  }
  const dp: number[] = [];
  dp[0] = nums[0];
  dp[1] = Math.max(dp[0], nums[1]);
  // 0-length-1
  for (let i = 2; i < nums.length - 1; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }
  return dp[nums.length - 2];
}

function stolenMaxPlan2(nums: number[]) {
  if (nums.length == 1) {
    return nums[0];
  }
  const dp: number[] = [];
  dp[0] = 0;
  dp[1] = nums[1];
  // 1-length
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }
  return dp[nums.length - 1];
}

export function rob(nums: number[]): number {
  const plan1 = stolenMaxPlan1(nums);
  const plan2 = stolenMaxPlan2(nums);
  return Math.max(plan1, plan2);
}
