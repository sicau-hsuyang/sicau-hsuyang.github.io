function findPath(grid: number[][], row: number, col: number): number[][] {
  // 越界，遇到障碍物
  if (
    row < 0 ||
    col < 0 ||
    row >= grid.length ||
    col >= grid[row].length ||
    grid[row][col] === 1
  ) {
    return [];
  }
  // 到达了右下角
  if (row === grid.length - 1 && col === grid[row].length - 1) {
    return [[row, col]];
  }
  // 尝试从下边走
  const bottomPath = findPath(grid, row + 1, col);
  if (bottomPath.length) {
    return [[row, col], ...bottomPath];
  }
  // 尝试从右边走
  const rightPath = findPath(grid, row, col + 1);
  if (rightPath.length) {
    return [[row, col], ...rightPath];
  }
  // 堵死路，将来就不要再尝试这条路了，不会有结果的
  grid[row][col] = 1;
  return [];
}

export function pathWithObstacles(obstacleGrid: number[][]): number[][] {
  return findPath(obstacleGrid, 0, 0);
}
