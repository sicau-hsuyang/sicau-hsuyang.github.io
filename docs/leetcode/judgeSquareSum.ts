export function judgeSquareSum(c: number): boolean {
  const sqrtVal = Math.ceil(Math.sqrt(c));
  let right = sqrtVal;
  let left = 1;
  let mid = Math.floor((right + left) / 2);
  while (left <= right) {
    let temp = mid ** 2;
    const diff = c - temp;
    let otherSquare = diff ** 2;
    if (temp >= c) {
      right = mid - 1;
    } else if (otherSquare + temp === c) {
      return true;
    } else {
      left = mid + 1;
    }
  }
  return false;
}
