## `JavaScript`异步技术的发展进程

一直流传着一个说法是`JavaScript`是一门单线程的语言，其实这个说法是不科学的，准确的说是因为我们写的`JS`代码运行在一个浏览器的`JS`执行线程
中。因为受宿主环境的限制，所以`JS`无法像其它语言一样，在主线程上再开启其它的工作线程（本文不讨论`Web Worker`）。

因为浏览器只有一个线程在执行`JS`代码，如何利用这个线程高效的完成各式各样的操作就成了一个复杂的问题。

于是，就有了一个叫做`事件轮循`的处理机制，具体`事件轮循`的做法是这样的，`JS`执行线程会开启一个无限循环，有一个任务队列用来存储任务，每次`JS`执行线程从任务队列里面取出一个任务进行处理，这个任务又有可能将新的`JS`代码包裹成任务加入到任务队列中（比如`setTimeout`），如果任务队列中已经没有任务了，那么`JS`执行线程休眠，待到有新的任务加入到任务队列，`JS`执行线程取消休眠并重新开始工作。随着浏览器越来越复杂，单单一个任务队列已经无法满足需求，于是又多了新的微任务队列，这个微任务队列的优先级比较高，当每个任务完成之后，总是需要将微任务队列里面的所有任务执行完成之后才能继续取出任务队列里面的任务开始执行。

由于`JS`的这套任务处理机制，所以时间的准确性就不能得到保证了，就比如某个任务超级复杂，一直在执行，那么后面等待的任务将会推迟，这就解释了为什么`setTimeout`，`setInterval`这类操作时间执行时机不准的原因（比如`setTimeout`，表示的是告诉`JS`，在多长时间之后将这个任务加到任务队列去）。

之前我们一直在说异步，什么是同步呢？就是除开`setTimeout`，`setInterval`，`Promise.then`, `MutationObserver`，`process.nextTick`这类能够将代码块包装成新的任务或者微任务的代码。

比如：

```js
function demo() {
  let d1 = new Date();
  while (Date.now() - d1.getTime() <= 2000) {}
  console.log("模拟耗时操作完成");
}
```

简言之，**一个任务里面的所有代码和异步任务无关的就是同步代码**。（有点儿听君一席话，如听君一席话的感觉哈）

紧接着，我们还可以看一下这样的代码：

```js
function callFnDemo() {
  console.log("函数调用");
  callFnDemo();
}
```

毫无疑问，这个操作肯定会出现`Uncaught RangeError: Maximum call stack size exceeded at callFnDemo`。为什么呢？因为在一个任务内，`JS`执行栈的长度是有限的，无限的递归调用肯定会出现把栈占用完的情况的。

但是，以下代码并不会出现爆栈的情况

```js
function callTask() {
  console.log("函数调用");
  setTimeout(callTask, 0);
}
```

区别在哪儿？回到最开始我们提到的任务队列相关的知识点，这个操作相当于是无限的在往`JS`执行程任务的队列里面加任务，每做完一个，新的任务又来了，没完没了。

所以，**一个是在无限的往执行栈加内容，一个是无限的在跟任务队列加任务，前者会导致爆栈，后者会导致浏览器一直都在处理任务**。并且，凡是和异步操作相关的`for`、`while`、`递归`这些都不是我们所写的代码那样的运行流程，并且`try-catch`捕获不到这些操作的错误。

:::danger
耗时的同步操作会导致浏览器假死
:::

### 1、回调函数

在解释清楚了`JS`的`事件轮循`之后，再来看回调函数。

某些操作它并不是马上就能够得到结果的，比如给一个元素加上点击事件，而用户什么时候点击，取决于用户的操作。回调函数的方案解决了`JS`中某些操作执行时间不准确的问题（使得用户不再关心什么时间执行了，反正到了那个触发条件它就会执行，别的咱什么都不管，什么也不说）

比如:

```js
function addEventDemo() {
  const divElements = [...document.querySelectorAll("div")];
  divElements.addEventListeners("click", function (ev) {
    console.log(ev, "我被点击了");
  });
}
```

但是，随着应用程序的越来越庞大与复杂，就会出现在回调函数中再套回调函数的场景，尤其是`nodejs`很多`API`都是异步的(`nodejs`异步 API 的设计标准：最后一个参数是回调函数，回调函数的第一个参数是`err`，`null`则代表操作无错，否则代表是操作产生的错误信息)，这种代码的设计对于后期的维护将是一种灾难。

```js
a.on("click", function () {
  b.on("ready", function () {
    c.on("write", function () {
      d.on("send", function () {});
    });
  });
});
```

### 2、`Promise`

本文不做`Promise`的`API`介绍，在这个位置可以看一下我自行实现的所有`Promise`的[方法](https://sicau-hsuyang.github.io/javascript/write/promise.html)，也可以查看阮一峰老师关于`Promise`知识点的[阐述](https://es6.ruanyifeng.com/#docs/promise)。

因为回调函数的问题，`Promise`产生了，`Promise`将嵌套的回调操作打平了成了一个`Promise`链。

比如上述回调地狱的问题，用`Promise`改写，可以写成如下形式：

```js
function optA() {
  return new Promise((resolve, reject) => {
    a.on("click", function () {
      resolve();
    });
  });
}

function optB() {
  return new Promise((resolve, reject) => {
    b.on("ready", function () {
      resolve();
    });
  });
}

function optC() {
  return new Promise((resolve, reject) => {
    c.on("write", function () {
      resolve();
    });
  });
}

function optD() {
  return new Promise((resolve, reject) => {
    d.on("send", function () {
      resolve();
    });
  });
}

optA()
  .then(() => {
    return optB();
  })
  .then(() => {
    return optC();
  })
  .then(() => {
    return optD();
  })
  .then(() => {
    // do something
  });
```

谁要是能够用`Promise`把代码写成如下形式，我恳请您早点儿转行

```js
optA().then(() => {
  optB().then(() => {
    optC().then(() => {
      optD().then(() => {
        // do something
      });
    });
  });
});
```

但是`Promise`只解决了一时的问题，它解决不了所有的问题。

`Promise`的包裹，使得我们代码复杂化了，业务开发者并不能专注于其业务本身，多了一堆的`then`包裹。

还有一个问题，就比如，我们想要某个异步操作执行成功之后再执行的操作，只能写到`then`里面去，逻辑上不直观。

不过技术的进步不是一下子就演化成那样子的，这相对于回调函数的编码方式还是算一个很大的进步了。

### 3、`async`函数

因为`Promise`的问题，所以才有了`async`函数的出现，`async`函数中的代码让你在逻辑上看起来跟代码的执行过程接近，没有了`Promise`的包裹，开发者可以聚焦于业务代码。
