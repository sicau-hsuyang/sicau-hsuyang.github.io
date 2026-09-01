export function maximalSquare(matrix: string[][]): number {
  let dp: number[][] = Array.from({
    length: matrix.length,
  }).map(() => {
    return Array.from({
      length: matrix[0].length,
    }).fill(0) as number[];
  }) as number[][];
  let maxArea = 0;
  // 纵向
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === "1") {
      dp[i][0] = 1;
      maxArea = 1;
    }
  }
  // 横向
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[0][i] === "1") {
      dp[0][i] = 1;
      maxArea = 1;
    }
  }
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[i].length; j++) {
      if (matrix[i][j] === "0") {
        dp[i][j] = 0;
      } else {
        let top = dp[i - 1][j];
        let left = dp[i][j - 1];
        let topLeft = dp[i - 1][j - 1];
        let width: number;
        // 可以改构造的case
        if (top === left && top === topLeft) {
          width = Math.sqrt(top) + 1;
        } else {
          width = Math.sqrt(Math.min(top, left, topLeft)) + 1;
        }
        dp[i][j] = width ** 2;
        maxArea = Math.max(dp[i][j], maxArea);
      }
    }
  }
  return maxArea;
}

/**

  dp[i-1][j]
  dp[i][j-1]
  dp[i-1][j-1]

 */

JSON.stringify(
  Array.from({
    length: 40,
  }).map(() => {
    return Array.from({
      length: 80,
    }).fill((Math.random() > 0.5 ? 1 : 0).toString());
  })
);
