/**
 * 消除陆地
 */
function disappearLand(grid: number[][], row: number, col: number) {
  // 越界，或者已经是水了
  if (
    row < 0 ||
    row >= grid.length ||
    col < 0 ||
    col >= grid[row].length ||
    grid[row][col] > 0
  ) {
    return;
  }
  // 变成水
  grid[row][col] = 1;
  disappearLand(grid, row - 1, col);
  disappearLand(grid, row + 1, col);
  disappearLand(grid, row, col - 1);
  disappearLand(grid, row, col + 1);
}

function transformIsland(grid: number[][]) {
  let n = grid.length;
  let m = grid[0].length;
  // 从边界的四面八方出发，开始消除
  // 处理第一行和最后一行
  for (let col = 0; col < m; col++) {
    disappearLand(grid, 0, col);
    disappearLand(grid, n - 1, col);
  }
  // 处理第一列和最后一列
  for (let row = 0; row < n; row++) {
    disappearLand(grid, row, 0);
    disappearLand(grid, row, m - 1);
  }
}

export function closedIsland(grid: number[][]): number {
  transformIsland(grid);
  let total = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      if (grid[i][j] === 0) {
        disappearLand(grid, i, j);
        total++;
      }
    }
  }
  return total;
}
