## Generator

对于绝大多数前端来说，对于`Generator`可能都是一个比较陌生的概念。在实际开发中，由于我们都直接编写基于`async-await`的代码，所以基本上不怎么用它，但是`Generator`却又是一个值得掌握的语法，`async-await`底层也是基于`generator`，大名鼎鼎的`redux-saga`就是使用的`generator`的语法，明白它的运行原理，能够帮住我们快速的在实际开发中定位`bug`，并且可以帮助我们掌握`async-await函数`的原理。

在阅读本文之前，请确保你已经掌握`ES6`的`Iterator`的应用。

本文关于`Generator`基础概念内容大致引用阮一峰老师的`Generator`节，如果你已经掌握了`Generator`的概念的话，可以直接跳过，直接查看关于`Generator`内部运行原理的分析。

### 1、基本概念

`Generator`函数是`ES6`提供的一种异步编程解决方案，语法行为与传统函数完全不同。

其写法如下:

```js
// 在function后面紧跟一个*是表示当前函数是一个Generator的语法
function* gen1() {
  yield 1;
  yield 2;
  return 3;
}
// *挨着函数名字也是可以的
/*
function *gen2() {
  yield 1;
  yield 2;
  return 3;
}
*/

// 以下是Generator作为属性时的写法
const obj = {
  a: function* () {
    yield 1;
    yield 2;
    return 3;
  },
};

const obj2 = {
  *b() {
    yield 1;
    yield 2;
    return 3;
  },
};
```

`Generator`执行结果会得到一个`Iterator`的实例，我们通过不断的调用这个迭代器的`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止。换言之，`Generator`函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

如何判断一个函数是`Generator`还是普通函数呢？

```js
const isGenerator = (func) => {
  return func && func[Symbol.toStringTag] === "GeneratorFunction";
};
```

### 2、yield 表达式

由于`Generator`函数返回的遍历器对象，只有调用`next`方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield`表达式就是暂停标志。

`yield`表达式后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行，因此等于为`JavaScript`提供了手动的“惰性求值”的语法功能。

`yield`表达式与`return`语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）`return`语句。

`Generator`函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数。当执行这个函数得到一个迭代器，只有调用这个迭代器的`next`之后才会执行。

为什么会是这样呢？因为`babel`编译的时候，把`Generator`第一个`yield`之前的代码视为了一个流程。

阮一峰老师的原例如下：

```js
function* f() {
  console.log("执行了！");
}

var generator = f();

setTimeout(function () {
  generator.next();
}, 2000);
```

被`babel`编译之后如下：

```js
var _marked = /*#__PURE__*/ _regeneratorRuntime().mark(f);

function f() {
  return _regeneratorRuntime().wrap(function f$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          console.log("执行了！");
        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var generator = f();
setTimeout(function () {
  generator.next();
}, 2000);
```

所以就可以理解为，一个`Generator`函数有多少个`yield`语句，它创建的迭代器就可以有效的调用`N+1`次`next`方法。

`yield`关键字必须出现在`Generator`函数体内，否则会报错。

### 3、next 函数

`next`函数的入参决定了上一次`yield`表达式的返回值，第一次调用`next`传递参数是无效的（因为第一次调用`next`的上一次没有`yield`表达式）

```js
function* func(b) {
  const next = yield b;
  const next2 = yield next + 3;
  return next2 + 10;
}

const ge = func(22);
// 第一次调用next无法传递参数，因此此刻得到{ value: 22, done: false }
ge.next();
// next得到上一次yield表达式的返回值，因此此刻得到{value: 36, done: false}
ge.next(33);
// next2得到上一次yield表达式的返回值，因此此刻得到的{value: 340, done: true}
ge.next(330);
```

### 4、for-of 循环

`for-of`可以遍历`Iterator`，那么`Generator`的执行结果为一个`Iterator`的实例，那当然就可以用`for-of`遍历了。
需要注意的是，`for-of`一旦**遇到 `{ value: xxx, done: true }` 就停止了，并且不包括这个值**。

```js
const arr = [1, 2, 3, 4, 5];
const ite = arr[Symbol.iterator]();
// {value: 1, done: false}
ite.next();
// {value: 2, done: false}
ite.next();
// {value: 3, done: false}
ite.next();
// {value: 4, done: false}
ite.next();
// {value: 5, done: false}
ite.next();
// {value: undefined, done: true}
ite.next();
```

