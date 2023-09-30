interface Orange {
  row: number;
  col: number;
}

export function orangesRotting(grid: number[][]): number {
  const queue: Orange[][] = [];
  const rotOrangePass: Orange[] = [];
  // 初始化标记数组
  const maker: boolean[][] = Array.from({
    length: grid.length,
  }).map(() => {
    return [];
  });
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
        maker[i][j] = true;
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
      grid[rot.row][rot.col] = 2;
      // 上边的橘子存在，并且没有被处理过，并且还是新鲜的橘子
      if (
        Array.isArray(grid[rot.row - 1]) &&
        !maker[rot.row - 1][rot.col] &&
        grid[rot.row - 1][rot.col] === 1
      ) {
        maker[rot.row - 1][rot.col] = true;
        nextRotPass.push({
          row: rot.row - 1,
          col: rot.col,
        });
        healthOrange--;
      }
      // 下边的橘子存在，并且没有被处理过，并且还是新鲜的橘子
      if (
        Array.isArray(grid[rot.row + 1]) &&
        !maker[rot.row + 1][rot.col] &&
        grid[rot.row + 1][rot.col] === 1
      ) {
        maker[rot.row + 1][rot.col] = true;
        nextRotPass.push({
          row: rot.row + 1,
          col: rot.col,
        });
        healthOrange--;
      }
      // 左边的橘子必须是健康的橘子
      if (!maker[rot.row][rot.col - 1] && grid[rot.row][rot.col - 1] === 1) {
        maker[rot.row][rot.col - 1] = true;
        nextRotPass.push({
          row: rot.row,
          col: rot.col - 1,
        });
        healthOrange--;
      }
      // 右边的橘子必须是健康的橘子
      if (!maker[rot.row][rot.col + 1] && grid[rot.row][rot.col + 1] === 1) {
        maker[rot.row][rot.col + 1] = true;
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
