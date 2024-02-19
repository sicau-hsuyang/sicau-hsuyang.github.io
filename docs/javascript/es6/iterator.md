## 迭代器

在阐述这篇文章之前，首先看一道比较经典的面试题，可能看过之后大家将会为什么技术积累有多么的重要了。（在阅读本文之前，请确保你已经完全掌握`Symbol`的相关知识点。）

为了使得下面的代码按预期运行，请问在右侧的对象上需要进行什么操作？

```js
const [a, b] = { a: 1, b: 2 };
```

既然这题放在`Iterator`这一节，那么肯定是跟`Iterator`的知识点相关了，如果你一时半会儿还没有任何思路的话，请先接着往下面看，然后你心中自然就会有答案了。

### 1、基本概念

遍历器（`Iterator`），它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署`Iterator`接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

在`ES6`之前只有`数组`和`对象`这两种表示`集合`的数据结构，但是`ES6`增加了很多的数据结构(如`Map`，`Set`)，因此`Iterator`的出现可以使得这些数据结构的遍历有一套标准的方法，`ES6`创造了一种新的遍历命令`for...of`循环，`Iterator`接口主要供`for...of`消费。

遍历器接口（`Iterable`）、指针对象（`Iterator`）和`next`方法返回值的规格可以描述如下。

```ts
interface Iterable {
  [Symbol.iterator](): Iterator;
}

interface Iterator {
  next(value?: any): IterationResult;
}

interface IterationResult {
  value: any;
  done: boolean;
}
```

原生具备`Iterator`接口的数据结构如下。

- `Array`
- `Map`
- `Set`
- `String`
- `TypedArray`
- 函数的`arguments`对象
- `NodeList`对象

也就是说，这些数据结构天生支持`for-of`遍历，并且我们可以拿上述这些数据结构自带的`Iterator`进行迭代:

```js
// 手动调用String的Iterator
const str = "hello world";
// 得到string的Iterator
const it = str[Symbol.iterator]();
it.next();
// {value: 'h', done: false}
it.next();
// {value: 'e', done: false}
it.next();
// {value: 'l', done: false}
it.next();
// {value: 'l', done: false}
it.next();
// {value: 'o', done: false}
it.next();
// {value: ' ', done: false}
it.next();
// {value: 'w', done: false}
it.next();
// {value: 'o', done: false}
it.next();
// {value: 'r', done: false}
it.next();
// {value: 'l', done: false}
it.next();
// {value: 'd', done: false}
it.next();
// {value: undefined, done: true}
```

```js
const str = "hello world";
for (const char of str) {
  console.log(char);
}
```

可以看到，如果我们自己去调用`String`的`Iterator`的话，最后会输出一个`{value: undefined, done: true}`的结果，可是为什么`for-of`循环没有输出这个结果呢？

:::warning
这儿有一个重要的结论：`for-of`循环只会遍历迭代器`done`的值为`false`的结果
:::

所以，如果用`for-of`循环遍历`Generator`生成的迭代器的话，无法处理到最后`Generator`函数的`return`值的(若有)。

另外，还有个易错点，就是有些同学初学时可能会犯这样的错误，为什么我已经明明按照规格定义了，但是采用`for-of`循环的时候却说这个结果不是可迭代的对象呢？

```js
/**
 * 创建一个迭代器
 * @param {number[]} values
 * @returns
 */
function createIterator(values) {
  let idx = 0;
  return {
    next() {
      return {
        value: values[idx++],
        done: idx > values.length,
      };
    },
  };
}

for (const num of createIterator([1, 2, 3, 4, 5, 6])) {
  console.log(num);
}
```

代码运行时却得到了这样的一个错误：

```text
createIterator is not a function or its return value is not iterable
```

其实你这个情况就是典型的自我感动，因为你知道它是一个迭代器，但是系统并不知道它是一个迭代器。

所以仅仅需要为其添加简单的一行代码即可：

```js
/**
 * 创建一个迭代器
 * @param {number[]} values
 * @returns
 */
function createIterator(values) {
  let idx = 0;
  return {
    // 需要明确的告知系统，迭代时，就调用我自己就好
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return {
        value: values[idx++],
        done: idx > values.length,
      };
    },
  };
}

for (const num of createIterator([1, 2, 3, 4, 5, 6])) {
  console.log(num);
}
```