因此，对于下面的代码，并不会输出`return`表达式的值

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  // 1,2,3,4,5
  console.log(v);
}
```

### 5、yeild\*表达式

如果在`Generator`函数内部，调用另一个`Generator`函数。需要在前者的函数体内部，自己手动完成遍历。

`ES6` 提供了`yield*`表达式，作为解决办法，用来在一个`Generator`函数里面执行另一个`Generator`函数。

```js
function* foo() {
  yield "a";
  yield "b";
  return 1000;
}

function* bar() {
  yield "x";
  // 手动遍历 foo()
  for (let i of foo()) {
    console.log(i);
  }
  yield "y";
}

// 等价于
function* bar() {
  yield "x";
  // 手动遍历 foo()
  const b = yield* foo();
  console.log(b);
  yield "y";
}
// 等价于
function* bar() {
  yield "x";
  yield "a";
  yield "b";
  yield "y";
}
```

需要注意的是，由于`for-of`循环不会包含`Generator`函数的`return`值，所以实际上相当于在这期间又插入了`N`个`yield`表达式，需要注意的是，`yield*`表达式跟我们传递的`next`方法的入参没有任何关系，而是上一个函数的返回值，上述代码中`yield* foo()`的值为`1000`，这个结论怎么来的呢，我们看一下上述代码经过`babel`转码的结果。

以下代码需要注意的是` b = _context2.t0;`，这是从当前 Generator 的上下文读取内部`Generator`设置的返回值。

```js
var _marked = /*#__PURE__*/ _regeneratorRuntime().mark(foo),
  _marked2 = /*#__PURE__*/ _regeneratorRuntime().mark(bar);

