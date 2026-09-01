export function wiggleMaxLength(nums: number[]): number {
  const dp: Array<{
    distance: number;
    max: number;
  }> = [];
  // 初始化
  dp[0] = {
    distance: 0,
    max: 1,
  };
  let maxLength = 0;
  for (let i = 1; i < nums.length; i++) {
    let passMax = 0;
    for (let j = 0; j < i; i++) {
      const current = nums[i];
      const currentDistance = current - nums[j];
      // 当前是正，之前是负
      if (currentDistance < 0 && dp[j].distance > 0) {
      }
      // 当前是负，之前是正
      else if (currentDistance > 0 && dp[j].distance < 0) {
      }
    }
  }
  return maxLength;
}
