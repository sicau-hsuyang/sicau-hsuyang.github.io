export function addToArrayForm(num: number[], k: number): number[] {
  let digit = k
    .toString()
    .split("")
    .reverse()
    .map((v) => Number.parseInt(v));
  let d = 0;
  let needIncrease = false;
  const len = num.length;
  while (d < digit.length && d < num.length) {
    let sum = num[len - 1 - d] + digit[d];
    if (needIncrease) {
      sum++;
      needIncrease = false;
    }
    if (sum >= 10) {
      needIncrease = true;
      sum = sum % 10;
    }
    num[len - 1 - d] = sum;
    d++;
  }
  while (d < digit.length) {
    let sum = digit[d];
    if (needIncrease) {
      sum++;
      needIncrease = false;
    }
    if (sum === 10) {
      needIncrease = true;
      sum = 0;
    }
    num.unshift(sum);
    d++;
  }
  while (d < num.length && needIncrease) {
    let sum = num[len - 1 - d] + 1;
    needIncrease = false;
    if (sum === 10) {
      needIncrease = true;
      sum = 0;
    }
    num[len - 1 - d] = sum;
    d++;
  }
  if (needIncrease) {
    num.unshift(1);
  }
  return num;
}
