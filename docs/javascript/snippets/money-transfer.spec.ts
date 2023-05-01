import { digitToChinese, chineseNumCaseToDigit } from "./money-transfer";

describe("money transfer unit test", () => {
  it("0", () => {
    const zero = digitToChinese(0);
    expect(zero).toBe("零圆整");
  });

  it("10", () => {
    const ten = digitToChinese(10);
    expect(ten).toBe("壹拾圆整");
  });

  it("100", () => {
    const hundred = digitToChinese(100);
    expect(hundred).toBe("壹佰圆整");
  });

  it("123.45", () => {
    const result = "壹佰贰拾叁圆肆角伍分";
    const res = digitToChinese(123.45);
    expect(res).toBe(result);
  });

  it("1000", () => {
    const thousand = digitToChinese(1000);
    expect(thousand).toBe("壹仟圆整");
  });

  it("10000", () => {
    const tenThousand = digitToChinese(10000);
    expect(tenThousand).toBe("壹萬圆整");
  });

  it("100000", () => {
    const hundredThousand = digitToChinese(100000);
    expect(hundredThousand).toBe("壹拾萬圆整");
  });

  it("1000000", () => {
    const million = digitToChinese(1000000);
    expect(million).toBe("壹佰萬圆整");
  });

  it("10000000", () => {
    const tenMillion = digitToChinese(10000000);
    expect(tenMillion).toBe("壹仟萬圆整");
  });

  it("100000000", () => {
    const tenMillion = digitToChinese(100000000);
    expect(tenMillion).toBe("壹亿圆整");
  });

  it("-100000000", () => {
    const tenMillion = digitToChinese(-100000000);
    expect(tenMillion).toBe("负壹亿圆整");
  });

  it("100000001", () => {
    const bigNum = digitToChinese(100000001);
    expect(bigNum).toBe("壹亿零壹圆整");
  });

  it("1000000011", () => {
    const bigNum = digitToChinese(1000000011);
    expect(bigNum).toBe("壹拾亿零壹拾壹圆整");
  });

  it("10000000112", () => {
    const bigNum = digitToChinese(10000000112);
    expect(bigNum).toBe("壹佰亿零壹佰壹拾贰圆整");
  });

  it("1000002112", () => {
    const bigNum = digitToChinese(1000002112);
    expect(bigNum).toBe("壹拾亿零贰仟壹佰壹拾贰圆整");
  });

  it("1000042112", () => {
    const bigNum = digitToChinese(1000042112);
    expect(bigNum).toBe("壹拾亿零肆萬贰仟壹佰壹拾贰圆整");
  });

  it("1000342112", () => {
    const bigNum = digitToChinese(1000342112);
    expect(bigNum).toBe("壹拾亿零叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("1008342112", () => {
    const bigNum = digitToChinese(1008342112);
    expect(bigNum).toBe("壹拾亿零捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("1028342112", () => {
    const bigNum = digitToChinese(1028342112);
    expect(bigNum).toBe("壹拾亿零贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("1128342112", () => {
    const bigNum = digitToChinese(1128342112);
    expect(bigNum).toBe("壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("111128342112", () => {
    const bigNum = digitToChinese(111128342112);
    expect(bigNum).toBe("壹仟壹佰壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整");
  });

  it("1234567.89", () => {
    const bigNum = digitToChinese(1234567.89);
    expect(bigNum).toBe("壹佰贰拾叁萬肆仟伍佰陆拾柒圆捌角玖分");
  });

  it("999999999.99", () => {
    const bigNum = digitToChinese(999999999.99);
    expect(bigNum).toBe("玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆玖角玖分");
  });

  it("999999999.09", () => {
    const bigNum = digitToChinese(999999999.09);
    expect(bigNum).toBe("玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆零玖分");
  });

  it("1000003452", () => {
    const bigNum = digitToChinese(1000003452);
    expect(bigNum).toBe("壹拾亿零叁仟肆佰伍拾贰圆整");
  });
});

describe("money case transfer to number unit test", () => {
  it("零圆整", () => {
    const zero = chineseNumCaseToDigit("零圆整");
    expect(zero).toBe(0);
  });

  it("壹拾圆整", () => {
    const ten = chineseNumCaseToDigit("壹拾圆整");
    expect(ten).toBe(10);
  });

  it("壹佰圆整", () => {
    const hundred = chineseNumCaseToDigit("壹佰圆整");
    expect(hundred).toBe(100);
  });

  it("壹佰贰拾叁圆肆角伍分", () => {
    const result = 123.45;
    const res = chineseNumCaseToDigit("壹佰贰拾叁圆肆角伍分");
    expect(res).toBe(result);
  });

  it("壹仟圆整", () => {
    const thousand = chineseNumCaseToDigit("壹仟圆整");
    expect(thousand).toBe(1000);
  });

  it("壹萬圆整", () => {
    const tenThousand = chineseNumCaseToDigit("壹萬圆整");
    expect(tenThousand).toBe(10000);
  });

  it("壹拾萬圆整", () => {
    const hundredThousand = chineseNumCaseToDigit("壹拾萬圆整");
    expect(hundredThousand).toBe(100000);
  });

  it("壹佰萬圆整", () => {
    const million = chineseNumCaseToDigit("壹佰萬圆整");
    expect(million).toBe(1000000);
  });

  it("壹仟萬圆整", () => {
    const tenMillion = chineseNumCaseToDigit("壹仟萬圆整");
    expect(tenMillion).toBe(10000000);
  });

  it("壹亿圆整", () => {
    const tenMillion = chineseNumCaseToDigit("壹亿圆整");
    expect(tenMillion).toBe(100000000);
  });

  it("负壹亿圆整", () => {
    const tenMillion = chineseNumCaseToDigit("负壹亿圆整");
    expect(tenMillion).toBe(-100000000);
  });

  it("壹亿零壹圆整", () => {
    const bigNum = chineseNumCaseToDigit("壹亿零壹圆整");
    expect(bigNum).toBe(100000001);
  });

  it("壹拾亿零壹拾壹圆整", () => {
    const bigNum = chineseNumCaseToDigit("壹拾亿零壹拾壹圆整");
    expect(bigNum).toBe(1000000011);
  });

  it("壹佰亿零壹佰壹拾贰圆整", () => {
    const bigNum = chineseNumCaseToDigit("壹佰亿零壹佰壹拾贰圆整");
    expect(bigNum).toBe(10000000112);
  });

  it("壹拾亿零贰仟壹佰壹拾贰圆整", () => {
    const bigNum = chineseNumCaseToDigit("壹拾亿零贰仟壹佰壹拾贰圆整");
    expect(bigNum).toBe(1000002112);
  });

  it("壹拾亿零肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = chineseNumCaseToDigit("壹拾亿零肆萬贰仟壹佰壹拾贰圆整");
    expect(bigNum).toBe(1000042112);
  });

  it("壹拾亿零叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = chineseNumCaseToDigit("壹拾亿零叁拾肆萬贰仟壹佰壹拾贰圆整");
    expect(bigNum).toBe(1000342112);
  });

  it("壹拾亿零捌佰叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = chineseNumCaseToDigit(
      "壹拾亿零捌佰叁拾肆萬贰仟壹佰壹拾贰圆整"
    );
    expect(bigNum).toBe(1008342112);
  });

  it("壹拾亿零贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = chineseNumCaseToDigit(
      "壹拾亿零贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整"
    );
    expect(bigNum).toBe(1028342112);
  });

  it("壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = chineseNumCaseToDigit(
      "壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整"
    );
    expect(bigNum).toBe(1128342112);
  });

  it("壹仟壹佰壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整", () => {
    const bigNum = chineseNumCaseToDigit(
      "壹仟壹佰壹拾壹亿贰仟捌佰叁拾肆萬贰仟壹佰壹拾贰圆整"
    );
    expect(bigNum).toBe(111128342112);
  });

  it("壹佰贰拾叁萬肆仟伍佰陆拾柒圆捌角玖分", () => {
    const bigNum =
      chineseNumCaseToDigit("壹佰贰拾叁萬肆仟伍佰陆拾柒圆捌角玖分");
    expect(bigNum).toBe(1234567.89);
  });

  it("玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆玖角玖分", () => {
    const bigNum = chineseNumCaseToDigit(
      "玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆玖角玖分"
    );
    expect(bigNum).toBe(999999999.99);
  });

  it("玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆零玖分", () => {
    const bigNum = chineseNumCaseToDigit(
      "玖亿玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖圆零玖分"
    );
    expect(bigNum).toBe(999999999.09);
  });

  it("壹拾亿零叁仟肆佰伍拾贰圆整", () => {
    const bigNum = chineseNumCaseToDigit("壹拾亿零叁仟肆佰伍拾贰圆整");
    expect(bigNum).toBe(1000003452);
  });
});