### 2、调用 Iterator 的场合

如果你认真的阅读完本节，就可以回答本文开头提到的面试题了。

除了`for-of`循环，主要在这几类场合会默认调用`Iterator`

- **解构赋值**: 对数组和`Set`结构进行解构赋值时，会默认调用`Symbol.iterator`方法。
- **扩展运算符**: 扩展运算符`...`也会调用默认的 `Iterator` 接口。
- `yield*`: `yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

```js
let generator = function* () {
  yield 1;
  yield* [2, 3, 4];
  yield 5;
};

var iterator = generator();

iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: 4, done: false }
iterator.next(); // { value: 5, done: false }
iterator.next(); // { value: undefined, done: true }
```

- 其它场合:
- `for...of`
- `Array.from()`
- `Map()`, `Set()`, `WeakMap()`, `WeakSet()`（比如 new Map([['a',1],['b',2]])）
- `Promise.all()`
- `Promise.race()`

因此，对于我们在文章开头提到的那题，我们只能从`解构赋值`的场景去思考，把右侧的内容当成一个数组，但是因为对象并不原生具备`Iterator`，因此，我们就可以给他补一个`Iterator`就可以使得代码正常运行了。

```js
const [a, b] = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    const keys = Object.keys(this);
    let idx = 0;
    const _this = this;
    return {
      next() {
        const i = idx++;
        return {
          value: _this[keys[i]],
          done: i >= keys.length,
        };
      },
    };
  },
};
```

需要注意的是，因为这种解构方式并不是原生支持的方式，有可能键取值顺序的关系，`a`和`b`变量并不是一定拿到的就是 `1` 和 `2`，仅仅是这行代码能够正常工作而已（**对象（`Object`）之所以没有默认部署`Iterator`接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定**）。

### 3、遍历器对象的 return 方法和 throw 方法

遍历器对象除了具有`next`方法，还可以具有`return`方法和`throw`方法。如果你自己写遍历器对象生成函数，那么`next`方法是必须的，`return`方法和 `throw`方法是可选的。

`return`是一个无参数或者接受一个参数的函数，并返回符合`IteratorResult`接口的对象，其参数`value`通常等价于传递的`value`，并且`done`等于`true`。调用这个方法表明迭代器的调用者不打算调用更多的`next`方法，并且可以进行清理工作。

`throw`方法无参数或者接受一个参数的函数，并返回符合`IteratorResult`接口的对象，通常`done`等于`true`。调用这个方法表明迭代器的调用者监测到错误的状况，并且其参数`exception`通常是一个`Error`实例。

其`TS`定义可以参考如下代码：

```ts
interface Iterator<T, TReturn = any, TNext = undefined> {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}
```

## 异步迭代器

### 1、基本概念

上述代码都要求我们的代码是同步代码，即调用`next`函数时其必须立即返回结果。但实际上有些场景下肯定是存在异步情况的(设计模式有个模式叫做迭代器模式，而我们在实际的开发中需要将一些异步操作统一规格进行操作)。

`ES2018`引入了一个异步迭代器的概念，即同步迭代器返回结果是`{ value: any; done: boolean }`，异步迭代器的返回结果是`Promise<{value: any; done: boolean}>`

```js
/**
 * 创建一个异步迭代器
 * @param {number[]} values
 * @returns
 */
function createAsyncIterator(values) {
  let idx = 0;
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return new Promise((resolve) => {
        resolve({
          value: values[idx++],
          done: idx > values.length,
        });
      });
    },
  };
}
```

上述这个代码得到的迭代器，如果自己实现数据结构遍历其实还是不太容易的。因为程序的执行流程是异步的，循环遍历只能处理同步代码，是达不到我们想要的效果的。

如果有看到过`async`函数的`spawn`函数实现过程的小伙伴肯定脑袋中一下子就会有解决方案：**递归**。

以下是我自己写的一个异步迭代器的遍历器：

```js
/**
 * 异步迭代器遍历器
 * @param {AsyncIterator} it 异步迭代器
 */
