function isEdgeCell(grid: number[][], x: number, y: number) {
  let n = grid.length;
  let prevX = x - 1;
  let nextX = x + 1;
  // 向左
  if (prevX >= 0 && grid[y][prevX] === 0) {
    return true;
  }
  // 向右
  if (nextX < n && grid[y][nextX] === 0) {
    return true;
  }
  let prevY = y - 1;
  let nextY = y + 1;
  // 向上
  if (prevY >= 0 && grid[prevY][x] === 0) {
    return true;
  }
  // 向下
  if (nextY < n && grid[nextY][x] === 0) {
    return true;
  }
  return false;
}

export function shortestBridge(grid: number[][]): number {
  let startY: number = -1;
  let startX: number = -1;
  let n = grid.length;
  for (let i = 0; i < n; i++) {
    let found = false;
    for (let j = 0; j < n; j++) {
      const cell = grid[i][j];
      // 找到一个岛
      if (cell === 1) {
        startY = i;
        startX = j;
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
  // 用于记录
  const record: number[][] = Array.from({
    length: n,
  }).map((v) => {
    return [];
  });
  // 起始点
  const queue: number[][] = [[startY, startX]];
  // 边缘
  const startEdges: number[][] = [];
  while (queue.length) {
    const node = queue.shift()!;
    const [y, x] = node;
    let prevX = x - 1;
    let nextX = x + 1;
    // 向左
    if (prevX >= 0 && !record[y][prevX] && grid[y][prevX] === 1) {
      queue.push([y, prevX]);
      record[y][prevX] = 1;
      if (isEdgeCell(grid, prevX, y)) {
        startEdges.push([y, prevX]);
      }
    }
    // 向右
    if (nextX < n && !record[y][nextX] && grid[y][nextX] === 1) {
      queue.push([y, nextX]);
      record[y][nextX] = 1;
      if (isEdgeCell(grid, nextX, y)) {
        startEdges.push([y, nextX]);
      }
    }
    let prevY = y - 1;
    let nextY = y + 1;
    // 向上
    if (prevY >= 0 && !record[prevY][x] && grid[prevY][x] === 1) {
      queue.push([prevY, x]);
      record[prevY][x] = 1;
      if (isEdgeCell(grid, x, prevY)) {
        startEdges.push([prevY, x]);
      }
    }
    // 向下
    if (nextY < n && !record[nextY][x] && grid[nextY][x] === 1) {
      queue.push([nextY, x]);
      record[nextY][x] = 1;
      if (isEdgeCell(grid, x, nextY)) {
        startEdges.push([nextY, x]);
      }
    }
  }
  let levelCount = 0;
  const levelQueue: number[][][] = [startEdges];
  while (levelQueue.length) {
    const level = levelQueue.shift()!;
    const nextLevel: number[][] = [];
    let found = false;
    for (let k = 0; k < level.length; k++) {
      const [posY, posX] = level[k];
      // 把当前翻转为陆地，即向外延展一圈
      grid[posY][posX] = 1;
      record[posY][posX] = 1;
      if (grid[posY][posX] === 1 && record[posY][posX]) {
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
    if (nextLevel.length) {
      levelCount++;
      levelQueue.push(nextLevel);
    }
  }
  return levelCount;
}
