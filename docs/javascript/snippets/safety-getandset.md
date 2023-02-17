## 安全的取值和赋值方法

安全的从对象上取值的方法在`ES6`的`?.`运算符出来之前是一个比较常用的方法（如果项目没有这种工具库的话，那还是用`?.`运算符比较省事儿了）因为`JS`如果在当前执行任务里遇到未捕获的错误的话，就不再继续向下执行了。所以我们在对象上进行取值操作的时候，基本上都会进行一个非空断言。

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

在对象上设置某个值就会比较有用了，因为你就不用一次一次的去初始化对象，解放双手。

说了这么多废话，回归正题，以下是我实现一个安全的取值方法`safetyGetProperty`和`safetySetProperty`

```js
/**
 * 安全的获取对象o上键为p的值(不考虑原型链)
 * @param {Object} o
 * @param {String} p p支持a.b.c或者b.a[o][d].e这样的形式，对于[]这种形式的取值，如果不按预期传递，解析的结果可能就非预期
 */
export function safetyGetProperty(o, p) {
  // 非引用类型直接报错
  if (!isRef(o)) {
    throw new Error("o must be a reference type");
  }
  p = String(p);
  // 如果当前对象上不存在这个key，说明用户传递的内容是复杂key，才继续后续的流程，否则可以直接取值
  if (o && o.hasOwnProperty(p)) {
    return o[p];
  }
  // 解析keys
  const props = parseProps(p);
  let prop = props.shift();
  let target = o[prop];
  // 如果target不是一个真值，那么继续循环将会报错，如果realKeys的length还存在，说明key值还没有取完，需要继续向下迭代
  while (target && props.length) {
    prop = props.shift();
    target = target[prop];
  }
  // 如果keys的值用尽，说明是正常终止，否则就是非正常终止的，则返回null。
  return props.length === 0 ? target : null;
}

/**
 * 安全的设置对象o上键为p的值v(不考虑原型链)
 * @param {Object} o
 * @param {String} p
 * @param {any} v
 */
export function safetySetProperty(
  o,
  p,
  v,
  propDesc = {
    enumerable: true,
    writable: true,
    configurable: true,
  }
) {
  // 非引用类型直接报错
  if (!isRef(o)) {
    throw new Error("o must be a reference type");
  }
  p = String(p);
  // 解析props
  const realKeys = parseProps(p);
  let target = o;
  let prop = realKeys.shift();
  while (realKeys.length) {
    // 是否是纯数字的键
    let isPureNumProp = /\d+/.test(prop);
    // 如果对象不存在
    if (!target[prop]) {
      // 如果是纯数字的key，初始化为数组，否则初试化为对象
      target[prop] = isPureNumProp ? [] : {};
    }
    // 向后迭代
    target = target[prop];
    prop = realKeys.shift();
  }
  Object.defineProperty(target, prop, {
    ...propDesc,
    value: v,
  });
}

/**
 * 判断是否是引用类型
 * @param {Array | Object} o
 * @returns
 */
function isRef(o) {
  return ["Object", "Array"].some((key) => {
    return Object.prototype.toString.call(o, key) === `[object ${key}]`;
  });
}

function parseProps(prop) {
  // 先以.形式分割，如果最后一个字符为.则视为最后想要取的键位''，如果第一个是.，则视其为第一个键值的一部分
  const primaryKeys = prop.split(".");
  if (/^\./.test(prop)) {
    // 弹出空值
    primaryKeys.shift();
    // 取出真值，并且将.视为第一个键的一部分
    const tmp = primaryKeys.shift();
    primaryKeys.unshift("." + tmp);
  }
  const parsedProps = [];
  for (let i = 0; i < primaryKeys.length; i++) {
    const key = primaryKeys[i];
    if (/\[[\w]+\]/.test(key)) {
      const keyGroup = parseSquareBrackets(key);
      parsedProps.push(...keyGroup);
    } else {
      parsedProps.push(key);
    }
  }
  return parsedProps;
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
// parseSquareBrackets("a[[b]]c")
// ['a', 'b', 'c']，这是我认为预期的处理结果
```
