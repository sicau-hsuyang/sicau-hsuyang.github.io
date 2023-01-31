/**
 * 将字符串解析成数字
 * @param {string} str 待解析字符串
 */
function MyParseFloat(str) {
  str = str.replace(/^\s*/, "");
  let pos = 0;
  // 是否有符号
  let signal = {
    val: "",
    proceed: false,
  };
  // 是否有小数点
  let point = {
    pos: -1,
    proceed: false,
  };
  // 小数点前面的数字
  let beforePointDigits = [];
  let afterPointDigits = [];
  while (pos < str.length) {
    const char = str[pos];
    if (["+", "-"].includes(char)) {
      // 处理过了的话，直接可以结束循环
      if (signal.proceed) {
        break;
      }
      // 符号，没有处理过
      signal.proceed = true;
      signal.val = char;
    } else if (char === ".") {
      // 处理过小数点了的话，直接可以结束循环
      if (point.proceed) {
        break;
      }
      point.proceed = true;
      point.pos = pos;
    } else if (/\d/.test(char)) {
      // 数字，如果在小数点之前出现的数字，放在前面
      if (point.proceed) {
        afterPointDigits.push(char);
      } else {
        beforePointDigits.push(char);
      }
    } else {
      // 非数字且非空格直接可以结束
      break;
    }
    pos++;
  }
  // 消除前导0
  while (beforePointDigits.length > 1 && beforePointDigits[0] == "0") {
    beforePointDigits.shift();
  }
  // 如果是小数点直接打头，补足一个前导0
  if (point.proceed && beforePointDigits.length === 0) {
    beforePointDigits.push("0");
  }
  // 消除结尾的0
  while (
    afterPointDigits.length &&
    afterPointDigits[afterPointDigits.length - 1] == "0"
  ) {
    afterPointDigits.pop();
  }
  // 如果一个数字都没有解析出来的话，说明解析出错了
  if (beforePointDigits.length === 0 && afterPointDigits.length === 0) {
    return NaN;
  }
  // 处理符号
  const symbol = signal.val === "-" ? "-" : "";
  // 处理-0
  if (
    symbol === "-" &&
    beforePointDigits.length === 1 &&
    beforePointDigits[0] === "0" &&
    afterPointDigits.length === 0
  ) {
    return "0";
  }
  return (
    symbol +
    beforePointDigits.join('') +
    (point.proceed && afterPointDigits.length > 0 ? "." : "") +
    afterPointDigits.join('')
  );
}

// const val = myParseFloat("   0.0");

// console.log(val);

// const val = myParseFloat("sdfds-2");

// const val = myParseFloat("-.2");

// const val = myParseFloat("-0.000")

// const val = myParseFloat("-0.000");

const val = myParseFloat("-002.00d02");

console.log(val);
