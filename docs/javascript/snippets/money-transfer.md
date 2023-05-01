## 金额转换

### 1、阿拉伯数字转中文大写

在一些金融系统里面，这是一个常见的需求。这是一个看起来简单，但是想要写的很好却很难的一个题。

简单就在于，只要是一个对编程不陌生的人，它看到这题里面就会想到哈希表，将中文的数字和阿拉伯数字关联起来。

难就难在，因为中文大写如果遇到`0`的话，会增加一个`零`，遇到`万`，`亿`这种单位，如果是整数，又不需要`零`。

以下是我给出的解决方案：（最大数据数量级支持到`9999万亿`）

```ts
/**
 * 数字转中文大写
 * @param num 合法数字
 * @returns
 */
function stringify(num: number) {
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
      unit = bigUnit[(i / 4 - 1) % 2];
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
    // 因为一直都是0，所以之前可能并没有处理大单位，此刻需要将大单位处理掉
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
```

### 2、中文大写金额转阿拉伯数字

根据合法的中文大写解析出原本的阿拉伯数字，具体思路就是，根据输入的内容进行判断，如果当前字符串包含`亿`，则先解析`亿`以前的数字，并将其存下来，如果在解析`亿`的过程中，发现前面还有`万`，则需要增加解析`万亿`，接着解析`万`，再解析`万`以后的数字即可，将分段解析的结果进行累加就是最终的结果。

```ts
/**
 * 中文大写字符串转数字
 * @param chineseDigitCase 中文大写字符串
 */
function parse(chineseDigitCase: string): number {
  let sum: number = 0;
  let negativeFlag = false;
  if (/^负/.test(chineseDigitCase)) {
    negativeFlag = true;
    // 转化之后将已处理的内容丢弃
    chineseDigitCase = chineseDigitCase.slice(1);
  }
  let yiIdx = chineseDigitCase.indexOf("亿");
  // 处理亿
  if (yiIdx >= 0) {
    // 处理万亿级别
    const wanIdx = chineseDigitCase.indexOf("萬");
    if (wanIdx >= 0 && yiIdx > wanIdx) {
      const bigNum = parseTool(chineseDigitCase.slice(0, wanIdx));
      sum += bigNum * 100000000 * 10000;
      // 转化之后将已处理的内容丢弃
      chineseDigitCase = chineseDigitCase.slice(wanIdx + 1);
      yiIdx = chineseDigitCase.indexOf("亿");
    }
    const bigNum = parseTool(chineseDigitCase.slice(0, yiIdx));
    sum += bigNum * 100000000;
    // 转化之后将已处理的内容丢弃
    chineseDigitCase = chineseDigitCase.slice(yiIdx + 1);
  }
  // 处理万
  const wanIdx = chineseDigitCase.indexOf("萬");
  if (wanIdx >= 0) {
    const bigNum = parseTool(chineseDigitCase.slice(0, wanIdx));
    sum += bigNum * 10000;
    // 转化之后将已处理的内容丢弃
    chineseDigitCase = chineseDigitCase.slice(wanIdx + 1);
  }
  // 处理千以下的单位
  const bigNum = parseTool(chineseDigitCase);
  sum += bigNum;
  if (negativeFlag) {
    sum *= -1;
  }
  return sum;
}

function parseTool(chineseCase: string) {
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
  // 因为最后一个可能是某圆，也可能是在解析某万某亿这种场景
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
```

### 3、封装与单元测试

将转换与解析的方法封装到`class`中，方便使用.

```ts
export class Transfer {
  /**
   * 数字转中文大写
   * @param num 合法数字
   * @returns
   */
  stringify(num: number) {
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
        unit = bigUnit[(i / 4 - 1) % 2];
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
  parse(chineseDigitCase: string): number {
    let sum: number = 0;
    let negativeFlag = false;
    if (/^负/.test(chineseDigitCase)) {
      negativeFlag = true;
      // 转化之后将已处理的内容丢弃
      chineseDigitCase = chineseDigitCase.slice(1);
    }
    let yiIdx = chineseDigitCase.indexOf("亿");
    // 处理亿
    if (yiIdx >= 0) {
      // 处理万亿级别
      const wanIdx = chineseDigitCase.indexOf("萬");
      if (wanIdx >= 0 && yiIdx > wanIdx) {
        const bigNum = this.parseTool(chineseDigitCase.slice(0, wanIdx));
        sum += bigNum * 100000000 * 10000;
        // 转化之后将已处理的内容丢弃
        chineseDigitCase = chineseDigitCase.slice(wanIdx + 1);
        yiIdx = chineseDigitCase.indexOf("亿");
      }
      const bigNum = this.parseTool(chineseDigitCase.slice(0, yiIdx));
      sum += bigNum * 100000000;
      // 转化之后将已处理的内容丢弃
      chineseDigitCase = chineseDigitCase.slice(yiIdx + 1);
    }
    // 处理万
    const wanIdx = chineseDigitCase.indexOf("萬");
    if (wanIdx >= 0) {
      const bigNum = this.parseTool(chineseDigitCase.slice(0, wanIdx));
      sum += bigNum * 10000;
      // 转化之后将已处理的内容丢弃
      chineseDigitCase = chineseDigitCase.slice(wanIdx + 1);
    }
    // 处理千以下的单位
    const bigNum = this.parseTool(chineseDigitCase);
    sum += bigNum;
    if (negativeFlag) {
      sum *= -1;
    }
    return sum;
  }

  private parseTool(chineseCase: string) {
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
}
```

