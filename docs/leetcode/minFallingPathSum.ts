export function minFallingPathSum(matrix: number[][]): number {
  let N = matrix.length;
  // 只需要一行
  let dp: number[] = matrix[0];
  for (let row = 1; row < N; row++) {
    const nextDp: number[] = [];
    for (let col = 0; col < N; col++) {
      // 第一列
      let left = col === 0 ? Number.MAX_VALUE : dp[col - 1];
      let center = dp[col];
      // 最后一列
      let right = col === N - 1 ? Number.MAX_VALUE : dp[col + 1];
      nextDp[col] = matrix[row][col] + Math.min(left, center, right);
    }
    dp = nextDp;
  }
  return Math.min(...dp);
}
