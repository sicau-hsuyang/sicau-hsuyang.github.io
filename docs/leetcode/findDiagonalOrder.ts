export function findDiagonalOrder(mat: number[][]): number[] {
  let height = mat.length;
  let width = mat[0].length;
  let res: number[] = [];
  let count = 0;
  let totalCount = height * width;
  let col = 0;
  let row = 0;
  let direction = "RIGHT_TOP";
  while (count < totalCount) {
    const val = mat[row][col];
    res.push(val);
    count++;
    if (direction === "RIGHT_TOP") {
      // 到达最右边的一格了
      if (row === 0 && col == width - 1) {
        row++;
        // 改变方向
        direction = "LEFT_BOTTOM";
      } else if (row === 0) {
        col++;
        // 改变方向
        direction = "LEFT_BOTTOM";
      } else if (col === width - 1) {
        row++;
        // 改变方向
        direction = "LEFT_BOTTOM";
      } else {
        row--;
        col++;
      }
    } else {
      if (row === height - 1 && col == 0) {
        col++;
        // 改变方向
        direction = "RIGHT_TOP";
      } else if (row === height - 1) {
        col++;
        // 改变方向
        direction = "RIGHT_TOP";
      } else if (col === 0) {
        row++;
        direction = "RIGHT_TOP";
      } else {
        row++;
        col--;
      }
    }
  }
  return res;
}
