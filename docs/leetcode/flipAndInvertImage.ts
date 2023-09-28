export function flipAndInvertImage(image: number[][]): number[][] {
  image.forEach((row) => {
    let start = 0;
    let end = row.length - 1;
    while (start <= end) {
      if (start != end) {
        let l = row[start];
        let r = row[end];
        if (l === r && l === 1) {
          row[start] = 0;
          row[end] = 0;
        } else if (l === r && l === 0) {
          row[start] = 1;
          row[end] = 1;
        } else if (l == 1 && r === 0) {
          row[start] = 1;
          row[end] = 0;
        } else if (l == 0 && r === 1) {
          row[start] = 0;
          row[end] = 1;
        }
      } else {
        row[start] = row[start] === 1 ? 0 : 1;
      }
      start++;
      end--;
    }
  });
  return image;
}
