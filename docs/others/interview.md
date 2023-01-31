## 1、有序数组求满足某个和为某个值的组合

编写一个函数`sum`，给定一个已知**有序数组**（从小到大）和一个目标值，求得所有可以组成目标值的数对，每个数组元素只能使用一次，**要求算法复杂度越低越好**。

对于这题的思路，如果你还仅仅只想到两个`for`循环的话，那么说明你功力尚浅，还需继续努力哦。

思路分析：

题设给定的是一个有序数组，那么该怎么把有序数组这个条件利用起来呢？首先，我们想考虑一些边界的 case，假设`target`特别小或者特别大，假如我们取最后两个数来进行相加，仍然比`target`小的话，那么是否就说明一个满足条件的组合都没有呢？设想，最后两个较大的数都不满足，比倒数第二个前面更小的就更不可能了。有了这个思路之后，双指针的结题思维方式就已经建立了。

首先，我们定义两个指针，分别指向数组的第一个元素和最后一个元素，那么如果对这两个元素求和的话，如果刚好相等，是否当前这组已经满足了，那么就左指针向后走一位，右指针向前走一位。如果和比目标值小，说明当前左指针对应的元素太小了，那么就把左指针向后移动一位。反之，如果和比目标值大，说明当前右指针对应的元素太大了，那么就把右指针往前移动一位。什么时候停止呢？如果左指针跟右指针相遇了，那么根据题设条件元素只能用一次，所以这个时刻就应该终止了。

根据上面的分析，就很容易给出答案：

```js
function sum(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  const group = [];
  // 当左右指针相遇的时候 终止循环
  while (start < end) {
    let a = arr[start];
    let b = arr[end];
    let tempSum = a + b;
    // 目标值比target小，说明左指针对应的元素太小了
    if (tempSum < target) {
      start++;
    }
    // 目标值比target大，说明右指针对应的元素太大了
    else if (tempSum > target) {
      end--;
    }
    // 找到了的话，说明刚好合适，为了不重复使用元素，左指针后移，右指针前移
    else {
      start++;
      end--;
      group.push([a, b]);
    }
  }
  return group;
}
```

## 2、试写一个求和函数

试写一个求和函数，实现下面的效果

```js
sum(1, 2, 3, 4, 5); //expect 15
sum(5, -5); // expect 0
sum("1.0", false, 1, true, 1, "A", 1, "B"); // expect 4
sum("0.1", "0.2"); // expect 0.3 not be 0.3000002
```

这题，我们采用高规格的结题思路解决它，首先，先回想一下`Number.parseFloat`的处理流程，对于一个字符串，首先我们想设想符合规则的情况，如果开头是空格，则忽略，紧接着可能是`-`和`+`，然后可能开始遇到数字，需要考虑多个 0 的问题，需要仅保留一个 0，然后可能是`.`，如果是`.`的话，后面必须解析到数字才行，其余的情况均视为无法解析出正确的数字。

下面是我给出的实现，如果仍然有 case 没有考虑完全的话，欢迎各位读者 issue

```js
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
    beforePointDigits.join() +
    (point.proceed && afterPointDigits.length > 0 ? "." : "") +
    afterPointDigits.join()
  );
}
```

在实现了`parseFloat`之后，接着有一个非常重要的问题，因为计算机的浮点数相加不准确的问题，但是题设却希望 `0.1+0.2===0.3`，很显然，直接用数字相加减肯定是行不通的，那么只能转换成字符串相加，其大概的处理流程和`合并两个有序数组`类似。

```js
function add(a, b) {}
```
