interface Point {
  x: number;
  y: number;
}

export function islandPerimeter(grid: number[][]): number {
  const startPos = findStartPosition(grid);
  // 如果没有陆地
  if (!startPos) {
    return 0;
  }
  /**
   * 用来记住下一个
   */
  const record: number[][] = [];
  const queue: Point[] = [startPos];
  if (!Array.isArray(record[startPos.y])) {
    record[startPos.y] = [];
  }
  record[startPos.y][startPos.x] = 1;
  let perimeter = 0;
  while (queue.length) {
    // 出队一个元素
    const cell = queue.shift()!;
    // 右边，且存在的话，并且不是已经走过的点
    if (!Array.isArray(record[cell.y]) || !record[cell.y][cell.x + 1]) {
      // 右边是水 或者是边界
      if (!grid[cell.y][cell.x + 1]) {
        perimeter++;
      }
      // 如果还没有被处理过
      else {
        const rightCell = {
          x: cell.x + 1,
          y: cell.y,
        };
        queue.push(rightCell);
        if (!Array.isArray(record[cell.y])) {
          record[cell.y] = [];
        }
        record[cell.y][cell.x + 1] = 1;
      }
    }
    // 左边
    if (!Array.isArray(record[cell.y]) || !record[cell.y][cell.x - 1]) {
      // 左边是水或者是边界
      if (!grid[cell.y][cell.x - 1]) {
        perimeter++;
      }
      // 左边还没有被处理过
      else {
        const leftCell = {
          x: cell.x - 1,
          y: cell.y,
        };
        queue.push(leftCell);
        if (!Array.isArray(record[cell.y])) {
          record[cell.y] = [];
        }
        record[cell.y][cell.x - 1] = 1;
      }
    }
    // 上边
    if (!Array.isArray(record[cell.y - 1]) || !record[cell.y - 1][cell.x]) {
      // 上边是水 或者是边界
      if (!Array.isArray(grid[cell.y - 1]) || !grid[cell.y - 1][cell.x]) {
        perimeter++;
      }
      // 上边还没有被处理过
      else {
        const topCell = {
          x: cell.x,
          y: cell.y - 1,
        };
        queue.push(topCell);
        if (!Array.isArray(record[cell.y - 1])) {
          record[cell.y - 1] = [];
        }
        record[cell.y - 1][cell.x] = 1;
      }
    }
    // 下边
    if (!Array.isArray(record[cell.y + 1]) || !record[cell.y + 1][cell.x]) {
      // 下边是水 或者是边界
      if (!Array.isArray(grid[cell.y + 1]) || !grid[cell.y + 1][cell.x]) {
        perimeter++;
      }
      // 下边还没有被处理过
      else {
        const bottomCell = {
          x: cell.x,
          y: cell.y + 1,
        };
        queue.push(bottomCell);
        if (!Array.isArray(record[cell.y + 1])) {
          record[cell.y + 1] = [];
        }
        record[cell.y + 1][cell.x] = 1;
      }
    }
  }
  return perimeter;
}

function findStartPosition(grid: number[][]): Point | null {
  const point: Point = {
    x: 0,
    y: 0,
  };
  for (let row1 = 0; row1 < grid.length; row1++) {
    for (let col1 = 0; col1 < grid[row1].length; col1++) {
      if (grid[row1][col1] === 1) {
        point.y = row1;
        point.x = col1;
        return point;
      }
    }
  }
  return null;
}
