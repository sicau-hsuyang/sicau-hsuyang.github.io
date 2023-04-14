/**
 * 十进制转化成2-36进制的字符串
 * @param num 输入的十进制内容
 * @param expectRadix 预期转化的进制
 */
export function convertNumberSystem(num: number, expectRadix: number): string {
  if (expectRadix > 36) {
    throw new Error("Convert range error, between 2 and 36");
  }
  let results = "";
  let tmp = num;
  const map = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  // 为什么循环的退出条件写成这样，试想，如果一个数本来就比要转化的进制还小（所以必须取到等号），那这个数不本来就是个位的数了嘛？
  while (tmp >= expectRadix) {
    const digit = tmp % expectRadix;
    // 将当前的位置和当前位置上面的数添加到结果里面去
    results = map[digit] + results;
    // 把不能整除的数减去之后，剩下的就一定可以整除了
    tmp = (tmp - digit) / expectRadix;
  }
  // 别忘了，循环如果一次都没有或者循环完成了之后，还有一个最高位的数字没有加上去，因此
  results = map[tmp] + results;
  return results;
}
