function calcNum(digits: number[]) {
  let unit = 0;
  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    sum += digits[i] * 10 ** unit;
    unit++;
  }
  return sum;
}

export function divisorSubstrings(num: number, k: number): number {
  const str = String(num);
  const digits: number[] = [];
  let count = 0;
  for (let i = 0; i < k; i++) {
    const digit = str[i];
    digits.push(Number.parseInt(digit));
  }
  const temp = calcNum(digits);
  const val = Math.floor(num / temp);
  if (val * temp === num) {
    count++;
  }
  for (let i = k; i < str.length; i++) {
    const digit = str[i];
    digits.push(Number.parseInt(digit));
    digits.shift();
    const temp = calcNum(digits);
    const val = Math.floor(num / temp);
    if (val * temp === num) {
      count++;
    }
  }
  return count;
}
