## 数字的千分位分隔

这个需求主要在金融软件上会比较常用

之前看到过很多版本，比如有正则替换的，但是我觉得用正常的思维来实现代码的可读性会比较好。

思路如下：如果一个数是整数的话，不需要考虑小数，如果是小数的话考虑一下保留多少位有效数字，剩下的就是将整数部分从右往左处理，三个为一组，最终拼起来得到最后的结果

```js
function toThousand(num, precision = 2) {
  if (typeof num !== "number") {
    throw new TypeError("num must be a number");
  }
  if (Number.isNaN(num)) {
    return num;
  }
  // 整数才处理，小数不处理
  const numStr = String(
    Math.floor(num) === num ? num : num.toPrecision(precision)
  );
  const part = numStr.split(".");
  let result = "";
  let offset = part[0].length - 3;
  // 从右往左3个为一组提取数字
  while (offset > -3) {
    const substr = part[0].substring(offset < 0 ? 0 : offset, offset + 3);
    // 如果当前结果是''，直接处理结果，否则会多加一个,
    result = result ? substr + "," + result : substr;
    offset = offset - 3;
  }
  // 小数部分直接加到后面就好了
  if (part.length === 2) {
    result += "." + part[1];
  }
  return result;
}
```
