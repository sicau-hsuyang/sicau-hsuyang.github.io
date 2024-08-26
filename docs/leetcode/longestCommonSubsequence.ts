export function longestCommonSubsequence(text1: string, text2: string): number {
  if (text1 === "" || text2 === "") {
    return 0;
  }
  const dp: number[][] = Array.from({
    length: text1.length,
  }).map((v) => {
    return Array.from({
      length: text2.length,
    }).fill(0);
  }) as number[][];
  // 当text2的长度是0时，肯定都是没有公共子序列的
  for (let i = 0; i < text1.length; i++) {
    dp[i][0] = text1[i] === text2[0] ? 1 : 0;
  }
  // 当text1的长度是0时，肯定都没有公共子序列的
  for (let j = 0; j < text2.length; j++) {
    dp[0][j] = text2[j] === text1[0] ? 1 : 0;
  }
  for (let i = 1; i < text1.length; i++) {
    for (let j = 1; j < text2.length; j++) {
      // 如果相同的话
      if (text1[i] === text2[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[text1.length - 1][text2.length - 1];
}
