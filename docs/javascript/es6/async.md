## async 函数

`JS`是一门单线程的语言，但是`JS`中的异步编程的场景太常见了，`async`函数作为`JS异步编程`解决方案的王炸，对于`async`函数大家都想必都比较熟悉。

而`async`函数是`Generator`的语法糖，但是`Generator`又是`ES6`中最难的语法，本文重点不在于阐述`async`函数的使用，而专注于其底层的运行原理，我们将从`babel`编译的结果来研究`async`函数的原理，希望您在阅读本文之前，已掌握`Generator`底层的运行原理。

### 1、基本使用

`async`函数的返回结果是一个`Promise`，也就是说，不管你包不包装这个对象为`Promise`，它都将给你包装成`Promise`，比如：

```js
async function func() {
  await 1;
  return Promise.resolve(true);
}
```

和以下代码是等价的:

```js
async function func() {
  await 1;
  return true;
}
```

比如，我们可以使用`async`函数实现一个`sleep`函数。

```js
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function eventHandler() {
  // 等待1S，继续后续的业务逻辑
  await sleep(1000);
  console.log("执行一些逻辑");
}
```

`await`后面的代码是`微任务`执行的，而`await`之前的代码是在同步任务执行的(包括这行)。

比如有以下代码：

```js
async function func() {
  console.log(1);
  await something();
  console.log(2);
}
```

等价于:

```js
function func() {
  new Promise(() => {
    console.log(1);
    return something();
  }).then(() => {
    console.log(2);
  });
}
```

下面是一道`JS事件循环`常考的面试题：

```js
//请写出输出内容
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

另外，对于`await`表达式，其实表示的含义就是如果`await`后面跟随的表达式的如果是一个`Promise`的话，则取出`Promise`的值，否则直接取其原值。

### 2、使用的注意点

最好把`await`命令放在`try...catch`代码块中，因为一旦一个`await`表达式发生错误，后续的流程就不会再执行了，这点我们一会儿可以在`babel`编译的结果中看到为什么。

另外一个比较重要的注意点是，多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

比如下述代码：

```js
async function func() {
  let foo = await getFoo();
  let bar = await getBar();
}
```

需要首先执行`getFoo`等`getFoo`变成`fulfilled`之后，才会再执行`getBar`。在有些时候，两个操作流程并没有先后顺序的要求，对于用户而已，更快的数据到达是较好的选择，因此，这种场景下，需要写成以下形式：

```js
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

上述的`写法1`大家可能比较好理解，但是`写法2`可能就会比较迷惑了，这样理解就行了，首先，我们没有通过用`await`关键字来调用`getFoo`和`getBar`，也就是说，在同一时刻，这两个操作就已经执行了，但是，只不过要必须`fooPromise`的状态为`fulfilled`才能执行取`barPromise`状态的逻辑，而实际上两者并没有先后顺序，请读者体会其中的区别。

如何判断一个函数是否是`async`函数呢，其实方法非常简单：

```js
// 方法一
const isAsyncFunc = (val) => {
  return val && val[Symbol.toStringTag] === "AsyncFunction";
};

// 方法二
const isAsyncFunc = (func) => {
  return (
    typeof func === "function" &&
    Object.prototype.toString.call(func) === "[object AsyncFunction]"
  );
};
```

明显感觉方法一要优雅很多，对于这个用法不太清楚的同学可以参考`Symbol`相关的知识点。

### 3、async 函数的实现原理

对于以下代码，我们看看`babel`将会把它编译成什么样子

```js
async function func() {
  const val1 = await 1;
  const val2 = await (2 + val1);
  const val3 = await (3 + val2);
  const val4 = await (4 + val3);
  return val4;
}
```

`babel`编译之后的结果(为了篇幅，已经省略了`generator-runtime`的部分):

```js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    // 如果执行出错，提前结束
    reject(error);
    return;
  }
  // 如果Generator已经迭代完成，直接把最终的返回值报告给外部的Promise，作为它的fulfilled值，结束递归
  if (info.done) {
    resolve(value);
  } else {
    // 没有完成，把本轮的值包裹，最为入参传递给下一个next或者throw的调用
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  // fn就是一个Generator，执行它可以得到一个迭代器
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      // 得到一个由Generator执行得到的迭代器
      var gen = fn.apply(self, args);
      // 定义next函数
      function _next(value) {
        // 递归的调用next，以使得Generator执行得到的迭代器可以一直向后迭代
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      // 定义错误处理函数
      function _throw(err) {
        // 递归的调用throw，以使得Generator执行得到的迭代器可以一直向后迭代
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      // 开始迭代，因为第一个next不能有参数，所以就传递了一个undefined
      _next(undefined);
    });
  };
}

function func() {
  return _func.apply(this, arguments);
}

function _func() {
  _func = _asyncToGenerator(
    // 得到一个Generator，这个Generator执行就可以得到一个迭代器
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
      var val1, val2, val3, val4;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return 1;

            case 2:
              val1 = _context.sent;
              _context.next = 5;
              return 2 + val1;

            case 5:
              val2 = _context.sent;
              _context.next = 8;
              return 3 + val2;

            case 8:
              val3 = _context.sent;
              _context.next = 11;
              return 4 + val3;

            case 11:
              val4 = _context.sent;
              return _context.abrupt("return", val4);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  // 向外界返回一个Promise
  return _func.apply(this, arguments);
}
```

`async`函数的本质是`Generator`，但是`Generator`的使用是相当麻烦的，你得运行它，然后不断的调用`next`直到迭代完成，而`async`函数直接就在内部帮我们把这个事儿做了，你就只需要专注于业务代码就好了。

首先分析`asyncGeneratorStep`这个函数，当所有的`await`语句都走完了之后，返回状态为`fulfilled`结果，如果中途产生错误则提前终止了，这就是为什么前文提到**因为一旦`await`后面的表达式发生错误，后续的流程就不会再执行了**的原因。如果还没有将当前的迭代器迭代完成，则继续向后迭代，为什么是这样的呢？

```js
function _next(value) {
  asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
}
```

因为在这个位置，`_next`函数被用作了参数传递到`asyncGeneratorStep`，这儿是一个递归调用，而递归的退出条件呢？要么执行完，要么出现错误。

然后，可以看到`_asyncToGenerator`这个函数返回值是个匿名函数，并且这个匿名函数的返回值是一个`Promise`，这也就应证了前文所说的，在`async`函数中没有必要刻意的对返回值进行`Promise.resolve`这样的操作。

最后，为什么在第一次调用`_next`函数的时候传递的是`undefined`，因为`Generator`节，我们讲过，其在第一个`next`方法的时候是无法传递参数的。

另外，这个是在`阮一峰`老师`ES6入门`书籍里面他给出的`spawn`函数的实现。

```js
function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v);
          });
        },
        function (e) {
          step(function () {
            return gen.throw(e);
          });
        }
      );
    }
    step(function () {
      return gen.next(undefined);
    });
  });
}
```

上述实现嵌套的层级较多，意思都是一个，但是从可读性来说，我个人感觉不如`babel`编译之后的代码，不喜勿喷。
