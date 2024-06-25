function countFishSize(grid: number[][], startX: number, startY: number) {
  const colCount = grid[0].length;
  const rowCount = grid.length;
  let total = grid[startY][startX];
  grid[startY][startX] = 0;
  const queue: number[][] = [[startY, startX]];
  while (queue.length) {
    const [y, x] = queue.shift()!;
    if (y + 1 < rowCount && grid[y + 1][x]) {
      queue.push([y + 1, x]);
      total += grid[y + 1][x];
      grid[y + 1][x] = 0;
    }
    if (y - 1 >= 0 && grid[y - 1][x]) {
      queue.push([y - 1, x]);
      total += grid[y - 1][x];
      grid[y - 1][x] = 0;
    }
    if (x - 1 >= 0 && grid[y][x - 1]) {
      queue.push([y, x - 1]);
      total += grid[y][x - 1];
      grid[y][x - 1] = 0;
    }
    if (x + 1 < colCount && grid[y][x + 1]) {
      queue.push([y, x + 1]);
      total += grid[y][x + 1];
      grid[y][x + 1] = 0;
    }
  }
  return total;
}

export function findMaxFish(grid: number[][]): number {
  let maxFishArea = Number.MIN_VALUE;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        continue;
      }
      const size = countFishSize(grid, j, i);
      if (size > maxFishArea) {
        maxFishArea = size;
      }
    }
  }
  return maxFishArea;
}