function run(it) {
  if (!it || typeof it[Symbol.asyncIterator] !== "function") {
    console.log("the parameter must be an asynchronous iterator");
    return;
  }
  it.next().then(({ value, done }) => {
    if (!done) {
      run(it);
    }
    console.log(value);
  });
}
```

于是`ES6`又提供了一个新语法: `for await...of`，除了多了一个`await`关键字以外，它消费的接口是`Symbol.asyncIterator`，其他技术特征跟`for-of`没有什么区别。

**for await...of 同样可以用于同步迭代器**（其实也很好解释，采用`Promise.resolve()`将一个不是`Promise`的值包裹成一个`Promise`，规格就保持一致了嘛）

因为加上了`await`关键字，所有函数最外层就要套上`async`关键字（本文不考虑顶层`await`关键字语法），使用`for await-of`遍历这个异步迭代器，可以将代码书写成如下：

```js
const it = createAsyncIterator([1, 2, 3, 4, 5, 6]);
(async function run() {
  // 多了一个await关键字
  for await (const num of it) {
    console.log(num);
  }
})();
```

代码真的是简洁了不少。

`for await...of`会等待前一个异步任务完成之后才会继续向后迭代，这个，我们可以在后面用一个异步`Generator`函数的例子得到证明。

但是：

:::warning
异步迭代器的`next`方法是可以一直调用的，并不需要等待先前的异步操作完成
:::

其实这个语法特点也比较好理解，我们先调`next`函数相当于是在部署异步链，但是异步任务什么时候执行到这个位置，这就不得而知了。

用一个简单的例子来理解这个事儿，就比如湖南浏阳的烟花爆竹全国出名，他们在制作花炮时，首先将其一个一个的爆竹绑在一条预设的引线上，而这个引线什么时候点，就取决于最终花炮的所有者，当引线烧到了爆竹的位置，爆竹就爆炸了。

这个例子中，将爆竹绑在引线上，其实就好比我们在调用`next`函数，然后爆竹爆炸就是好比我们写在其`Promise`的`then`方法的回调执行了，而引线什么时候点燃，就取决于这个异步链的上游的`Promise`的状态改变。

而你用`for await...of`遍历，就会像是`async`函数内部的运行原理一样，是递归的一步一步的向后迭代的，每一步都需要等待上一步的异步任务完成，才会到下一个异步任务。

### 2、异步`Generator`函数

在`Generator`那节，我们讨论了`Generator`函数的执行结果是一个迭代器，而如果在一个`Generator`函数前加上关键字`async`，那么这个函数就变成了异步`Generator`函数

```js
function* bar() {}
const b = bar();
console.log(b[Symbol.toStringTag]); // Generator
console.log(b[Symbol.iterator]); // ƒ [Symbol.iterator]() { [native code] }

async function* foo() {}
const a = foo();
console.log(a[Symbol.toStringTag]); // AsyncGenerator
console.log(a[Symbol.asyncIterator]); // ƒ [Symbol.asyncIterator]() { [native code] }
console.log(a[Symbol.iterator]); // undefined
```

其实也没有什么大不了的，函数体内部肯定会出现`await`关键字罢了，其它的技术特征跟普通的`Generator`也差不多，不过因为有`await`关键字的加入，所以`await`语句后面的逻辑需要等待异步任务执行完成之后才能执行了。

以下是摘自阮一峰老师网络书籍`《ES6入门》`的一个例子：

```js
async function* readLines(path) {
  let file = await fileOpen(path);
  try {
    while (!file.EOF) {
      yield await file.readLine();
    }
  } finally {
    await file.close();
  }
}
```

另外，我们继续可以用这个代码来验证，异步`Generator`函数里面有一个永远`pending`的`Promise`，执行这个函数运行的结果，发现除了`Promise`构造函数里面的内容输出了，其余啥都没有。

```js
async function* foreverPendingTest() {
  await new Promise(() => {
    console.log("我就是啥都不做");
  });
  yield 1;
  yield 2;
  yield 3;
}

