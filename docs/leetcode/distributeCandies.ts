export function distributeCandies(n: number, limit: number): number {
  let total = 0;
  for (let i = 0; i <= limit; i++) {
    for (let j = 0; j <= limit; j++) {
      for (let k = 0; k <= limit; k++) {
        if (i + j + k === n) {
          console.log(i, j, k);
          total += 1;
        }
      }
    }
  }
  return total;
}
