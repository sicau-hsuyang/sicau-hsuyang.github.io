interface Orange {
  row: number;
  col: number;
}

export function orangesRotting(grid: number[][]): number {
  const queue: Orange[][] = [];
  const rotOrangePass: Orange[] = [];
  // 记录一下健康的橘子
  let healthOrange = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const orange = grid[i][j];
      if (orange === 2) {
        rotOrangePass.push({
          row: i,
          col: j,
        });
        // 标记为已处理
        grid[i][j] = 0;
      } else if (orange === 1) {
        healthOrange++;
      }
    }
  }
  // 没有一个健康的橘子
  if (healthOrange === 0) {
    return 0;
  }
  // 没有腐烂的橘子
  if (rotOrangePass.length === 0) {
    return -1;
  }
  queue.push(rotOrangePass);
  let count = 0;
  while (queue.length) {
    const rotPass = queue.shift()!;
    const nextRotPass: Orange[] = [];
    rotPass.forEach((rot) => {
      // 已经腐烂过的橘子，就没有必要再处理了
      if (grid[rot.row][rot.col] === 2) {
        return;
      }
      grid[rot.row][rot.col] = 2;
      // 上边的橘子存在，并且没有被处理过，并且还是新鲜的橘子
      if (
        Array.isArray(grid[rot.row - 1]) &&
        grid[rot.row - 1][rot.col] === 1
      ) {
        grid[rot.row - 1][rot.col] = 0;
        nextRotPass.push({
          row: rot.row - 1,
          col: rot.col,
        });
        healthOrange--;
      }
      // 下边的橘子存在，并且没有被处理过，并且还是新鲜的橘子
      if (
        Array.isArray(grid[rot.row + 1]) &&
        grid[rot.row + 1][rot.col] === 1
      ) {
        grid[rot.row + 1][rot.col] = 0;
        nextRotPass.push({
          row: rot.row + 1,
          col: rot.col,
        });
        healthOrange--;
      }
      // 左边的橘子必须是健康的橘子
      if (grid[rot.row][rot.col - 1] === 1) {
        grid[rot.row][rot.col - 1] = 0;
        nextRotPass.push({
          row: rot.row,
          col: rot.col - 1,
        });
        healthOrange--;
      }
      // 右边的橘子必须是健康的橘子
      if (grid[rot.row][rot.col + 1] === 1) {
        grid[rot.row][rot.col + 1] = 0;
        nextRotPass.push({
          row: rot.row,
          col: rot.col + 1,
        });
        healthOrange--;
      }
    });
    if (nextRotPass.length) {
      queue.push(nextRotPass);
      // 腐坏时间增加
      count++;
    }
  }
  // 经历了N分钟之后，还有不会腐烂的橘子
  if (healthOrange) {
    return -1;
  }
  return count;
}
