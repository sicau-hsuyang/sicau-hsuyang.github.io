## Nodejs 中常见的工具方法

### util

util 模块中的工具方法虽然多，但是实际开发中最常见的方法就是`promisify`，使用它，可以把 Node 提供的基于回调函数的原生方法转为基于`Promise`的方法。

使用这个方法是有条件的，原函数的规格必须是这样的：

参数列表，可以有 0 个，也可以有很多个，最后一个必须是回调函数，回调函数的第一个参数是错误信息，如果为`null`，说明在执行的过程中没有错误产生，正常执行完成。

以下是一个示例：

```js
const { promisify } = require("util");
const { stat } = require("fs");

const stat = promisify(stat);
stat(".")
  .then((stats) => {
    // Do something with `stats`
  })
  .catch((error) => {
    // Handle the error.
  });
```

### path

#### resolve

#### basename

#### extname

#### join

### fs

### 网络
