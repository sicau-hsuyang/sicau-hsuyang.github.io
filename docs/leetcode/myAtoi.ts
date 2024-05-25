export function myAtoi(s: string): number {
  // 整数部分的数字
  const digits1: number[] = [];
  // 小数部分的数字
  const digits2: number[] = [];
  // 是否已经遇到了负号
  let hasMeetSymbol = false;
  // 是否是负数
  let isNegativeSymbol = false;
  // 是否遇到了小数点
  let hasMeetPointSymbol = false;
  // 是否已经遇到过数字了
  let hasMeetDigit = false;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    // 数字
    if (/\d/.test(char)) {
      // 设置遇到过数字的标记
      hasMeetDigit = true;
      // 如果还没有遇到小数点，加到整数部分
      if (!hasMeetPointSymbol) {
        digits1.push(+char);
      }
      // 否则加到小数部分
      else {
        digits2.push(+char);
      }
    }
    // 小数点
    else if (char === ".") {
      // 第一次遇到，视为小数点
      if (hasMeetPointSymbol) {
        break;
      }
      // 第二次遇到的时候就是终止的标志了
      hasMeetPointSymbol = true;
    }
    // 遇到字母
    else if (/[a-zA-Z]/.test(char)) {
      break;
    }
    // 正号
    else if (char === "+") {
      // 第二次遇到正号，就终止了，或者之前已经遇到过数字，也终止了
      if (hasMeetSymbol || hasMeetDigit) {
        break;
      }
      // 第一次，计为负号
      hasMeetSymbol = true;
    }
    // 负号
    else if (char === "-") {
      // 第二次遇到负号，就终止了，或者之前已经遇到过数字，也终止了
      if (hasMeetSymbol || hasMeetDigit) {
        break;
      }
      hasMeetSymbol = true;
      isNegativeSymbol = true;
    }
    // 如果是空格
    else if (char === " ") {
      // 如果已经遇到过数字了，再遇到空格，就视为非法了
      if (hasMeetDigit || hasMeetPointSymbol || hasMeetSymbol) {
        break;
      }
    }
  }
  // 如果之前还没有解析到数字，那么要至少处理一个兜底的0
  if (digits1.length === 0) {
    digits1.push(0);
  }
  // 处理前导0
  while (digits1.length) {
    // 取出最顶上的元素
    const dgt = digits1[0];
    // 如果是前导0，可以不断的丢弃，否则，保持到最后一个0即可
    if (dgt !== 0 || (dgt === 0 && digits1.length === 1)) {
      break;
    }
    // 丢弃前导0
    digits1.shift();
  }

  // 处理后置0
  while (digits2.length) {
    if (digits2[digits2.length - 1] !== 0) {
      break;
    }
    digits2.pop();
  }

  // 计算整数部分
  let sum = 0;
  let j = 0;
  while (digits1.length) {
    const dgt = digits1.pop()!;
    const val = dgt * Math.pow(10, j);
    j++;
    sum += val;
  }

  // 计算小数部分
  let k = 1;
  while (digits2.length) {
    const dgt = digits2.shift()!;
    const val = dgt / Math.pow(10, k);
    k++;
    sum += val;
  }
  // 如果是负数
  if (isNegativeSymbol) {
    sum *= -1;
  }
  const TEMP = 2 ** 31;
  const LOW = -1 * TEMP;
  const MAX = TEMP - 1;
  // 处理最大和最小的范围
  if (sum < LOW) {
    sum = LOW;
  } else if (sum > MAX) {
    sum = MAX;
  }
  return sum;
}
