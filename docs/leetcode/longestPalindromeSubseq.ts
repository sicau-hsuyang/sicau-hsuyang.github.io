export function longestPalindromeSubseq(s: string): number {
  let dp = Array.from({
    length: s.length,
  }).map(() => {
    return Array.from({
      length: s.length,
    }).fill(1);
  }) as number[][];
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = 1;
  }
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < s.length; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
      }
    }
  }
  return dp[0][s.length - 1];
}
