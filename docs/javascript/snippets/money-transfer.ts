/**
 * 数字转中文大写
 * @param num 合法数字
 * @returns
 */
export function digitToChinese(num: number) {
  let chinese: string = "";
  // 定义中文的单位映射
  const upperCaseUnit = [
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖",
  ];
  // 较大的单位
  const bigUnit = ["萬", "亿"];
  // 进制单位
  const transUnits = ["", "拾", "佰", "仟"];
  const digitGroup = String(Math.abs(num)).split(".");
  // 将数字转为字符串数组，并将其反转，让低位数字排在数组的前面
  const numDigits: string[] = digitGroup[0].split("").reverse();
  let hasAddedZero = false;
  for (let i = 0; i < numDigits.length; i++) {
    const digit = numDigits[i];
    let chineseDigit = upperCaseUnit[digit];
    // 处理大的单位
    let unit: string = "";
    if (i % 4 === 0 && i > 0) {
      unit = bigUnit[i / 4 - 1];
    }
    // 遇到数字为0的时候，在没有添加过的情况下，添加0️，因为不可能出现连续的两个0
    if (chineseDigit === "零" && !hasAddedZero) {
      chinese = "零" + chinese;
      hasAddedZero = true;
    } else if (chineseDigit != "零") {
      // 遇到非零的数字之后，将添加0的标记清除
      hasAddedZero = false;
      unit += transUnits[i % 4];
      chinese = chineseDigit + unit + chinese;
      unit = "";
    }

    if (unit != "") {
      chinese = unit + chinese;
      unit = "";
    }
  }
  // 如果最后一位是0，并且用户输入的不是0的话，那最后一个零需要去掉
  if (chinese != "零") {
    chinese = chinese.replace(/零$/g, "");
  }
  // 对于整数亿，在上述的处理过程中会出现连续的`亿万`，将万字去掉
  chinese = chinese.replace(/亿萬/, "亿");
  // 追加单位
  chinese += "圆";
  // 处理小数，不考虑.00这种情况
  if (Math.floor(num) != num) {
    const fragUnits = ["角", "分"];
    // 取两位
    const fragNumbers = digitGroup[1].split("").slice(0, 2);
    for (let i = 0; i < fragNumbers.length; i++) {
      const chineseDigit = upperCaseUnit[fragNumbers[i]];
      const chineseUnit = fragUnits[i];
      // 小数，也需要考虑0的情况
      chinese += chineseDigit + (chineseDigit != "零" ? chineseUnit : "");
    }
  } else {
    chinese += "整";
  }
  if (num < 0) {
    chinese = "负" + chinese;
  }
  return chinese;
}

/**
 * 中文大写字符串转数字
 * @param chineseDigitCase 中文大写字符串
 */
export function chineseNumCaseToDigit(chineseDigitCase: string): number {
  let sum: number = 0;
  let negativeFlag = false;
  if (/^负/.test(chineseDigitCase)) {
    negativeFlag = true;
    chineseDigitCase = chineseDigitCase.slice(1);
  }
  const yiIdx = chineseDigitCase.indexOf("亿");
  if (yiIdx >= 0) {
    const bigNum = smallTransform(chineseDigitCase.slice(0, yiIdx));
    sum += bigNum * 100000000;
    chineseDigitCase = chineseDigitCase.slice(yiIdx + 1);
  }
  const wanIdx = chineseDigitCase.indexOf("萬");
  if (wanIdx >= 0) {
    const bigNum = smallTransform(chineseDigitCase.slice(0, wanIdx));
    sum += bigNum * 10000;
    chineseDigitCase = chineseDigitCase.slice(wanIdx + 1);
  }
  const bigNum = smallTransform(chineseDigitCase);
  sum += bigNum;
  if (negativeFlag) {
    sum *= -1;
  }
  return sum;
}

function smallTransform(chineseCase: string) {
  let sum = 0;
  const upperCaseUnit: Record<string, number> = {
    零: 0,
    壹: 1,
    贰: 2,
    叁: 3,
    肆: 4,
    伍: 5,
    陆: 6,
    柒: 7,
    捌: 8,
    玖: 9,
  };
  const thousand = chineseCase.match(/([壹贰叁肆伍陆柒捌玖])仟/);
  if (Array.isArray(thousand)) {
    sum += upperCaseUnit[thousand[1]] * 1000;
  }
  const hundred = chineseCase.match(/([壹贰叁肆伍陆柒捌玖])佰/);
  if (Array.isArray(hundred)) {
    sum += upperCaseUnit[hundred[1]] * 100;
  }
  const ten = chineseCase.match(/([壹贰叁肆伍陆柒捌玖])拾/);
  if (Array.isArray(ten)) {
    sum += upperCaseUnit[ten[1]] * 10;
  }
  const size = chineseCase.match(/([零壹贰叁肆伍陆柒捌玖])(?=$|圆)/);
  if (Array.isArray(size)) {
    sum += upperCaseUnit[size[1]];
  }
  const deciSomeone = chineseCase.match(/([壹贰叁肆伍陆柒捌玖])角/);
  if (Array.isArray(deciSomeone)) {
    sum += upperCaseUnit[deciSomeone[1]] * 0.1;
  }
  const centi = chineseCase.match(/([壹贰叁肆伍陆柒捌玖])分/);
  if (Array.isArray(centi)) {
    sum += upperCaseUnit[centi[1]] * 0.01;
  }
  return sum;
}
