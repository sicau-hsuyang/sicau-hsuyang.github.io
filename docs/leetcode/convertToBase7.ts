export function convertToBase7(num: number): string {
  let res = "";
  let temp = Math.abs(num);
  while (temp >= 7) {
    const digit = temp % 7;
    temp = (temp - digit) / 7;
    res = digit + res;
  }
  res = temp + res;
  return num < 0 ? "-" + res : res;
}
