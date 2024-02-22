export function integerBreak(n: number): number {
  const dp: number[] = [0, 1, 1];
  for (let num = 3; num <= n; num++) {
    let max = -Infinity;
    for (let k = 1; k < num; k++) {
      let v1 = k;
      let v2 = num - k;
      let acc = Math.max(v1 * v2, dp[v1] * v2, v1 * dp[v2]);
      if (max < acc) {
        max = acc;
      }
    }
    dp[num] = max;
  }
  return dp[n];
}

/**

  dp2 = 1+1, 1 * 1
  dp3 = max{1+2，1+1+1}，

  dpn = max{ Sn*T，Sn * dp[T]，dp[Sn]*T }

  Sn = m * n - m

 */
