function findMax(grid: number[][], x: number, y: number) {
  // 越界
  if (
    y < 0 ||
    y >= grid.length ||
    x < 0 ||
    x >= grid[y].length ||
    grid[y][x] <= 0
  ) {
    return 0;
  }
  const cell = grid[y][x];
  grid[y][x] = -1;
  const maxProfit = Math.max(
    findMax(grid, x - 1, y),
    findMax(grid, x + 1, y),
    findMax(grid, x, y - 1),
    findMax(grid, x, y + 1)
  );
  grid[y][x] = cell;
  return maxProfit + cell;
}

export function getMaximumGold(grid: number[][]): number {
  let max = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tempMax = findMax(grid, j, i);
      max = Math.max(max, tempMax);
    }
  }
  return max;
}
