## 进制转换

这算一个不是特别难，但是可能一时半会儿又不太容易想到答案的问题

我们在高中的数学课程中就已经学过一种方法，叫做`除K取余法`，可以把一个十进制的数转化成任意进制的数。

### 1、toString

如果不知道`toString`可以做进制转换的同学，可以先翻阅一下`MDN`，`Number`对象覆盖了`Object`对象上的`toString`方法，`toString`方法返回指定`Number`对象的字符串表示形式，可接收一个`radix`参数，范围在`2-36`，如果未指定`radix`参数，则默认值为`10`。

既然说到了这儿，相信有很多同学可能遇到过这个问题（我在`2019`年的时候面试中国电子科技集团`30`所的时候被问到过这题）：

```js
console.log(["1", "2", "3"].map(parseInt));
```

请问上述代码，输出的结果是什么，并解释为什么

这个问题其实考察的是你的仔细程度和`API`的掌握度。

首先，上述代码稍稍的进行改写就比较简单明了了。

```js
const arr = ["1", "2", "3"];
const res = arr.map((cur, curIdx, arr) => {
  return parseInt(cur, curIdx, arr);
});
console.log(res);
```

为什么可以改写成这样？

因为，`Array.prototype.map`的`TS`定义如下:

```ts
interface Array<T> {
  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
}
```

`parseInt`直接以回调的形式传入的，因此，它其实是接受了`map`方法的所有参数。

`parseInt`或者`Number.parseInt`，接受两个参数，第一个参数是需要转换的原始值，第二个参数是转化的进制，是一个可选参数，范围在`2-36`，如果不传或者传入`0`视为不传，如果待转换参数是`0x`或者`0X`开头，那么默认以十六进制进行转换，否则默认以`10`进制进行转换。若无法转换，则返回`NaN`

所以，`parseInt('1', 0)`，就相当于，`parseInt('1')`，所以结果为`1`，`parseInt('2', 1)`指定的进制不在预期范围内，所以结果为`NaN`，`parseInt('3', 2)`这个很多人就比较迷惑了，为什么呀，不是说了进制在`2-36`之间吗，应该的结果是`11`，抱歉，我们现在是在把字符串转成`Number`，二进制数里面怎么可能包含`3`呢，所以`parseInt('3', 2)`的结果也是`NaN`。

综上所述：

```js
console.log(["1", "2", "3"].map(parseInt));
// 1 NaN NaN
```

### 2、除`K`取余法

在说了一些花里胡哨的知识点之后，进入本文的正题——>`除K取余法`。

我记得在大学上`C语言程序设计`的前几节实验课，就有一题，比如给你一个三位数，分别打印各位上的数字，这题第一眼看起来，就好像这个思路，但是你会发现，顺着这个思路会越走越远。

因为将`A数`的十进制转化为`B数`的`b进制`之后，你并不知道`B数`最高位能是多少。但是我们反过来想，个位上一定都是达不到某进制的落单的数（我的个人理解），那么如果将`A数`对`b进制`取余，是不是就得到了这个所谓落单的数？是的。一旦确定了个位，相当于这个新数就是一个整的`b进制`数，将其除以`b进制`，我们似乎又回到了刚才一个过程，这样不断的从右边往左边递推，并且把这个过程中的数字和单位记录下来，这不就完成了嘛。

于是，有了思路以后，编写代码就比较容易了。

```js
/**
 * 十进制转化成2-36进制的字符串
 * @param { Number } num 输入的十进制内容
 * @param { Number } expectRadix 预期转化的进制
 * @return { String }
 */
function convertNumberSystem(num, expectRadix) {
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
```

以下是基于`jest`测试的用例：

```js
describe("convertNumberSystem", () => {
  it("should convert decimal to binary correctly", () => {
    expect(convertNumberSystem(10, 2)).toBe("1010");
    expect(convertNumberSystem(3242300, 26)).toBe((3242300).toString(26));
    expect(convertNumberSystem(9, 3)).toBe((9).toString(3));
    expect(convertNumberSystem(2, 3)).toBe((2).toString(3));
    expect(convertNumberSystem(100, 16)).toBe((100).toString(16));
  });

  it("should convert decimal to octal correctly", () => {
    expect(convertNumberSystem(123, 8)).toBe("173");
  });

  it("should convert decimal to hexadecimal correctly", () => {
    expect(convertNumberSystem(255, 16)).toBe("ff");
  });

  it("should throw an error when the expected radix is greater than 36", () => {
    expect(() => convertNumberSystem(123, 37)).toThrowError(
      "Convert range error, between 2 and 36"
    );
  });
});
```

### 3、实际应用

在一些场景中，我们需要给用户一些好记忆的地址，这个地址我们称之为短链，就比如[https://v.didi.cn/YYPDp7e](https://v.didi.cn/YYPDp7e)，一个极简的域名，然后跟一串有意义的字符串，至于这个字符串是怎么求得的，那么可能最容易想到的办法就是使用哈希算法求得，但是哈希算法求的结果会很长，然后我们就只能采取截取前面几位的办法来做，但是有个问题，截取的前面几位有可能是重复的，因此需要再次哈希，所以这个过程的效率是比较低的。

此刻，就有一个比较优秀的办法，通过进制转换来做，这个短链码的生成规则我们以 62 进制(26 个大写字母+26 个小写字母+0-9)做因子来生成。

有些同学可能会说，这个求解过程会不会太容易被破解了，不会，实际上我们并不会很简单的比如以 0 就真的代表 0，A 就代表 10（举个例子），我们用随机算法求得一次这个 62 个字符的顺序数组，并记下来，后面一直用这个顺序生成，这样就可以保证只要外界不知道我的这个顺序，就无法破解。

并且，这个算法还是可逆的，我们可以根据短链码还原回原来被加密的数据。

有一个比较重要的问题就是，数据库存储的短链原数据，必须是自增的（自增就能一定保证唯一），并且这个数据不能太小，保证我们的短链不至于太短，比如 100（经过 63 进制转化之后只有两位了），因此，我们可以以 100 万 为起始数据做自增。

```ts
/**
 * 十进制转化成62进制的短链
 * @param { Number } num 输入的十进制内容
 * @return { String }
 */
function calcShortLinkCode(num, expectRadix = 62) {
  let results = "";
  let tmp = num;
  // 使用shuffle乱序生成因子的数组
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
```

这个办法高效且安全，并且不用担心生成结果可能重复的问题，而且在数据量很大的情况下，数据库查询的是数字主键肯定是要比查询字符串的ID效率高很多的。
