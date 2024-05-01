function minDistance(word1: string, word2: string): number {
  const dp: number[][] = Array.from({
    length: word1.length,
  }).map((v) => {
    return [];
  }) as number[][];
  for (let i = 0; i < word1.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j < word2.length; j++) {
    dp[0][j] = j;
  }
  for (let i = 0; i < word1.length; i++) {
    for (let j = 0; j < word2.length; j++) {
      if (word1[i] === word2[j]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        const insert = dp[i - 1][j];
        const remove = dp[i][j - 1];
        const update = dp[i - 1][j - 1];
        // 增加一次操作次数
        dp[i][j] = Math.min(insert, remove, update) + 1;
      }
    }
  }
}
