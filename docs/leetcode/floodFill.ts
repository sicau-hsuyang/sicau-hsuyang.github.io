export function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  newColor: number
): number[][] {
  const originalColor = image[sr][sc];
  if (originalColor === newColor) {
    return image;
  }
  fill(image, sr, sc, [], originalColor, newColor);
  return image;
}

function fill(
  image: number[][],
  x: number,
  y: number,
  marker: number[][],
  originalColor: number,
  newColor: number
) {
  // 越界
  if (!Array.isArray(image[x]) || typeof image[x][y] === "undefined") {
    return;
  }
  if (!Array.isArray[x]) {
    marker[x] = [];
  }
  // 已访问过
  if (marker[x][y]) {
    return;
  }
  marker[x][y] = 1;
  image[x][y] = newColor;
  // right
  getCell(image, x + 1, y) === originalColor &&
    fill(image, x + 1, y, marker, originalColor, newColor);
  // left
  getCell(image, x - 1, y) === originalColor &&
    fill(image, x - 1, y, marker, originalColor, newColor);
  // top
  getCell(image, x, y - 1) === originalColor &&
    fill(image, x, y - 1, marker, originalColor, newColor);
  // bottom
  getCell(image, x, y + 1) === originalColor &&
    fill(image, x, y + 1, marker, originalColor, newColor);
}

function getCell(image: number[][], x: number, y: number) {
  return Array.isArray(image[x]) ? image[x][y] : null;
}
