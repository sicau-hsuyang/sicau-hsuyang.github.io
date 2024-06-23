function transformRow(row: string[]) {
  let emptyPos = -1;
  let pos = row.length - 1;
  for (let i = pos; i >= 0; i--) {
    const cell = row[i];
    // 空位置，并且是没有记住的空位置才开始记住
    if (cell === "." && emptyPos === -1) {
      emptyPos = i;
    }
    // 障碍物
    else if (cell === "*") {
      emptyPos = -1;
    }
    // 遇到了石头，但是有空位置可以处理
    else if (cell === "#" && emptyPos !== -1) {
      row[emptyPos] = "#";
      row[i] = ".";
      emptyPos = emptyPos - 1;
    }
  }
}

export function rotateTheBox(box: string[][]): string[][] {
  const transformedBox: string[][] = Array.from({
    length: box[0].length,
  }).map((v) => {
    return [];
  });
  let pos = box.length - 1;
  for (let i = 0; i < box.length; i++) {
    const row = box[i];
    transformRow(row);
    row.forEach((str, idx) => {
      transformedBox[idx][pos - i] = str;
    });
  }
  return transformedBox;
}
