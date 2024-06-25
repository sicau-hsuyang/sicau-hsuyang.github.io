function find(
  board: string[][],
  word: string,
  row: number,
  col: number,
  offset: number
): boolean {
  if (word.length === offset) {
    return true;
  }
  // 小于上边界
  // 大于下边界
  // 小于上边界
  // 大于下边界
  // 不等于
  if (
    row < 0 ||
    row === board.length ||
    col < 0 ||
    col === board[row].length ||
    word[offset] !== board[row][col]
  ) {
    return false;
  }
  // 先临时的把它拿掉，让它不能被重复处理，因为现在修改以后，一定实在子栈帧上才会显现效果的
  const tmp = board[row][col];
  // 在递归之前破坏前面的内容，这样就一定不会往回走到回头路了
  board[row][col] = "\\";
  const answer =
    find(board, word, row - 1, col, offset + 1) ||
    find(board, word, row + 1, col, offset + 1) ||
    find(board, word, row, col - 1, offset + 1) ||
    find(board, word, row, col + 1, offset + 1);
  // 递归完成以后，恢复现场
  board[row][col] = tmp;
  // 这是一个不需要额外空间就能够实现不走回头路的递归
  return answer;
}

export function exist(board: string[][], word: string): boolean {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (find(board, word, i, j, 0)) {
        return true;
      }
    }
  }
  return false;
}
