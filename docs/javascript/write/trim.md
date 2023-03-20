## `String.prototype.trim`

`trim`函数主要的功能是替换字符串首尾的空格，但是有些时候还有去掉字符串指定字符的需求，因此，我们可以对其增强。

既然是增强，当然不能改变其本来都能力，如果用户按原本的规则调用，直接去掉空格就好。

如果用户想指定取出字符串首尾指定的字符串，允许传入普通字符和正则表达式进行替换。

实现如下：

```js
(function () {
  let nativeTrim =
    String.prototype.trim ||
    function trim() {
      return this.replace(/^\s*|\s*$/g, "");
    };
  String.prototype.trim = function (char) {
    if (typeof char === "undefined") {
      return nativeTrim.apply(this);
    }
    if (char instanceof RegExp) {
      char = char.source;
    } else {
      // 替换转义字符，防止将其识别成了正则表达式
      char = char.replace(/\\/g, "\\\\");
    }
    // 声明正则表达式的替换规则
    const regExp = new RegExp(`^${char}*|${char}*$`, "g");
    return this.replace(regExp, "");
  };
})();
```
