function countFishSize(
  grid: number[][],
  startX: number,
  startY: number,
  record: number[][]
) {
  const colCount = grid[0].length;
  const rowCount = grid.length;
  // 计算位置
  record[startY][startX] = 1;
  let total = 0;
  const queue: number[][] = [[startY, startX]];
  while (queue.length) {
    const [y, x] = queue.shift()!;
    if (grid[y][x] > 0) {
      total += grid[y][x];
    }
    if (y + 1 < rowCount && grid[y + 1][x] && !record[y + 1][x]) {
      record[y + 1][x] = 1;
      queue.push([y + 1, x]);
    }
    if (y - 1 >= 0 && grid[y - 1][x] && !record[y - 1][x]) {
      record[y - 1][x] = 1;
      queue.push([y - 1, x]);
    }
    if (x - 1 >= 0 && grid[y][x - 1] && !record[y][x - 1]) {
      record[y][x - 1] = 1;
      queue.push([y, x - 1]);
    }
    if (x + 1 < colCount && grid[y][x + 1] && !record[y][x + 1]) {
      record[y][x + 1] = 1;
      queue.push([y, x + 1]);
    }
  }
  return total;
}

export function findMaxFish(grid: number[][]): number {
  const record: number[][] = Array.from({
    length: grid.length,
  }).map(() => {
    return [];
  });
  let maxFishArea = Number.MIN_VALUE;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (record[i][j] || grid[i][j] === 0) {
        continue;
      }
      const size = countFishSize(grid, j, i, record);
      if (size > maxFishArea) {
        maxFishArea = size;
      }
    }
  }
  return maxFishArea;
}
