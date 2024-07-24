export function integerReplacement(
  n: number,
  map: Map<number, number> = new Map()
): number {
  if (n === 1) {
    return 0;
  }
  if (map.has(n)) {
    return map.get(n)!;
  }
  let res: number;
  if (n % 2 === 0) {
    res = 1 + integerReplacement(n / 2);
  } else {
    const left = integerReplacement(n - 1);
    const right = integerReplacement(n + 1);
    res = 1 + Math.min(left, right);
  }
  map.set(n, res);
  return res;
}
