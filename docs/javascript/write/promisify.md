## promisify

`promisify`是回调函数和`Promise`之间的桥梁，这个工具函数可以将一个基于异步函数设计的`API`改造成基于`Promise`的`API`，从而避免回调地狱的问题。

但是，能够被`promisify`函数处理的异步`API`必须遵循`Node.js`的异步`API`的设计规范，即：

- 1、异步处理函数的参数最后一个必须是异步完成之后的回调函数
- 2、回调函数的第一个参数是错误信息`err`，如果`err`为`null`，则认为异步任务操作成功，其余参数为回调内容；否则代表此处异步操作失败，`err`为失败的原因。

以`Node.js`的`readFile`为例，正常使用这个方法，大致代码如下：

```js
const path = require("path");
const fs = require("fs");
const fileAbsPath = path.resolve(__dirname, "./README.md");
fs.readFile(fileAbsPath, { encoding: "utf-8" }, function fn(err, content) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(content);
});
```

如果使用`promisify`处理这个函数的话，将会得到以下的调用形式：

```js
const path = require("path");
const fs = require("fs");
const readFile = promisify(fs.readFile);
const fileAbsPath = path.resolve(__dirname, "./README.md");
readFile(fileAbsPath)
  .then((content) => {
    console.log(content);
  })
  .catch((err) => {
    console.log(err);
  });
```

所以，根据以上的调用形式，可以明确几个点：

- `promisify`函数返回的是一个新函数，这个新函数的返回值是一个`Promise`。
- 新函数的入参是原函数入参除了回调函数以外的所有参数。
- 新函数的返回值的`Promise`的`then`方法参数是之前我们写在回调函数的参数，`catch`方法的参数是异步处理过程中产生错误的信息。

有了这几个基本都认知，就可以编写代码了：

```js
/**
 * 将一个基于回调的异步处理操作转化成基于Promise的异步处理操作
 * @param {Function} fn 函数
 */
function promisify(fn) {
  if (typeof fn !== "function") {
    throw new Error("promisify must enhance a function");
  }
  // 返回一个新的函数
  return function promisifyFn() {
    return new Promise((resolve, reject) => {
      const inputArgs = [...arguments];
      // 为原函数绑定参数，并执行
      fn.apply(this, [
        ...inputArgs,
        function asyncTaskCallback() {
          const params = [...arguments];
          const realParams = params.slice(1);
          const err = params[0];
          if (err) {
            reject(err);
          } else {
            resolve(realParams);
          }
        },
      ]);
    });
  };
}
```

如果你现在还看不懂这个函数所处理的内容，可以再仔细阅读我们说到需要明确的第二点。

因为原函数的参数，都是由用户传入的，最后一个回调函数肯定不能用户再传递了，否则又回去了，所以这个回调函数由`promisify`函数部署，并且在这个回调函数里面改变`Promise`的状态，其入参就是异步操作完成之后回调给我们的内容，第一个参数可能是`err`，剩下的是真正的回调内容。

上述操作，`promisify`函数的功能已经大概完成了，但是还有一个点，如果用户想指定`promisifyFn`函数执行上下文还无法支持；另外，`resolve`给调用者的内容，对于只有一个参数的情况，直接把这个参数给调用者，使用起来要方便许多，因此，对上面的实现进行一些改造。

```js
/**
 * 将一个基于回调的异步处理操作转化成基于Promise的异步处理操作
 * @param {Function} fn 函数
 * @param {object} ctx 指定promisifyFn执行的函数上下文
 */
function promisify(fn, ctx) {
  if (typeof fn !== "function") {
    throw new Error("promisify must enhance a function");
  }
  return function promisifyFn() {
    const context = ctx || this;
    return new Promise((resolve, reject) => {
      const inputArgs = [...arguments];
      fn.apply(context, [
        ...inputArgs,
        function asyncTaskCallback() {
          const params = [...arguments];
          const realParams = params.slice(1);
          // 将参数提取出来，以简化调用方的使用
          const resolveParams =
            realParams.length <= 1 ? realParams[0] : realParams;
          const err = params[0];
          if (err) {
            reject(err);
          } else {
            resolve(realParams);
          }
        },
      ]);
    });
  };
}
```
