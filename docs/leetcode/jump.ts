export function jump(nums: number[]): number {
  if (nums.length === 1) {
    return 0;
  }
  const dp: number[] = Array.from({
    length: nums.length,
  }).fill(Infinity) as number[];
  // 起跳的位置，起跳不需要花步数，因为起跳就已经在0这个位置上了
  dp[0] = 0;
  for (let i = 0; i < nums.length; i++) {
    const offset = nums[i];
    for (let k = i + 1; k <= offset + i && k < nums.length; k++) {
      // 更新到dp[k]的最小步数，右边的dp[k]表示别的地方到这儿经历的步数，dp[i]+1表示当前正在处理的格子到它所以看的到的格子的范围
      dp[k] = Math.min(dp[k], dp[i] + 1);
    }
  }
  return dp[nums.length - 1];
}
