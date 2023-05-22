## 闭包

### 基本概念

闭包（`Closure`），MDN 上给的定义是这样的：

> 是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。

我对它通俗的理解是这样的：**父子函数嵌套（一般情况下是，有些时候也并不是出现在父子函数的情况，后文会举例说明），在父函数内部定义的变量，当父函数执行完成，其子函数仍然有访问这些变量的权利**。

比如：

```ts
function Base() {
  let a = 1,
    b = 2;
  return function Child() {
    return a + b;
  };
}

const Child = Base();
const sum = Child();
// 3
console.log(sum);
```

我们把这段代码以调试的方式跑起来：

<div align="center">
  <img src="https://res.cdn.changbaimg.com/-/3bf660d6eefb576b/closure.png" alt="闭包" />
</div>

因为在`Child`函数里面，引用着变量`a`和`b`，所以`a`和`b`就没办法销毁，`JS`引擎就会把当时(`Child`函数定义时的)的环境的引用的变量一并打包创建出一块特殊的内存区域，这块特殊的内存区域就称作闭包。

### 作用域及作用域链

闭包是不同的作用域引用产生的结果，因此在这之前我们我们得先明白什么是作用域以及作用域链。

`JS`的作用域分为几类，在`ES6`以前，`JS`有`2-3`类，为什么会是`2-3`类呢？取决于你怎么去看第三类作用域（😂），前两类作用域大家都能达成共识：

- 1、全局作用域（`Global Scope`）：全局作用域是整个`JS`程序的最外层作用域，它定义的变量和函数可以在程序的任何地方访问。

- 2、函数作用域（`Function Scope`）：函数作用域是在函数内部声明的变量和函数所拥有的作用域。这意味着函数内部声明的变量在函数外部是不可访问的，而函数外部声明的变量在函数内部是可以访问的。

- 3、`eval`产生的欺骗作用域，它可以在运行时动态地执行传入的字符串代码，并且在该执行环境中创建一个新的作用域。在 `eval`执行的代码中声明的变量和函数都属于`eval`执行所创建的作用域，并且在该作用域内可访问，这意味着在`eval`中声明的变量和函数在外部作用域是不可访问的。**`eval`产生的欺骗作用域可能会引入安全性和性能方面的问题，在实际开发中是不推荐的**。

我读的书或者博客有些说的是`2`种，有些说是`3`种，所以这个`eval`大家仅记住一下它会产生作用域即可，实际开发中不常用。

在`ES6`之后引入了两个新的作用域：

- 1、块级作用域（`Block Scope`）：块级作用域是在代码块（通常是由一对花括号`{}`包裹起来的语句）中声明的变量所拥有的作用域。在`ES6`中引入了`let`和`const`关键字，它们声明的变量具有块级作用域，只能在当前代码块中访问。

- 2、模块作用域（`Module Scope`）：模块作用域是在模块中声明的变量所拥有的作用域。模块是`ES6`引入的概念，通过使用`import`和`export`关键字来导入和导出模块中的变量和函数。在模块中声明的变量和函数只能在当前模块中访问，不会污染全局命名空间。

全局作用域 1：

```js
<!-- 全局作用域 -->
<script>let a = 1; let b = 2; let c = 3;</script>
```

全局作用域 2：

```js
// 假设当前处于nodejs环境下
let a = 1;
let b = 2;
let c = 3;
```

函数作用域：

```js
<script>
  function a() {
    var A = 1;
    var B = 2;
    // 函数a的作用域，仅可以访问全局作用域
    function b() {
      var C = 3;
      var D = 4;
      // 函数b的作用域，也可以访问函数a的作用域和全局作用域
      function c() {
        var E = 5;
        var F = 6;
        // 函数c的作用域，在此也可以访问函数b的作用域，也可以访问函数a的作用域和全局作用域
      }
    }
  }
  // 即时使用var定义，ABCDEF也不会污染到全局变量
</script>
```

因为函数作用域不会污染全局变量，因此一些库的加载常常书写成以下形式：（比如十年前火遍全世界的`jQuery`）

```js
(function ($) {
  // 因为$有可能已经被污染了，通过这样处理，能够保证内部的$一定使用的是window.jQuery
  console.log($);
})(window.jQuery);
```

`ES6`的块级作用域：

```js
// 全局作用域
{
  // 块级作用域
  let a = 1;
  let b = 2;
  const c = 3;
}
```

`ES6`的模块作用域 1：

```js
<!-- 假设一个html文件里面有两段代码 -->
<script type="module">
  export const a = 1; export const b = 2; var c = 'aaa';
  // c不会定义到全局去
</script>

<script type="module">
  export const A = 1; export const B = 2; var C = 'aaa';
  // C不会定义到全局去
</script>
```

`eval`的欺骗作用域：

<div align="center">
  <img src="https://res.cdn.changbaimg.com/-/f2bda840ecc78559/eval-before.png" alt="eval" />
</div>

<div align="center">
  <img src="https://res.cdn.changbaimg.com/-/8fa8017fcd5de7a4/eval-after.png" alt="eval" />
</div>

内部的作用域可以访问外部的作用域，当一个`JS`引擎读取一个变量时，首先尝试当前作用域找，找不到就接着一直向上层作用域找，直到找到全局作用域（在这之前任何一个作用域中找到了就停止），如果找不到，就会报`Uncaught ReferenceError: xxx is not defined`的错误，这就是`JS`的作用域链。

因此，考察作用域链有一道经典的面试题：

```js
var a = 1;

function fn1() {
  var b = 2;
  console.log(a, b);
}

function fn2() {
  var a = 10;
  fn1();
}

fn2();
// 请问上述代码输出什么？
```

根据上述我们对`JS`的各类作用域的阐述，`fn1`是一个函数作用域链，它能访问自己及它的上层作用域，它的上层作用域就是全局作用域了，上层作用域定义的`a`是`1`，因此输出的结果是`1,2`

### 闭包的用途

### 闭包的一些问题

```js
const test = 2;
const o = (function () {
  const obj = {
    a: 1,
    b: 2,
  };
  return {
    get(prop) {
      return obj[prop];
    },
  };
})();

// Object.defineProperty(Object.prototype, "abc", {
//   get() {
//     return this;
//   },
// });

// const obj = o.get("abc");

// delete obj.a;

// delete obj.b;

// console.log(o.get("a"));
```
