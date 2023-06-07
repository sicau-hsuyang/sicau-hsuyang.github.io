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

/**
 * 随机化数组
 * @param {number[]} arr 待随机化数组
 */
function shuffle(arr: unknown[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    // 因为JS的随机数范围是[0, 1)，对其取floor之后，随机数范围则变成了[0, i - 1]， 所以为了保证，每个数都有机会被选取到，生成随机索引时，要传入i+1，
    // 使得生成的随机数索引范围在[0, i]之间
    const rndIdx = Math.floor(Math.random() * (i + 1));
    // 将随机选中的数交换到当前处理的位置上
    let tmp = arr[i];
    arr[i] = arr[rndIdx];
    arr[rndIdx] = tmp;
    // 完成交换之后，数据规模递减，直到完成所有的处理
  }
}

/**
 * 十进制转化成2-36进制的字符串
 * @param { Number } num 输入的十进制内容
 * @param { Number } expectRadix 预期转化的进制
 * @return { String }
 */
export function calcShortLinkCode(num: number, expectRadix = 62) {
  let results = "";
  let tmp = num;
  const map = [
    "Z",
    "i",
    "n",
    6,
    4,
    "q",
    7,
    "r",
    2,
    "f",
    "z",
    "M",
    "u",
    "g",
    9,
    "a",
    "s",
    "D",
    "W",
    "S",
    "l",
    "d",
    "N",
    "K",
    "I",
    "c",
    "k",
    0,
    "e",
    "p",
    "v",
    "U",
    "L",
    "Y",
    "j",
    "y",
    "V",
    3,
    "h",
    "R",
    "F",
    "t",
    "o",
    "Q",
    "P",
    "J",
    "w",
    "E",
    5,
    "T",
    "B",
    "H",
    "G",
    "C",
    "b",
    "A",
    "O",
    "m",
    "x",
    "X",
    8,
    1,
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
