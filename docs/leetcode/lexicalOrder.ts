export function lexicalOrder(n: number, offset = 0, size = 0): number[] {
  const results: number[] = [];
  for (let i = 0; i <= 9; i++) {
    const val = i + offset;
    if (val === 0) {
      continue;
    }
    if (val > n) {
      break;
    }
    results.push(val);
    if (val * 10 <= n) {
      results.push(...lexicalOrder(n, val * 10, size + 1));
    }
  }
  return results;
}
/**

1 

10 跟n 比 n小 终止递归 10大继续递归

100跟n 比 n小 终止递归 100大继续递归

......

*/
