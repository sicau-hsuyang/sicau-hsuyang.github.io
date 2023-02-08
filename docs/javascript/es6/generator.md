## Generator

对于绝大多数前端来说，对于`Generator`可能都是一个比较陌生的概念。在实际开发中，由于我们都直接编写基于`async-await`的代码，所以基本上不怎么用它，但是`Generator`却又是一个值得掌握的语法，`async-await`底层也是基于`generator`，大名鼎鼎的`redux-saga`就是使用的`generator`的语法，明白它的运行原理，能够帮住我们快速的在实际开发中定位`bug`。

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

### next 函数

`next`函数的入参决定了`yield`表达式的返回值，第一次调用`next`传递参数是无效的。

## Generator 运行原理分析

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

`Context`的声明在 452 行，关键的定义在 529 行。这里面我们需要知道的是`Context`用于流程控制，其中很大一部分代码跟`Generator`函数中的`try-catch`语句有关，本文不详细分析。通读其源码，可以知道`Context`用于控制函数运行流程的流转。

在`babel`编译之后的`wrap`方法里面，`_context`就是`Context`类的实例，从接下来要讨论的`makeInvokeMethod`方法就可以看出来。

在第**249**行是`makeInvokeMethod`的定义

```js
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

在上述方法中可以看到，如果 Generator 生成的迭代器已经迭代完成，将会永远返回`{value: undefined, done: true }`，在调用`next`方法的时候，如果用户有传递参数，可以将其保存在`context`对象上，下次流转的时候首先获取这个值，这就是`next`方法传递的参数能够作为`yield`语句的返回值的实现，因此当我们调用或者触发`Generator`的`next`或者`throw`或者`return`的时候，是一直在把`Generator`内部的`Iterator`向后迭代，并切换状态，这样下一次调用`next`方法的时候就知道了需要流转的逻辑。

可以看到，`generator-runtime`的实现是典型的状态模式应用场景。
