/**
 * 数字转中文大写
 * @param num 合法数字
 * @returns
 */
export function digitToChinese(num: number) {
  let chinese: string = "";
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
  const bigUnit = ["萬", "亿"];
  const transUnits = ["", "拾", "佰", "仟"];
  const numDigits: string[] = String(num).split(".")[0].split("").reverse();
  let hasAddedZero = false;
  for (let i = 0; i < numDigits.length; i++) {
    const digit = numDigits[i];
    let chineseDigit = upperCaseUnit[digit];
    let unit: string = "";
    if (i % 4 === 0 && i > 0) {
      unit = bigUnit[i / 4 - 1];
    }
    if (chineseDigit === "零" && !hasAddedZero) {
      chinese = "零" + chinese;
      hasAddedZero = true;
    } else if (chineseDigit != "零") {
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
  if (chinese != "零") {
    chinese = chinese.replace(/零$/g, "");
  }
  chinese = chinese.replace(/亿萬/, "亿");
  chinese += "圆";
  // 处理小数
  if (Math.floor(num) != num) {
    const fragUnits = ["角", "分"];
    // 取两位
    const fragNumbers = String(num).split(".")[1].split("").slice(0, 2);
    for (let i = 0; i < fragNumbers.length; i++) {
      const chineseDigit = upperCaseUnit[fragNumbers[i]];
      const chineseUnit = fragUnits[i];
      chinese += chineseDigit + (chineseDigit != "零" ? chineseUnit : "");
    }
  } else {
    chinese += "整";
  }
  return chinese;
}
