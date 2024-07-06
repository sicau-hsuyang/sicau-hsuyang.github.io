function countPont(
  startRow: number,
  startCol: number,
  land: number[][]
): number {
  if (
    startRow < 0 ||
    startCol < 0 ||
    startRow >= land.length ||
    startCol >= land[startRow].length ||
    land[startRow][startCol] > 0
  ) {
    return 0;
  }
  // 消灭水
  land[startRow][startCol] = 1;
  // record[startRow][startCol] = 1;
  let left = countPont(startRow, startCol - 1, land);
  let right = countPont(startRow, startCol + 1, land);
  let bottom = countPont(startRow + 1, startCol, land);
  let top = countPont(startRow - 1, startCol, land);
  let bottomLeft = countPont(startRow + 1, startCol - 1, land);
  let bottomRight = countPont(startRow + 1, startCol + 1, land);
  let topLeft = countPont(startRow - 1, startCol - 1, land);
  let topRight = countPont(startRow - 1, startCol + 1, land);
  return (
    1 +
    top +
    right +
    bottom +
    left +
    topLeft +
    bottomLeft +
    bottomRight +
    topRight
  );
}

export function pondSizes(land: number[][]): number[] {
  const results: number[] = [];
  // const record: number[][] = Array.from({
  //   length: land.length,
  // }).map(() => {
  //   return [] as number[];
  // }) as number[][];
  for (let row = 0; row < land.length; row++) {
    for (let col = 0; col < land[row].length; col++) {
      if (land[row][col] > 0) {
        continue;
      }
      const size = countPont(row, col, land);
      results.push(size);
    }
  }
  results.sort((a, b) => {
    return a - b;
  });
  return results;
}
