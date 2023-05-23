## 闭包

### 基本概念

闭包（`Closure`），MDN 上给的定义是这样的：

> 是一个函数以及其捆绑的周边环境状态（`lexical environment`，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在`JavaScript`中，闭包会随着函数的创建而被同时创建。

我对它通俗的理解是这样的：**父子函数嵌套（一般情况下是，有些时候也并不是出现在父子函数的情况，后文会举例说明），在父函数内部定义的变量，当父函数执行完成，其子函数仍然有访问这些变量的权利**。

在阅读下文的作用域和作用域链后，您就能明白一般情况以外的情况了。

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

我们在这节，仅讨论您已经明确知道会创建闭包的情况下的一些编程手段。

#### 1、使用闭包进行封装：

```js
function Person() {
  // 注意定义变量不能定义在this上
  let _name;
  this.setName = function setter(name) {
    // 外界无法访问_name，只能通过setter设置_name的值
    _name = name;
  };
  this.getName = function getter() {
    // 外界无法访问_name，只能通过getter获取_name的值
    return _name;
  };
}

const people = new Person();
people.setName("bill gates");
console.log(people.getName());
```

这个代码范式，在`ES5`及以前使用的非常多，在`ES6`引入了`class`之后使用场景不多。

#### 2、通用柯里化函数：

```js
/**
 * 通用柯里化函数
 * @param {Function} fn 待柯里化的函数
 * @param {unknown[]} bindArgs 已确定参数
 * @returns
 */
function curry(fn, bindArgs = []) {
  // 返回一个已经柯里化了的函数
  return function curried() {
    const curArgs = arguments;
    // 合并已确定的函数参数和本轮传递的参数
    const combinedArgs = [...bindArgs, ...curArgs];
    // 如果已确定参数能够满足函数的执行，则执行函数，否则递归调用柯里化函数
    if (combinedArgs.length >= fn.length) {
      return fn.apply(this, combinedArgs);
    } else {
      return curry(fn, combinedArgs);
    }
  };
}

function add(a, b, c, d, e) {
  return a + b + c + d + e;
}

const curryAdd = curry(add);

const sum = curryAdd(1, 2, 3, 4, 5);
const sum2 = curryAdd(1)(2)(3)(4)(5);
const sum3 = curryAdd(1, 2)(3, 4)(5);

console.log(sum, sum2, sum3);
```

在这种场景下，使用闭包既可以**提前确定参数**，又能够达到**延迟计算**的效果

#### 3、实现单例模式

单例模式既可以使用`class`的方式实现，也可以使用闭包实现

```js
const Singleton = (function () {
  let instance; // 私有变量，用于存储单例实例
  function createInstance() {
    // 创建单例实例的逻辑
    return {
      // 单例的公共方法和属性
      foo: function () {
        console.log("Hello, I am the singleton instance!");
      },
    };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
```

#### 4、实现装饰模式

```js
// 原函数执行前执行
Function.prototype.beforeExec = function enhanceFn(beforeExec, ctx) {
  const fn = this;
  return function decorate() {
    const bindCtx = ctx || this;
    beforeExec.apply(bindCtx, arguments);
    return fn.apply(bindCtx, arguments);
  };
};
// 原函数执行后执行
Function.prototype.afterExec = function enhanceFn(afterExec, ctx) {
  const fn = this;
  return function decorate() {
    const bindCtx = ctx || this;
    const response = fn.apply(bindCtx, arguments);
    afterExec.apply(bindCtx, arguments);
    return response;
  };
};

const func1 = (() => {
  console.log("hello closure");
}).beforeExec(() => {
  console.log("before exec");
});

const func2 = (() => {
  console.log("hello closure");
}).afterExec(() => {
  console.log("after exec");
});

func1();
func2();
```

防抖和节流其实也属于这类场景，就不再赘述了。

### 闭包的一些问题

#### 1、无意中触发了闭包

这个场景在初学者经常出现，常常也作为面试题出现。需求很简单，给你一堆`div`，为每个`div`绑定`click`事件，当`div`被点击的时候打印出当前`div`的索引。

为了说明问题，我在此例中用会出现问题的写法（可以有很多种办法直接回避这个问题）：

```js
function attachEventForDivCollection() {
  const divList = [...document.querySelectorAll("div")];
  for (var i = 0; i < divList.length; i++) {
    var curDiv = divList[i];
    curDiv.onclick = function () {
      console.log(i);
    };
  }
}
```

上述代码执行以后，每个`div`打印出来的结果都是`divList`的`length`，为什么是这样呢？你思考一个问题，当你点击某个`div`的时候，`for`循环是否已经执行完成？`for`循环执行完成之后，`i`是多少，自然是`divList`的`length`，给每个`div`绑定索引是在什么位置定义的呢？在事件处理函数的上级作用域定义的，为了使得事件处理器能够引用更上层作用域中定义的变量，所以`JS`引擎就会创建闭包。

