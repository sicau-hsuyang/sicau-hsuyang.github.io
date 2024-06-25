export function countSubIslands(grid1: number[][], grid2: number[][]): number {
  let flag = true;

  function find(
    grid1: number[][],
    grid2: number[][],
    row: number,
    col: number
  ) {
    // 超出边界
    // 不是土地
    if (
      row < 0 ||
      row === grid2.length ||
      col < 0 ||
      col === grid2[row].length ||
      grid2[row][col] === 0
    ) {
      return;
    }
    if (grid1[row][col] !== 1 && grid2[row][col] === 1) {
      flag = false;
    }
    grid2[row][col] = 0;
    grid1[row][col] = 0;
    find(grid1, grid2, row - 1, col);
    find(grid1, grid2, row + 1, col);
    find(grid1, grid2, row, col - 1);
    find(grid1, grid2, row, col + 1);
  }

  let total = 0;
  for (let i = 0; i < grid2.length; i++) {
    for (let j = 0; j < grid2[i].length; j++) {
      // 开始合并土地
      if (grid2[i][j] === 1) {
        find(grid1, grid2, i, j);
        // 合并完成之后，仍然是true，说明是完全相等的土地
        if (flag) {
          total++;
        }
        // 重置标记
        flag = true;
      }
    }
  }
  return total;
}
