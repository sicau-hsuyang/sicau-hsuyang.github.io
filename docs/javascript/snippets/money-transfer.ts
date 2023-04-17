/**
 * 数字转人民币大写
 * @param price 价格
 */
// export function moneyTransfer(price: number) {
//   const unit = ["萬", "仟", "佰", "拾"];
//   const upperCaseUnit = [
//     "零",
//     "壹",
//     "贰",
//     "叁",
//     "肆",
//     "伍",
//     "陆",
//     "柒",
//     "捌",
//     "玖",
//   ];
//   const decimalUnit = ["角", "分"];
//   let digits = String(price).split(".");
//   let chineseUpperCase = "";
//   chineseUpperCase += "圆";
//   let values = digits[0].split("").reverse();
//   let group1 = values.slice(0, 5);
//   let group2 = values.slice(4, 8);
//   let group3 = values.slice(8);
//   // 处理亿
//   let temp3 = "";
//   let offset3 = 0;
//   while (group3.length) {
//     const num = Number.parseInt(group3.pop()!);
//     const chineseNum = upperCaseUnit[num];
//     if (chineseNum != "零") {
//       temp3 += chineseNum + unit[offset3];
//     } else {
//       temp3 += "零";
//     }
//     offset3++;
//   }
//   if (offset3 != 0) {
//     temp3 += "亿";
//   }

//   // 去掉多余的零
//   chineseUpperCase.replace(/零+/g, "零");
//   const intFlag = isInteger(price);
//   if (intFlag) {
//     const tmp = digits[1].slice(0, 2).split("").map(Number.parseInt);
//     const jiao = tmp[0];
//     const fen = tmp[1];
//     if (jiao === 0) {
//       chineseUpperCase += upperCaseUnit[jiao];
//     } else {
//       chineseUpperCase += upperCaseUnit[jiao] + "角";
//     }
//     if (fen !== 0) {
//       chineseUpperCase += upperCaseUnit[fen] + "分";
//     }
//   } else {
//     chineseUpperCase += "整";
//   }
//   return;
// }

/**
 * 是否是整数
 * @param val 数字
 * @returns
 */
function isInteger(val: number) {
  return val === Math.floor(val);
}

// /**
//  * 分块函数
//  * @param arr 原数组
//  * @param chunkSize 分块的大小
//  */
// export function chunk<T>(arr: T[], chunkSize: number = 1): T[][] {
//   const chunked: T[][] = [];
//   for (let i = 0; i < arr.length; i += chunkSize) {
//     chunked.push(arr.slice(i, i + chunkSize));
//   }
//   return chunked;
// }

/**
 * 数字必须是一个整数，不考虑 万 亿 等单位变化的转换，num肯定是一个小于9999的数
 * @param num 待转换数字
 */
export function transform(num: number) {
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
  const powerUnit = ["仟", "佰", "拾", ""];
  const numList = String(num)
    .split("")
    .map((x) => Number.parseInt(x));

  let res = "";
  for (let i = 0; i < numList.length; i++) {
    const digit = upperCaseUnit[numList[i]];
    if (digit === "零") {
      res += "零";
    } else {
      res += digit + powerUnit[i];
    }
  }
  return res;
}

export function digitToChinese(num: number) {
  const str = String(num).split(".")[0].split("").reverse().join("");
  const group1 = str.slice(0, 4);
  const group2 = str.slice(4, 8);
  const group3 = str.slice(8);
  let res: string = "";
  let g1 = transform(+group1);
  if (group3) {
    let tmp = transform(+group3);
    tmp = tmp.replace(/零{2,}/g, "").replace(/^零|零$/g, "");
    if (tmp != "") {
      res += tmp + "亿";
    }
  }
  if (group2) {
    let tmp = transform(+group2);
    tmp = tmp.replace(/零{2,}/g, "").replace(/^零|零$/g, "");
    if (tmp != "") {
      res += tmp + "万";
    }
  }
  if (group3 && !group2) {
    res += "零";
  }
  g1 = g1.replace(/零{2,}/g, "").replace(/^零|零$/g, "");
  if (g1 !== "") {
    res += g1;
  }
  return res;
}

/**
 * 0-3 个十百千
 * 4-7 万 十万 百万 千万
 * 8-end
 */