以下是这个`class`的单元测试用例，`100%`通过率。

```ts
import { Transfer } from "./money-transfer";

describe("money transfer unit test", () => {
  let transfer: Transfer;

  beforeEach(() => {
    transfer = new Transfer();
  });

  it("0", () => {
    const zero = transfer.stringify(0);
    expect(zero).toBe("零圆整");
  });

  it("10", () => {
    const ten = transfer.stringify(10);
    expect(ten).toBe("壹拾圆整");
  });

  it("100", () => {
    const hundred = transfer.stringify(100);
    expect(hundred).toBe("壹佰圆整");
  });

  it("123.45", () => {
    const result = "壹佰贰拾叁圆肆角伍分";
    const res = transfer.stringify(123.45);
    expect(res).toBe(result);
  });

  it("1000", () => {
    const thousand = transfer.stringify(1000);
    expect(thousand).toBe("壹仟圆整");
  });

  it("10000", () => {
    const tenThousand = transfer.stringify(10000);
    expect(tenThousand).toBe("壹萬圆整");
  });

  it("100000", () => {
    const hundredThousand = transfer.stringify(100000);
    expect(hundredThousand).toBe("壹拾萬圆整");
  });

  it("1000000", () => {
    const million = transfer.stringify(1000000);
    expect(million).toBe("壹佰萬圆整");
  });

  it("10000000", () => {
    const tenMillion = transfer.stringify(10000000);
    expect(tenMillion).toBe("壹仟萬圆整");
  });

  it("100000000", () => {
    const tenMillion = transfer.stringify(100000000);
    expect(tenMillion).toBe("壹亿圆整");
  });

  it("-100000000", () => {
    const tenMillion = transfer.stringify(-100000000);
    expect(tenMillion).toBe("负壹亿圆整");
  });

  it("100000001", () => {
    const bigNum = transfer.stringify(100000001);
    expect(bigNum).toBe("壹亿零壹圆整");
  });

  it("1000000011", () => {
    const bigNum = transfer.stringify(1000000011);
    expect(bigNum).toBe("壹拾亿零壹拾壹圆整");
  });

  it("10000000112", () => {
    const bigNum = transfer.stringify(10000000112);
    expect(bigNum).toBe("壹佰亿零壹佰壹拾贰圆整");
  });

  it("1000002112", () => {
    const bigNum = transfer.stringify(1000002112);
    expect(bigNum).toBe("壹拾亿零贰仟壹佰壹拾贰圆整");
  });

  it("1000042112", () => {
    const bigNum = transfer.stringify(1000042112);
    expect(bigNum).toBe("壹拾亿零肆萬贰仟壹佰壹拾贰圆整");
  });

  it("1000342112", () => {
    const bigNum = transfer.stringify(1000342112);
    expect(bigNum).toBe("壹拾亿零叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("1008342112", () => {
    const bigNum = transfer.stringify(1008342112);
    expect(bigNum).toBe("壹拾亿零捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("1028342112", () => {
    const bigNum = transfer.stringify(1028342112);
    expect(bigNum).toBe("壹拾亿零贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("1128342112", () => {
    const bigNum = transfer.stringify(1128342112);
    expect(bigNum).toBe("壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("111128342112", () => {
    const bigNum = transfer.stringify(111128342112);
    expect(bigNum).toBe("壹仟壹佰壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("52111128342112", () => {
    const bigNum = transfer.stringify(52111128342112);
    expect(bigNum).toBe(
      "伍拾贰萬壹仟壹佰壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整"
    );
  });

  it("1234567.89", () => {
    const bigNum = transfer.stringify(1234567.89);
    expect(bigNum).toBe("壹佰贰拾叁萬肆仟伍佰陆拾柒圆捌角玖分");
  });

  it("999999999.99", () => {
    const bigNum = transfer.stringify(999999999.99);
    expect(bigNum).toBe("玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆玖角玖分");
  });

  it("999999999.09", () => {
    const bigNum = transfer.stringify(999999999.09);
    expect(bigNum).toBe("玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆零玖分");
  });

  it("1000003452", () => {
    const bigNum = transfer.stringify(1000003452);
    expect(bigNum).toBe("壹拾亿零叁仟肆佰伍拾贰圆整");
  });
});

describe("money case transfer to number unit test", () => {
  let transfer: Transfer;

  beforeEach(() => {
    transfer = new Transfer();
  });

  it("零圆整", () => {
    const zero = transfer.parse("零圆整");
    expect(zero).toBe(0);
  });

  it("壹拾圆整", () => {
    const ten = transfer.parse("壹拾圆整");
    expect(ten).toBe(10);
  });

  it("壹佰圆整", () => {
    const hundred = transfer.parse("壹佰圆整");
    expect(hundred).toBe(100);
  });

  it("壹佰贰拾叁圆肆角伍分", () => {
    const result = 123.45;
    const res = transfer.parse("壹佰贰拾叁圆肆角伍分");
    expect(res).toBe(result);
  });

  it("壹仟圆整", () => {
    const thousand = transfer.parse("壹仟圆整");
    expect(thousand).toBe(1000);
  });

  it("壹萬圆整", () => {
    const tenThousand = transfer.parse("壹萬圆整");
    expect(tenThousand).toBe(10000);
  });

  it("壹拾萬圆整", () => {
    const hundredThousand = transfer.parse("壹拾萬圆整");
    expect(hundredThousand).toBe(100000);
  });

  it("壹佰萬圆整", () => {
    const million = transfer.parse("壹佰萬圆整");
    expect(million).toBe(1000000);
  });

  it("壹仟萬圆整", () => {
    const tenMillion = transfer.parse("壹仟萬圆整");
    expect(tenMillion).toBe(10000000);
  });

  it("壹亿圆整", () => {
    const tenMillion = transfer.parse("壹亿圆整");
    expect(tenMillion).toBe(100000000);
  });

  it("负壹亿圆整", () => {
    const tenMillion = transfer.parse("负壹亿圆整");
    expect(tenMillion).toBe(-100000000);
  });

  it("壹亿零壹圆整", () => {
    const bigNum = transfer.parse("壹亿零壹圆整");
    expect(bigNum).toBe(100000001);
  });

  it("壹拾亿零壹拾壹圆整", () => {
    const bigNum = transfer.parse("壹拾亿零壹拾壹圆整");
    expect(bigNum).toBe(1000000011);
  });

  it("壹佰亿零壹佰壹拾贰圆整", () => {
    const bigNum = transfer.parse("壹佰亿零壹佰壹拾贰圆整");
    expect(bigNum).toBe(10000000112);
  });

  it("壹拾亿零贰仟壹佰壹拾贰圆整", () => {
    const bigNum = transfer.parse("壹拾亿零贰仟壹佰壹拾贰圆整");
    expect(bigNum).toBe(1000002112);
  });

  it("壹拾亿零肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = transfer.parse("壹拾亿零肆萬贰仟壹佰壹拾贰圆整");
    expect(bigNum).toBe(1000042112);
  });

  it("壹拾亿零叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = transfer.parse("壹拾亿零叁拾肆萬贰仟壹佰壹拾贰圆整");
    expect(bigNum).toBe(1000342112);
  });

  it("壹拾亿零捌佰叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = transfer.parse("壹拾亿零捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
    expect(bigNum).toBe(1008342112);
  });

  it("壹拾亿零贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = transfer.parse("壹拾亿零贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
    expect(bigNum).toBe(1028342112);
  });

  it("壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = transfer.parse("壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
    expect(bigNum).toBe(1128342112);
  });

  it("壹仟壹佰壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = transfer.parse(
      "壹仟壹佰壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整"
    );
    expect(bigNum).toBe(111128342112);
  });

  it("伍拾贰萬壹仟壹佰壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = transfer.parse(
      "伍拾贰萬壹仟壹佰壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整"
    );
    expect(bigNum).toBe(52111128342112);
  });

  it("壹佰贰拾叁萬肆仟伍佰陆拾柒圆捌角玖分", () => {
    const bigNum = transfer.parse("壹佰贰拾叁萬肆仟伍佰陆拾柒圆捌角玖分");
    expect(bigNum).toBe(1234567.89);
  });

  it("玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆玖角玖分", () => {
    const bigNum = transfer.parse(
      "玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆玖角玖分"
    );
    expect(bigNum).toBe(999999999.99);
  });

  it("玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆零玖分", () => {
    const bigNum = transfer.parse("玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆零玖分");
    expect(bigNum).toBe(999999999.09);
  });

  it("壹拾亿零叁仟肆佰伍拾贰圆整", () => {
    const bigNum = transfer.parse("壹拾亿零叁仟肆佰伍拾贰圆整");
    expect(bigNum).toBe(1000003452);
  });
});
```