function foo() {
  return _regeneratorRuntime().wrap(function foo$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return "a";

        case 2:
          _context.next = 4;
          return "b";

        case 4:
          return _context.abrupt("return", 1000);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
} // 等价于

function bar() {
  var b;
  return _regeneratorRuntime().wrap(function bar$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          _context2.next = 2;
          return "x";

        case 2:
          return _context2.delegateYield(foo(), "t0", 3);

        case 3:
          b = _context2.t0;
          console.log(b);
          _context2.next = 7;
          return "y";

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
```

源码在**384**行将内部`Generator`的返回值，设置到外层`Generator`的`Context`上，然后做了一些清理工作，然后将流程流转到下一个过程，所以在`Context`就可以拿到内部`Generator`的返回值了。如果觉得不太清楚的同学可以尝试断点看一下程序的执行过程即可。

### 6、Generator 运行原理分析

`Generator`通过`babel`编译之后，底层引入的是一个名叫`generator-runtime`的库，这个库来源于`Facebook`。

对于以下代码：

```js
function* func() {
  const b = yield 1;
  yield 2 + b;
  if (typeof globalThis !== "window") {
    throw `this environment is not in browser`;
  }
  return 3;
}

const gen = func();
gen.next(10);
gen.next(12);
gen.next();
```

通过`babel`编译之后的结果如下：

```js
var _marked = /*#__PURE__*/ _regeneratorRuntime().mark(func);

function func() {
  var b;
  return _regeneratorRuntime().wrap(function func$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          b = _context.sent;
          _context.next = 5;
          return 2 + b;

        case 5:
          if (!(typeof globalThis !== "window")) {
            _context.next = 7;
            break;
          }

          throw "this environment is not in browser";

        case 7:
          return _context.abrupt("return", 3);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var gen = func();
gen.next(10);
gen.next(12);
gen.next();
```

其中，上述代码引用的`_regeneratorRuntime`函数就是引入的`generator-runtime`库的实例对象。（`babel`是将其打到了编译的结果中，为了篇幅，上述代码进行了删减）

`generator-runtime`在`github`的[地址](https://github1s.com/facebook/regenerator/blob/main/packages/runtime/runtime.js)，读源代码要方便一些。（后文提到的代码行数均以这个源码文件为准）

上述代码，我们用到了其提供的两个方法，一个是`wrap`，一个是`mark`。

`mark`函数在 **139** 行。

```js
exports.mark = function (genFun) {
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
  } else {
    genFun.__proto__ = GeneratorFunctionPrototype;
    define(genFun, toStringTagSymbol, "GeneratorFunction");
  }
  genFun.prototype = Object.create(Gp);
  return genFun;
};
```

在读源码的时候，我们就不要考虑那么多`polyfill`的操作了，直接假设当前环境有`Object.setPrototypeOf`方法（后续也将按着这个思路分析），所以`mark`函数仅仅做了一个很简单的事儿，把我们写的普通函数变成`Generator`的实例，能够识别与普通函数的区别。

在**121**行定义了一个`defineIteratorMethods`方法，这个方法使得所有的`Generator`实例都拥有`next`，`return`，`throw`方法。

```js
// Helper for defining the .next, .throw, and .return methods of the
// Iterator interface in terms of a single ._invoke method.
function defineIteratorMethods(prototype) {
  ["next", "throw", "return"].forEach(function (method) {
    define(prototype, method, function (arg) {
      return this._invoke(method, arg);
    });
  });
}
// 在225行将Generator挂载上述方法集。
```

`wrap`函数在**38**行开始，这个方法是`Generator`的核心，比较复杂，我们根据其调用的函数分析。

```js
function wrap(innerFn, outerFn, self, tryLocsList) {
  // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
  var protoGenerator =
    outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
  var generator = Object.create(protoGenerator.prototype);
  var context = new Context(tryLocsList || []);

  // The ._invoke method unifies the implementations of the .next,
  // .throw, and .return methods.
  defineProperty(generator, "_invoke", {
    value: makeInvokeMethod(innerFn, self, context),
  });

  return generator;
}
```

在我们编写的函数调用`wrap`函数时，明显的看的出来`outerFn`是`Generator`的实例，就是为了保证原型必须是`Generator`。这里面引入了一个`Context`类，然后在`Generator`的实例上挂载了一个叫做`_invoke`的方法，返回了这个`Generator`的实例。

难点就是`Context`和`makeInvokeMethod`。

那首先，我们分析`Context`类吧。

`Context`的声明在**452**行，关键的定义在**529**行。这里面我们需要知道的是`Context`用于流程控制，其中很大一部分代码跟`Generator`函数中的`try-catch`语句有关，y 也有一部分跟`Generator`函数的嵌套执行有关，不理解他们并不妨碍我们理解其运行原理，因此本文不详细分析。通读其源码，可以知道`Context`用于控制函数运行流程的流转（里面有个重要的变量`ContinueSentinel`）。

在`babel`编译之后的`wrap`方法里面，`_context`就是`Context`类的实例，从接下来要讨论的`makeInvokeMethod`方法就可以看出来。

在第**249**行是`makeInvokeMethod`的定义

```js
/* 这部分代码是为了方便读者理解，将其贴到此处 */
// fn就是wrap方法的innerFn，执行它得到结果，返回给调用者
function tryCatch(fn, obj, arg) {
  try {
    return { type: "normal", arg: fn.call(obj, arg) };
  } catch (err) {
    return { type: "throw", arg: err };
  }
}
// 以下是 generator 每次调用next、throw、return的流转过程。
function makeInvokeMethod(innerFn, self, context) {
  var state = GenStateSuspendedStart;

  return function invoke(method, arg) {
    if (state === GenStateExecuting) {
      throw new Error("Generator is already running");
    }
    // 如果迭代器已经遍历完成的话，直接返回{ value: undefined, done: true }
    if (state === GenStateCompleted) {
      if (method === "throw") {
        throw arg;
      }

      // Be forgiving, per 25.3.3.3.3 of the spec:
      // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
      return doneResult();
    }
    // 设置当前的操作以及参数到状态上下文上，以知道后续的流转逻辑。
    context.method = method;
    context.arg = arg;

    while (true) {
      // 与Generator函数内嵌yield*表达式相关的逻辑，可以不用具体关注
      var delegate = context.delegate;
      if (delegate) {
        var delegateResult = maybeInvokeDelegate(delegate, context);
        if (delegateResult) {
          if (delegateResult === ContinueSentinel) continue;
          return delegateResult;
        }
      }
      // 把next方法传递的参数设置到Context上去，为的是能够通过next参数的入参控制yield语句的返回值。
      if (context.method === "next") {
        // Setting context._sent for legacy support of Babel's
        // function.sent implementation.
        context.sent = context._sent = context.arg;
      } else if (context.method === "throw") {
        // 如果Generator返回的迭代器还没有调用过一次next方法，直接对外抛出错误
        if (state === GenStateSuspendedStart) {
          state = GenStateCompleted;
          throw context.arg;
        }
        // 否则，交给context去处理异常
        context.dispatchException(context.arg);
      } else if (context.method === "return") {
        // 迭代器执行完成，并且返回执行结果
        context.abrupt("return", context.arg);
      }
      // 将Generator的状态变成执行中
      state = GenStateExecuting;
      // 拿到上一步流程的执行结果，根据类别进行相应的处理。
      var record = tryCatch(innerFn, self, context);
      if (record.type === "normal") {
        // If an exception is thrown from innerFn, we leave state ===
        // GenStateExecuting and loop back for another invocation.
        state = context.done ? GenStateCompleted : GenStateSuspendedYield;
        // 如果遇到了哨兵对象，流转Generator的状态
        if (record.arg === ContinueSentinel) {
          continue;
        }

        return {
          value: record.arg,
          done: context.done,
        };
      } else if (record.type === "throw") {
        // 此处case是Generator函数顶层没有被try-catch包裹的代码出现问题，直接可以结束Generator了，如果是被try-catch编译过的代码，babel编译生成wrap函数的入参时候就会为其分配后续的流程。
        state = GenStateCompleted;
        // Dispatch the exception by looping back around to the
        // context.dispatchException(context.arg) call above.
        context.method = "throw";
        context.arg = record.arg;
      }
    }
  };
}
```

在源文件的第**299**行，就是在执行`wrap`的第一个参数`innerFn`，在`tryCatch`执行的时候，形参`arg`就是`Context`的实例。

在上述方法中可以看到，如果`Generator`生成的迭代器已经迭代完成，将会永远返回`{value: undefined, done: true }`，怎么证明这个结论呢？来源于源码的**257**行，`Generator`在`return`的时候就已经被设置成完成状态了，因此永远返回`{value: undefined, done: true }`;

在调用`next`方法的时候，如果用户有传递参数，可以将其保存在`context`对象上，下次流转的时候首先获取这个值，这就是`next`方法传递的参数能够作为`yield`语句的返回值的实现，因此当我们调用或者触发`Generator`的`next`或者`throw`或者`return`的时候，是一直在把`Generator`内部的`Iterator`向后迭代，并切换状态，这样下一次调用`next`方法的时候就知道了需要流转的逻辑。

另外，虽然看到`babel`编译的结果是套在`while`循环的，但是这并不会造成死循环，因为`return`语句可以将其打断，而这样实现的理由是为了让`Generator`反复不断的流转（可以无限的调用`next`方法），其次，我们`yield`表达式的结果并不一定存在于`wrap`函数的`switch-case`语句中，而是取决于`makeInvokeMethod`的返回值，因此，如果实际开发中我们的业务代码遇到问题，需要关注的代码并不一定是`wrap`函数的内容了。

在理解了`Generator`之后，我们还有一个非常重要的知识点需要积累，像`Generator`这种语法在使用`babel`编译的时候，它并不是元语法（我个人发明的词汇，即这个语法不能再被`babel`转换为其它语法），所以在使用`Tree-shaking`的时候，它并不能按我们预期的想法工作，比如如下代码：

```js
function* func() {
  yield 1;
  yield 2;
  yield 3;
  if (process.env.NODE_ENV !== "production") {
    yield 1000;
  }
  yield 4;
  return 5;
}
```

转换之后：

```js
function func() {
  return _regeneratorRuntime().wrap(function func$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          _context.next = 4;
          return 2;

        case 4:
          _context.next = 6;
          return 3;

        case 6:
          if (!(process.env.NODE_ENV !== "production")) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return 1000;

        case 9:
          _context.next = 11;
          return 4;

        case 11:
          return _context.abrupt("return", 5);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```

结语：可以看到，`generator-runtime`的实现是典型的**状态模式**应用场景。
