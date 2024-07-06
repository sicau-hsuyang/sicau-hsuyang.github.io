interface Cell {
  row: number;
  col: number;
  distance: number;
}

export function nearestExit(maze: string[][], entrance: number[]): number {
  let minStep = Number.MAX_VALUE;
  let width = maze[0].length;
  let height = maze.length;
  const queue: Cell[] = [
    {
      row: entrance[0],
      col: entrance[1],
      distance: 0,
    },
  ];
  while (queue.length) {
    const pos = queue.shift()!;
    const { row: cellRow, col: cellCol, distance } = pos;
    if (maze[cellRow][cellCol] === "+") {
      continue;
    }
    // 将当前的格子消灭掉
    maze[cellRow][cellCol] = "+";
    const isStartCell = cellRow == entrance[0] && cellCol == entrance[1];
    // 触达上边界或者下边界或者是左边界或者是右边界，不能是开始的那一个节点
    if (
      !isStartCell &&
      (cellRow === 0 ||
        cellRow === height - 1 ||
        cellCol === 0 ||
        cellCol === width - 1) &&
      distance < minStep
    ) {
      minStep = distance;
    }
    let leftCol = cellCol - 1;
    let rightCol = cellCol + 1;
    let topRow = cellRow - 1;
    let bottomRow = cellRow + 1;
    // left
    if (maze[cellRow][leftCol] === ".") {
      queue.push({
        row: cellRow,
        col: leftCol,
        distance: distance + 1,
      });
    }
    // right
    if (maze[cellRow][rightCol] === ".") {
      queue.push({
        row: cellRow,
        col: rightCol,
        distance: distance + 1,
      });
    }
    // bottom
    if (Array.isArray(maze[bottomRow]) && maze[bottomRow][cellCol] === ".") {
      queue.push({
        row: bottomRow,
        col: cellCol,
        distance: distance + 1,
      });
    }
    // top
    if (Array.isArray(maze[topRow]) && maze[topRow][cellCol] === ".") {
      queue.push({
        row: topRow,
        col: cellCol,
        distance: distance + 1,
      });
    }
  }
  return minStep === Number.MAX_VALUE ? -1 : minStep;
}
