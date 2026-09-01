export function minDistance(word1: string, word2: string): number {
  let dp: number[][] = Array.from({
    length: word1.length + 1,
  }).map(() => {
    return Array.from({
      length: word2.length + 1,
    }).fill(0);
  }) as number[][];
  // 假设word2的长度是0
  for (let i = 1; i <= word1.length; i++) {
    dp[i][0] = i;
  }
  // 假设word1的长度是0
  for (let j = 1; j <= word2.length; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      // 相同，不用删除
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 删除i 或者删除 j
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + 1;
      }
    }
  }
  return dp[word1.length][word2.length];
}

/**

dp[i][j] 表示 word1的长度为i,word2的长度为j时的最小删除步数

*/
