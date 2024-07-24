export function longestIncreasingPath(matrix: number[][]): number {
  /**
   * 用来记住递增的索引
   */
  const record = Array.from({
    length: matrix.length,
  }).map((v) => {
    return [];
  }) as number[][];

  const dfs = (
    matrix: number[][],
    startX: number,
    startY: number,
    prevVal: number
  ): number => {
    // 越界 或者非递增
    if (
      startY < 0 ||
      startY >= matrix.length ||
      startX < 0 ||
      startX >= matrix[startY].length ||
      matrix[startY][startX] <= prevVal
    ) {
      return 0;
    }
    if (typeof record[startY][startX] !== "undefined") {
      return record[startY][startX];
    }
    const current = matrix[startY][startX];
    // 防止走回头路
    matrix[startY][startX] = -1;
    // 向左
    const leftRes = dfs(matrix, startX - 1, startY, current);
    // 向右
    const rightRes = dfs(matrix, startX + 1, startY, current);
    // 向下
    const bottomRes = dfs(matrix, startX, startY + 1, current);
    // 向上
    const topRes = dfs(matrix, startX, startY - 1, current);
    // 将原来的值换回来
    matrix[startY][startX] = current;
    const size = Math.max(leftRes, rightRes, bottomRes, topRes) + 1;
    // 记住从这个节点开始的最大长度是多少
    record[startY][startX] = size;
    return size;
  };

  let maxPathCount = -Infinity;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const count = dfs(matrix, j, i, -1);
      if (count > maxPathCount) {
        maxPathCount = count;
      }
    }
  }

  return maxPathCount;
}
