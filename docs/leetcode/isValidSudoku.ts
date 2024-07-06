function validChunk(board: string[][]): boolean {
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const set: Set<string> = new Set();
      let digitCount = 0;
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          const cell = board[i + y][j + x];
          if (cell !== ".") {
            set.add(cell);
            digitCount++;
          }
        }
      }
      if (digitCount > set.size) {
        return false;
      }
    }
  }
  return true;
}

export function isValidSudoku(board: string[][]): boolean {
  if (!validChunk(board)) {
    return false;
  }
  for (let row = 0; row < board.length; row++) {
    const set: Set<string> = new Set();
    let count = 0;

    for (let col = 0; col < 9; col++) {
      let cell = board[row][col];
      if (cell !== ".") {
        set.add(cell);
        count++;
      }
    }
    if (count > set.size) {
      return false;
    }
  }
  for (let col = 0; col < board.length; col++) {
    const set: Set<string> = new Set();
    let count = 0;
    for (let row = 0; row < 9; row++) {
      let cell = board[row][col];
      if (cell !== ".") {
        set.add(cell);
        count++;
      }
    }
    if (count > set.size) {
      return false;
    }
  }
  return true;
}