(async function () {
  for await (const val of foreverPendingTest()) {
    console.log(val);
  }
  console.log("异步遍历完成");
})();
```

也就是如果这个迭代器的`next`函数的`then`方法里面部署代码，一个都不会执行。这个例子，就是回答之前我们在异步迭代器开始的时候所提到的。

通过`babel`对`for await-of`的编译结果来看，确实也可以证明其内部的运行原理和`async`是一样的。

```js
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function _asyncIterator(iterable) {
  var method,
    async,
    sync,
    retry = 2;
  for (
    "undefined" != typeof Symbol &&
    ((async = Symbol.asyncIterator), (sync = Symbol.iterator));
    retry--;

  ) {
    if (async && null != (method = iterable[async]))
      return method.call(iterable);
    if (sync && null != (method = iterable[sync]))
      return new AsyncFromSyncIterator(method.call(iterable));
    (async = "@@asyncIterator"), (sync = "@@iterator");
  }
  throw new TypeError("Object is not async iterable");
}

function AsyncFromSyncIterator(s) {
  function AsyncFromSyncIteratorContinuation(r) {
    if (Object(r) !== r)
      return Promise.reject(new TypeError(r + " is not an object."));
    var done = r.done;
    return Promise.resolve(r.value).then(function (value) {
      return { value: value, done: done };
    });
  }
  return (
    (AsyncFromSyncIterator = function AsyncFromSyncIterator(s) {
      (this.s = s), (this.n = s.next);
    }),
    (AsyncFromSyncIterator.prototype = {
      s: null,
      n: null,
      next: function next() {
        return AsyncFromSyncIteratorContinuation(
          this.n.apply(this.s, arguments)
        );
      },
      return: function _return(value) {
        var ret = this.s["return"];
        return void 0 === ret
          ? Promise.resolve({ value: value, done: !0 })
          : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
      },
      throw: function _throw(value) {
        var thr = this.s["return"];
        return void 0 === thr
          ? Promise.reject(value)
          : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
      },
    }),
    new AsyncFromSyncIterator(s)
  );
}

(function () {
  var _run = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
      var _iteratorAbruptCompletion,
        _didIteratorError,
        _iteratorError,
        _iterator,
        _step,
        num;

      return _regeneratorRuntime().wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _iteratorAbruptCompletion = false;
                _didIteratorError = false;
                _context.prev = 2;
                _iterator = _asyncIterator([1, 2, 3]);

              case 4:
                _context.next = 6;
                return _iterator.next();

              case 6:
                if (
                  !(_iteratorAbruptCompletion = !(_step = _context.sent).done)
                ) {
                  _context.next = 12;
                  break;
                }

                num = _step.value;
                console.log(num);

              case 9:
                _iteratorAbruptCompletion = false;
                _context.next = 4;
                break;

              case 12:
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](2);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 18:
                _context.prev = 18;
                _context.prev = 19;

                if (
                  !(_iteratorAbruptCompletion && _iterator["return"] != null)
                ) {
                  _context.next = 23;
                  break;
                }

                _context.next = 23;
                return _iterator["return"]();

              case 23:
                _context.prev = 23;

                if (!_didIteratorError) {
                  _context.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context.finish(23);

              case 27:
                return _context.finish(18);

              case 28:
              case "end":
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [
          [2, 14, 18, 28],
          [19, , 23, 27],
        ]
      );
    })
  );

  function run() {
    return _run.apply(this, arguments);
  }

  return run;
})()();
```

上述代码没有贴`generator-runtime`库的代码。另外，`while`循环中嵌套的`switch-case`可以不用看，因为这个是`generator`函数流转流程的代码，我们只需要把它看做一个状态转化的黑盒就行。

如果上述代码你阅读有困难，可以先查阅我关于[Generator](https://sicau-hsuyang.github.io/javascript/es6/generator.html)和[Async](https://sicau-hsuyang.github.io/javascript/es6/async.html)函数的文章。

重点在`_asyncIterator`函数上，如果一个迭代器不是异步的迭代器，它会尝试将其转化成异步迭代器，那就可以得出一个结论:

**`for await-of`既能遍历同步迭代器也能遍历异步迭代器，而`for-of`只能遍历同步跌代器**。
