## 安全的取值和赋值方法

这个方法在`ES6`的`?.`运算符出来之前是一个比较常用的方法，因为`JS`如果在当前执行任务里遇到未捕获的错误的话，就不再继续向下执行了。所以我们在对象上进行取值操作的时候，基本上都会进行一个非空断言。

比如：

```js
o && o.p && typeof o.p.q === "function" && o.p.q();
```

有了 ES6 的`?.`运算符之后，以下代码可以简写成

```js
o?.p?.q?.();
```

我们可以将这段代码编译之后的代码贴出来看看

```js
"use strict";

var _o$p, _o$p$q;

var o = {};
o.p = {};

o.p.q = function () {
  console.log("aaa");
};

o === null || o === void 0
  ? void 0
  : (_o$p = o.p) === null || _o$p === void 0
  ? void 0
  : (_o$p$q = _o$p.q) === null || _o$p$q === void 0
  ? void 0
  : _o$p$q.call(_o$p);
```

可以看到，这段代码编译出来的结果是相当的长啊，这就是为什么`Vue3`没有采用这种语法的原因了。

说了这么多废话，回归正题，以下是我实现一个安全的取值方法`safetyGetProperty`

```js
/**
 * 安全的获取对象o上键为p的值(不考虑原型链)
 * @param {Object} o
 * @param {String} p p支持a.b.c或者b.a[o][d].e这样的形式，对于[]这种形式的取值，如果不按预期传递，解析的结果可能就非预期
 */
function safetyGetProperty(o, p) {
  // 非引用类型直接报错
  if (!isRef(o)) {
    throw new Error("o must be a reference type");
  }
  // 如果当前对象上不存在这个key，说明用户传递的内容是复杂key，才继续后续的流程，否则可以直接取值
  if (o && o.hasOwnProperty(p)) {
    return o[p];
  }
  // 先以.形式分割，如果最后一个字符为.则视为最后想要取的键位''，如果第一个是.，则视为其为第一个键值的一部分
  const primaryKeys = p.split(".");
  if (/^\./.test(p)) {
    // 弹出空值
    primaryKeys.shift();
    // 取出真值，并且将.视为第一个键的一部分
    const tmp = primaryKeys.shift();
    primaryKeys.unshift("." + tmp);
  }
  const realKeys = [];
  for (let i = 0; i < primaryKeys.length; i++) {
    const key = primaryKeys[i];
    if (/\[[\w]+\]/.test(key)) {
      const keyGroup = parseSquareBrackets(key);
      realKeys.push(...keyGroup);
    } else {
      realKeys.push(key);
    }
  }
  let prop = realKeys.shift();
  let target = o[prop];
  // 如果target不是一个真值，那么继续循环将会报错，如果realKeys的length还存在，说明key值还没有取完，需要继续向下迭代
  while (isRef(target) && realKeys.length) {
    prop = realKeys.shift();
    target = target[prop];
  }
  // 如果keys的值用尽，说明是正常终止，否则就是非正常终止的，则返回null。
  return realKeys.length === 0 ? target : null;
}

function isRef(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

/**
 * 解析方括号中的key值
 * @param {String} prop
 */
function parseSquareBrackets(prop) {
  let pos = 0;
  let str = "";
  let parsedKeys = [];
  // 定义一个解析中的标记
  let parsing = false;
  while (pos < prop.length) {
    const char = prop[pos++];
    // 解析到第一个`[`之前的key，当前的[不计入key中
    if (char === "[") {
      if (str != "") {
        parsedKeys.push(str);
        str = "";
      }
      parsing = true;
      continue;
    }
    // 遇到`]`则视为已经解析到了一个key
    else if (char === "]" && parsing) {
      parsing = false;
      parsedKeys.push(str);
      str = "";
    } else {
      // 极端的case 单的`]`，还没有开始就已经遇到]
      str += char;
    }
  }
  // 极端case 单的`[`
  if (parsing) {
    const tmp = parsedKeys.pop();
    parsedKeys.push(tmp + "[" + str);
    str = "";
  }
  // 极端的case 单的`]`
  if (str != "") {
    parsedKeys.push(str);
    str = "";
  }
  return parsedKeys;
}

/**
 * 这是parseSquareBrackets的测试用例
 */
// parseSquareBrackets("a[b][c]")
// ['a', 'b', 'c']
// parseSquareBrackets("a[bc]")
// ['a', 'bc']
// parseSquareBrackets("a[bc")
// ['a[bc']
// parseSquareBrackets("ab]c")
// ['ab]c']
// parseSquareBrackets("ab]c]")
// ['ab]c]']
// parseSquareBrackets("[abc]")
// ['abc']
// parseSquareBrackets("[]")
// ['']
```
