export function numSquares(n: number): number {
  const dp: number[] = Array.from({
    length: n + 1,
  }).fill(Infinity) as number[];
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    let max = Math.ceil(i / 2);
    if (Math.floor(Math.sqrt(i)) ** 2 === i) {
      dp[i] = 1;
    } else {
      let temp = i;
      for (let j = 1; j <= max; j++) {
        temp = Math.min(dp[j] + dp[i - j], temp);
      }
      dp[i] = temp;
    }
  }
  return dp[n];
}

/**
dp[i] = max{ dp[q] + dp[i-q] }，1<q<i
 */
