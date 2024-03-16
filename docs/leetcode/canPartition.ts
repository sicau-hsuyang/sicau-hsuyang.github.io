export function canPartition(nums: number[]): boolean {
  let sum = nums.reduce((accumulate, item) => {
    return accumulate + item;
  });
  // 单数，肯定是无论如何都不可能的
  if (sum % 2 !== 0) {
    return false;
  }
  let target = sum / 2;
  let dp: number[] = Array.from({
    length: target + 1,
  }).fill(0) as number[];

  // 物品
  for (let i = 0; i < nums.length; i++) {
    // 重量
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
      if (dp[j] === target) {
        return true;
      }
    }
  }
  return false;
}
