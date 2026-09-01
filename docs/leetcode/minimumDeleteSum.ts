export function minimumDeleteSum(s1: string, s2: string): number {
  const dp: number[][] = Array.from({
    length: s1.length + 1,
  }).map(() => {
    return Array.from({
      length: s2.length + 1,
    }).fill(0);
  });
  for (let i = 1; i <= s1.length; i++) {
    dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
  }
  for (let i = 1; i <= s2.length; i++) {
    dp[0][i] = dp[0][i - 1] + s2.charCodeAt(i - 1);
  }
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 从s2中删除一个字符
        let plan1 = dp[i][j - 1] + s2.charCodeAt(j - 1);
        // 从s1中删除一个字符
        let plan2 = dp[i - 1][j] + s1.charCodeAt(i - 1);
        dp[i][j] = Math.min(plan1, plan2);
      }
    }
  }
  return dp[s1.length][s2.length];
}