但是实际上，我们其实是不需要其创建闭包，最简单的办法就是使用`ES6`引入的块级作用域，只需要将这个代码改写成这样就可以了：

```js
function attachEventForDivCollection() {
  const divList = [...document.querySelectorAll("div")];
  // var改写成let
  for (let i = 0; i < divList.length; i++) {
    var curDiv = divList[i];
    curDiv.onclick = function () {
      console.log(i);
    };
  }
}
```

如果你研究过`babel`的编译结果的话，平时我们用`let`写的`for`循环，`babel`会给我们转义成以下形式：

```js
function attachEventForDivCollection() {
  // _toConsumableArray没有给出，读者可以自行查看babel的编译结果
  var divList = _toConsumableArray(document.querySelectorAll("div"));
  // var改写成let
  var _loop = function _loop(i) {
    curDiv = divList[i];
    curDiv.onclick = function () {
      console.log(i);
    };
  };

  for (var i = 0; i < divList.length; i++) {
    var curDiv;
    _loop(i);
  }
}
```

因此，在`MDN`官方有一句话是：

> 如果不想使用过多的闭包，你可以用`ES2015`引入的`let`或`const`关键词

由此可见，**`let`和`const`不仅可以解决变量提升的问题，某些场景下还能减少闭包的创建，因此建议大家在实际开发中不要再使用`var`定义变量。**

#### 2、闭包的安全性问题

```js
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
```

上述代码用闭包封装了一个取值器，你觉得它的这个操作安全吗？咋一看好像没有什么问题，`obj`是一个局部变量，当匿名函数执行完成之后，外界得到了一个取值访问器。

```js
Object.defineProperty(Object.prototype, "abc", {
  get() {
    return this;
  },
});

const obj = o.get("abc");
delete obj.a;
delete obj.b;
console.log(o.get("a"));
```

但是，如果我执行这样的操作，你还觉得这个定义安全吗？😂，因为你在定义的时候没有进行一些权限判断，那我就可以通过嗅探的方式篡改你的内部实现，从而是想向你的代码投毒。

因此，我们在使用闭包进行一些权限判断的时候，一定要重视这些问题，才能提高我们编写的代码的健壮性。

上述代码需要加入一些防篡改的操作：

```js
const o = (function () {
  // 冻结对象，防止被篡改
  const obj = Object.freeze({
    a: 1,
    b: 2,
  });
  return {
    get(prop) {
      // 不允许访问除了obj自身属性以外的属性
      if (!obj.hasOwnProperty(prop)) {
        return null;
      }
      return obj[prop];
    },
  };
})();
```

#### 3、内存泄露的问题

在阐述这个问题之前，我们需要明确`JS`的垃圾回收机制。

`JS`中常见的垃圾回收机制是基于标记清除算法，标记清除算法的基本思想是通过标记对象是否可达来确定哪些对象是垃圾。垃圾收集器首先会将根对象（全局对象、活动执行上下文中的变量等）标记为可达对象，然后从根对象开始递归遍历所有引用的对象，并标记为可达。未被标记的对象则被认为是垃圾，可以被回收。

其实对上述叙述，很简单的一个理解就是一个变量是否从全局作用域通过一系列路径能够访问到它，如果能，那么它就不能视为垃圾，就不能被`GC`回收。

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const counter = createCounter();

// 每次调用 counter 函数，count 值会递增
counter(); // 输出 1
counter(); // 输出 2
counter(); // 输出 3

// 假设在某个时刻不再需要使用 counter 函数了，但是它仍然保留了对 createCounter 函数的引用
// 这会导致 createCounter 函数中的 count 变量无法被垃圾回收
```

因此，在实际开发中，我们应该注意这样的问题。

### 闭包的销毁

闭包的销毁其实很简单，因为闭包的产生是因为函数以及其捆绑的周边环境状态，那么我们不再引用它周边的环境状态自然就可以了。

使用调试模式执行以下代码：

```js
function demo() {
  var obj = {
    a: 1,
    b: 2,
  };

  return function test() {
    var b = obj;
    setTimeout(() => {
      b = null;
      obj = null;
    }, 1000);
  };
}

const fn = demo();

fn();
```

<div align="center">
  <img src="https://res.cdn.changbaimg.com/-/62c5b66fe4f794a8/%E5%88%9B%E5%BB%BA%E9%97%AD%E5%8C%85.png" alt="闭包" />
</div>

<div align="center">
  <img src="https://res.cdn.changbaimg.com/-/9f18aeb652e919a4/%E9%94%80%E6%AF%81%E9%97%AD%E5%8C%85.png" alt="闭包" />
</div>
