export function islandPerimeter(grid: number[][]): number {
  const startPos = findStartPosition(grid);
  // 如果没有陆地
  if (!startPos) {
    return 0;
  }
  let totalLength = 0;
  const queue = [startPos];
  const marker: number[][] = [];
  const pathMap = new WeakMap();
  while (queue.length > 0) {
    const p = queue.pop()!;
    if (!Array.isArray(marker[p.x])) {
      marker[p.x] = [];
    }
    let length = 4;
    // 如果有来源节点，减去1
    if (pathMap.has(p)) {
      length--;
    }
    marker[p.x][p.y] = 1;
    if (isLand(grid, p.x, p.y + 1) && !marker[p.x]?.[p.y + 1]) {
      const nextP = { x: p.x, y: p.y + 1 };
      pathMap.set(nextP, p);
      queue.push(nextP);
      length--;
    }
    if (isLand(grid, p.x, p.y - 1) && !marker[p.x]?.[p.y - 1]) {
      const nextP = { x: p.x, y: p.y - 1 };
      pathMap.set(nextP, p);
      queue.push(nextP);
      length--;
    }
    if (isLand(grid, p.x - 1, p.y) && !marker[p.x - 1]?.[p.y]) {
      const nextP = { x: p.x - 1, y: p.y };
      pathMap.set(nextP, p);
      queue.push(nextP);
      length--;
    }
    if (isLand(grid, p.x + 1, p.y) && !marker[p.x + 1]?.[p.y]) {
      const nextP = { x: p.x + 1, y: p.y };
      pathMap.set(nextP, p);
      queue.push(nextP);
      length--;
    }
    // TODO: 两个同时来源一个 可能存在问题
    totalLength += length;
  }
  return totalLength;
}

function isLand(grid: number[][], x: number, y: number) {
  return Array.isArray(grid[x]) && grid[x][y] == 1;
}

function findStartPosition(grid: number[][]): { x: number; y: number } | null {
  const point = {
    x: 0,
    y: 0,
  };
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      if (grid[col][row] === 1) {
        point.y = row;
        point.x = col;
        return point;
      }
    }
  }
  return null;
}
