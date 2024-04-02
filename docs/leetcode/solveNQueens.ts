export function calc(
  total: number,
  remainQueens: number,
  placedQueenPlans: string[][] = []
) {
  // 如果皇后已经摆放完成了的话，这个就是解决方案了
  if (remainQueens === 0) {
    return placedQueenPlans;
  }
  // 如果一个皇后都没有放置的话，随便放
  else if (placedQueenPlans.length === 0) {
    const plans: string[][] = [];
    for (let i = 0; i < total; i++) {
      const row: string[] = Array.from({ length: total }).fill(".") as string[];
      // 放置皇后的位置
      row[i] = "Q";
      // 放置一行的摆放方案
      plans.push([row.join("")]);
    }
    return calc(total, remainQueens - 1, plans);
  } else {
    const nextPlans: string[][] = [];
    for (let i = 0; i < placedQueenPlans.length; i++) {
      // 得到一个可能的摆放方案
      const tempMatrix = placedQueenPlans[i];
      const matrix = tempMatrix.map((v) => v);
      let row = matrix.length - 1;
      for (let col = 0; col < matrix[row].length; col++) {
        // 竖线标记
        let hozFlag = true;
        // 左斜线标记
        let leftFlag = true;
        // 右斜线标记
        let rightFlag = true;
        // 左斜线
        let r1 = row;
        let c1 = col - 1;
        while (r1 >= 0 && c1 >= 0) {
          let cell1 = matrix[r1][c1];
          if (cell1 === "Q") {
            leftFlag = false;
            break;
          } else {
            r1--;
            c1--;
          }
        }
        // 因为左斜线上不满足条件，所以提前结束
        if (!leftFlag) {
          continue;
        }
        // 右斜线
        let r2 = row;
        let c2 = col + 1;
        while (r2 >= 0 && c2 < total) {
          let cell1 = matrix[r2][c2];
          if (cell1 === "Q") {
            rightFlag = false;
            break;
          } else {
            r2--;
            c2++;
          }
        }
        // 因为右斜线上不满足条件，所以提前结束
        if (!rightFlag) {
          continue;
        }
        // 竖线
        let offset = row;
        while (offset >= 0) {
          let cell = matrix[offset][col];
          if (cell === "Q") {
            hozFlag = false;
            break;
          } else {
            offset--;
          }
        }
        // 竖线上不满足，提前结束
        if (!hozFlag) {
          continue;
        }
        // 添加一行，并且把皇后放进去
        const nextRow: string[] = Array.from({ length: total }).fill(
          "."
        ) as string[];
        nextRow[col] = "Q";
        const temp = matrix.map((v) => v);
        let currentRowResult = nextRow.join("");
        temp.push(currentRowResult);
        nextPlans.push(temp);
      }
    }
    return calc(total, remainQueens - 1, nextPlans);
  }
}

export function solveNQueens(n: number): string[][] {
  return calc(n, n, []);
}
