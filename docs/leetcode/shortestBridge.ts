interface Cell {
  row: number;
  col: number;
  distance: number;
}

/**
 * 首先找到一个岛所有与水相连的边
 * @param startY
 * @param startX
 * @param grid
 * @returns
 */
function findStartCells(
  startY: number,
  startX: number,
  grid: number[][]
): Cell[] {
  const edges: Cell[] = [];
  const queue: number[][] = [[startY, startX]];
  while (queue.length) {
    const [y, x] = queue.shift()!;
    if (grid[y][x] === -1) {
      continue;
    }
    grid[y][x] = -1;
    const left = grid[y][x - 1] === 0;
    const right = grid[y][x + 1] === 0;
    const top = grid[y - 1] && grid[y - 1][x] === 0;
    const bottom = grid[y + 1] && grid[y + 1][x] === 0;
    // 如果是边界的话
    if (left || right || top || bottom) {
      edges.push({
        row: y,
        col: x,
        distance: 0,
      });
      grid[y][x] = 2;
    }
    if (grid[y][x - 1] === 1) {
      queue.push([y, x - 1]);
    }
    if (grid[y][x + 1] === 1) {
      queue.push([y, x + 1]);
    }
    if (grid[y - 1] && grid[y - 1][x] === 1) {
      queue.push([y - 1, x]);
    }
    if (grid[y + 1] && grid[y + 1][x] === 1) {
      queue.push([y + 1, x]);
    }
  }
  return edges;
}

export function shortestBridge(grid: number[][]): number {
  let startX: number = -1;
  let startY: number = -1;
  // 找到其中一个岛屿
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        startY = i;
        startX = j;
        break;
      }
    }
    if (startX >= 0 && startY >= 0) {
      break;
    }
  }
  let minDistance = Number.MAX_VALUE;
  const edges = findStartCells(startY, startX, grid);
  const queue: Cell[] = edges;
  while (queue.length) {
    const { row, col, distance } = queue.shift()!;
    if (grid[row][col] === -1) {
      continue;
    }
    grid[row][col] = -1;
    // 找到了另外一个岛的边界
    const left = grid[row][col - 1] === 1;
    const right = grid[row][col + 1] === 1;
    const top = grid[row - 1] && grid[row - 1][col] === 1;
    const bottom = grid[row + 1] && grid[row + 1][col] === 1;
    if ((left || right || top || bottom) && distance < minDistance) {
      minDistance = distance;
    }
    if (grid[row][col - 1] === 0) {
      queue.push({
        row,
        col: col - 1,
        distance: distance + 1,
      });
    }
    if (grid[row][col + 1] === 0) {
      queue.push({
        row,
        col: col + 1,
        distance: distance + 1,
      });
    }
    if (grid[row - 1] && grid[row - 1][col] === 0) {
      queue.push({
        row: row - 1,
        col,
        distance: distance + 1,
      });
    }
    if (grid[row + 1] && grid[row + 1][col] === 0) {
      queue.push({
        row: row + 1,
        col,
        distance: distance + 1,
      });
    }
  }
  return minDistance;
}
