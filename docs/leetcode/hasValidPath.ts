// 向左走，只有可能是1,4,6
const leftOptions = [1, 4, 6];
const rightOptions = [1, 3, 5];
const topOptions = [2, 3, 4];
const bottomOptions = [2, 5, 6];

function getDirection(
  grid: number[][],
  y: number,
  x: number,
  expectRoadPlans: number[] = []
) {
  // 超出了边界，走过了重复值，不是预期的方向
  if (
    y < 0 ||
    x < 0 ||
    y >= grid.length ||
    x >= grid[y].length ||
    grid[y][x] <= 0 ||
    (expectRoadPlans.length && !expectRoadPlans.includes(grid[y][x]))
  ) {
    return false;
  }
  if (y === grid.length - 1 && x === grid[y].length - 1) {
    return true;
  }
  const cell = grid[y][x];
  grid[y][x] = 0;
  let res;
  if (cell === 1) {
    // 向左走，只有可能是1,4,6
    const left = getDirection(grid, y, x - 1, leftOptions);
    // 向右走，只有可能是1,3,5
    const right = getDirection(grid, y, x + 1, rightOptions);
    res = left || right;
  } else if (cell === 2) {
    // 向上走，只有可能是2, 3和4
    const top = getDirection(grid, y - 1, x, topOptions);
    // 向下走 2, 5, 6
    const bottom = getDirection(grid, y + 1, x, bottomOptions);
    res = top || bottom;
  } else if (cell === 3) {
    const left = getDirection(grid, y, x - 1, leftOptions);
    const bottom = getDirection(grid, y + 1, x, bottomOptions);
    res = left || bottom;
  } else if (cell === 4) {
    const right = getDirection(grid, y, x + 1, rightOptions);
    const bottom = getDirection(grid, y + 1, x, bottomOptions);
    res = right || bottom;
  } else if (cell === 5) {
    // 像上走，只有可能是2，3和4
    const top = getDirection(grid, y - 1, x, topOptions);
    const left = getDirection(grid, y, x - 1, leftOptions);
    res = top || left;
  } else if (cell === 6) {
    // 像上走，只有可能是3和4
    const top = getDirection(grid, y - 1, x, topOptions);
    const right = getDirection(grid, y, x + 1, rightOptions);
    res = top || right;
  }
  grid[y][x] = cell;
  return res;
}

export function hasValidPath(grid: number[][]): boolean {
  return getDirection(grid, 0, 0);
}
