## `RegExp`对象

本文不着重阐述正则表达式本身，主要是阐述`RegExp`一些应用以及实际开发中的坑。

对于想详细理解`RegExp`对象的朋友，可以查看[`MDN`原文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

在`JS`中，一般我们喜欢写`RegExp`对象的字面量形式，如：

```js
const regExp = /^(\+86)?1[3456789]\d{9}$/;
regExp.test("14730909030");
```

而如果写构造函数的形式，还需要对特殊字符进行转义，相对来说就比较复杂了，比如，实现同等功能，代码要这样写：

```JS
const regExp = new RegExp("^(\\+86)?1[3456789]\\d{9}$")
```

有些时候，难免会把一些转义字符写错，所以为了避免问题，还是尽量避免写构造函数的形式。

不过凡事不是绝对的，有的情况是不得不写构造函数形式的，比如：

```js
const obj = { name: "yangxu", age: 28, vocation: "web-frontend developer" };

const html = `<div class="person">
                <span class='name'>{{name}}</span>
                <span class='age'>{{age}}</span>
                <span class='vocation'>{{vocation}}</span>
              </div>
            `;
/*
  希望得到如下结果
  <div class="person">
    <span class='name'>yangxu</span>
    <span class='age'>28</span>
    <span class='vocation'>web-frontend developer</span>
  </div>
*/
```

```js
const compile = (str, targetObj) => {
  let distStr = str;
  Object.entries(targetObj).forEach(([prop, val]) => {
    distStr = distStr.replace(new RegExp("{{(" + prop + ")}}"), val);
  });
  return distStr;
};
/* 这个例子举的不是特别恰当，但是主要想说明RegExp构造器初始化正则表达式一般都是在动态生成正则表达式的场景下 */
/**
  const compile = (str, targetObj) => {
    let distStr = str.replace(/{{([a-zA-Z0-9]+)}}/g, function (...args) {
      return args.length > 1 && targetObj[args[1]];
    });
    return distStr;
  };
*/
```

### 组

关于正则的`组`的概念，请先查阅相关资料，本文主要阐述实际的应用。

`RegExp`对象上存在`$1`-`$9`对象用来表示组，比如：

```JS
const regExp = /^(\d)[\u4e00-\u9fa5]+/
regExp.test('1生一世写前端');
RegExp.$1 // 匹配成功之后，RegExp.$1 的值就是 '1'，不标准，不建议使用
```

如果使用`exec`：

```js
const regExp = /^(\d)[\u4e00-\u9fa5]+/;
regExp.exec("1生一世写前端"); // 匹配成功得到的是一个数组，如['1生一世写前端', '1', index: 0, input: '1生一世写前端', groups: undefined]，否则null
```

在字符串的替换中，可以用到这些匹配的结果，如：

```js
const regExp = /^(\d)[\u4e00-\u9fa5]+/;
let str = "1生一世写前端";
str = str.replace(regExp, "$1起写代码");
```

### 序列化

`RegExp`的实例只能被序列化成为一个普通对象

### 全局匹配与`lastIndex`

这个问题可能是绝大部分前端都没有搞清楚的问题，并且我也被这个问题坑过。

下面就来看一个例子：

```js
const regExp = /^(\+86)?1[3456789]\d{9}$/g;

regExp.test("14730909030"); // true
regExp.test("14730909030"); // false
regExp.test("14730909030"); // true

/^(\+86)?1[3456789]\d{9}$/g.test("14730909030") // true
/^(\+86)?1[3456789]\d{9}$/g.test("14730909030") // true
/^(\+86)?1[3456789]\d{9}$/g.test("14730909030") // true
```

为什么中间的这个语句得到的结果是`false`，超出自己的认知了？？？

no no no！！！，这是你还没有理解到 `RegExp.lastIndex` 是什么意思。

`lastIndex`只有正则表达式使用了表示全局检索的 "g" 或者粘性检索的 "y" 标志时，该属性才会起作用。

- 如果 `regexp.test` 和 `regexp.exec` 匹配成功，**`lastIndex` 会被设置为紧随最近一次成功匹配的下一个位置。**
- 如果 `regexp.test` 和 `regexp.exec` 匹配失败，**`lastIndex` 会被设置为 0**

上述第一个情况，三个`test`，有一个是`false`的原因是，第一次成功匹配，lastIndex 走到最后一个位置，下次匹配的时候，相当于是从`''`匹配
`'14730909030'`，那当然是匹配不到了，匹配不到，`lastIndex`就要归零，所以下次再匹配的时候，就能匹配了。而第二个情况每次都申明一个新的正则对象来进行匹配，其实也就丢失了全局匹配的意义，所以，每次都能匹配上。

明确了这个问题，其实你也明确了什么时候该用全局匹配和什么时候不该用全局匹配了，简言之就是：如果你想在上次的搜索结果上继续向后匹配，那么你就需要使用全局匹配。
