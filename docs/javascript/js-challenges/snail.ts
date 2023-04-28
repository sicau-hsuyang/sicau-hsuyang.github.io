export function snail(
  arr: number[],
  rowsCount: number,
  colsCount: number
): number[][] {
  if (arr.length < rowsCount * colsCount) {
    return [];
  }
  const results: number[][] = [];
  const chunkArr = chunk(arr, rowsCount);
  let direction = "bottom";
  for (let t = 0; t < rowsCount; t++) {
    results.push([]);
  }
  for (let i = 0; i < colsCount; i++) {
    for (let k = 0; k < rowsCount; k++) {
      if (direction === "bottom") {
        results[k][i] = chunkArr[i][k];
      } else {
        results[rowsCount - k - 1][i] = chunkArr[i][k];
      }
    }
    direction = direction === "bottom" ? "top" : "bottom";
  }
  return results;
}

function chunk(arr: any[], size: number): number[][] {
  const results: number[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    const group = arr.slice(i, i + size);
    results.push(group);
  }
  return results;
}

/**
 * const arr = [1,2,3,4];
 * arr.snail(1,4); // [[1,2,3,4]]
 */
