export function longestIncreasingPath(matrix: number[][]): number {
  const cache: number[][] = Array.from({
    length: matrix.length,
  }).map(() => {
    // return Array.from({
    //   length: matrix[0].length,
    // }).fill(-1) as number[];
    return [];
  }) as number[][];

  const maxIncreasingPathFromPosition = (
    startVal: number,
    prevVal: number,
    matrix: number[][],
    row: number,
    col: number
  ): number => {
    // 越界
    if (
      row < 0 ||
      row >= matrix.length ||
      col < 0 ||
      col >= matrix[row].length
    ) {
      return 0;
    }
    // 如果已经算过
    if (cache[row][col]) {
      return cache[row][col];
    }
    const val = matrix[row][col];
    let step: number;
    if (val > prevVal) {
      matrix[row][col] = 0;
      const top = maxIncreasingPathFromPosition(
        startVal,
        val,
        matrix,
        row - 1,
        col
      );
      const bottom = maxIncreasingPathFromPosition(
        startVal,
        val,
        matrix,
        row + 1,
        col
      );
      const left = maxIncreasingPathFromPosition(
        startVal,
        val,
        matrix,
        row,
        col - 1
      );
      const right = maxIncreasingPathFromPosition(
        startVal,
        val,
        matrix,
        row,
        col + 1
      );
      const maxIncreasing = Math.max(top, bottom, left, right);
      matrix[row][col] = val;
      step = maxIncreasing + 1;
    } else {
      step = 0;
    }
    cache[row][col] = step;
    return step;
  };

  let max = -Infinity;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const maxStep = maxIncreasingPathFromPosition(
        matrix[i][j],
        0,
        matrix,
        i,
        j
      );
      if (maxStep > max) {
        max = maxStep;
      }
    }
  }
  return max;
}
