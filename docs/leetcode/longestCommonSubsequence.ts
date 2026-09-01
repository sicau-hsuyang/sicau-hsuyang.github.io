/**
 * 求最长公共子序列
 * 以C[i, j] 表示在字符串1的0-位置，字符串2的0-j位置的最长公共子序列，当text1[i+1]和text2[j+1]想通的时候，则
 * C[i, j] = C[i-1, j-1] + 1
 * 当不相同的时候，可以尝试在C[i-1, j]和C[i, j-1]里面，取一个最大值
 * @param text1
 * @param text2
 */
export function longestCommonSubsequence(text1: string, text2: string): number {
  let dp: number[][] = Array.from({
    length: text1.length + 1,
  }).map(() => {
    return Array.from({
      length: text2.length + 1,
    }).fill(0);
  });
  let max = 0;
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      max = Math.max(max, dp[i][j]);
    }
  }
  return max;
}
