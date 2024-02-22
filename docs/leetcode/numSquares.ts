export function numSquares(n: number): number {
  const dp: number[] = [0, 1];
  for (let i = 2; i <= n; i++) {
    const val = Math.floor(Math.sqrt(i));
    // 如果当前数是一个完全平方数，则它肯定是1，就不需要再拆分了
    if (val ** 2 === i) {
      dp[i] = 1;
      continue;
    }
    let min = Infinity;
    for (let k = 1; k < i; k++) {
      let v1 = k;
      let v2 = i - k;
      // 取得两个数的拆分的场景的 acc = p + q 分别取p的最小拆分值和q的最小拆分值
      let combine = dp[v1] + dp[v2];
      if (combine < min) {
        min = combine;
      }
    }
    dp[i] = min;
  }
  return dp[n];
}

/**
dp[i] = max{ dp[q] + dp[i-q] }，1<q<i
 */
