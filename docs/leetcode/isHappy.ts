export function isHappy(n: number): boolean {
  let sum = 0;
  let str = String(n);
  let left = 0;
  let right = str.length - 1;
  const counterMap = new Map();
  while (true) {
    while (left <= right) {
      const leftVal = Number.parseInt(str[left]) ** 2;
      const rightVal = Number.parseInt(str[right]) ** 2;
      if (left != right) {
        sum += leftVal + rightVal;
      } else {
        sum += leftVal;
      }
      left++;
      right--;
    }
    if (sum === 1) {
      return true;
    }
    const counter = counterMap.get(sum) || 0;
    if (sum === n || counter >= 2) {
      return false;
    }
    counterMap.set(sum, counter + 1);
    str = String(sum);
    left = 0;
    right = str.length - 1;
    sum = 0;
  }
}
