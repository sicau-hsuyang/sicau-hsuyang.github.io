## 状态模式

### 1、基本概念

状态模式：当一个对象内在的状态改变时允许改变其行为，这个对象看起来像是改变了其类。

状态模式主要解决的是当控制一个对象状态转换的条件表达式过于复杂时的情况。把状态的判断逻辑转移到了表示不同状态的一系列类当中，可以把复杂的逻辑简单化。

以下是状态模式的`UML`图：

<div align="center">
  <img :src="$withBase('/design-pattern/state-pattern.png')" alt="状态模式" />
</div>

### 2、代码示例

定义一个抽象类`State`表示状态。

```ts
abstract class State {
  /**
   * 当前状态的名称
   */
  abstract stateName: string;
  /**
   * 在当前状态上处理的业务逻辑，将Context传递给当前业务状态，使之可以改变Context的状态
   */
  public abstract handler(ctx: Context): void;
}
```

定义一些具象化的业务类，继承`State`，负责各自的业务逻辑。

```ts
/**
 * 起床业务类
 */
class GetUpState extends State {
  stateName: string = "起床状态";

  public handler(ctx: Context): void {
    console.log("起床啦~~~~~~~~~~~");
    ctx.setState(new EatState());
  }
}

/**
 * 吃饭类
 */
class EatState extends State {
  stateName: string = "吃饭状态";

  public handler(ctx: Context): void {
    console.log("吃饭啦~~~~~~~~~~~");
    ctx.setState(new WorkState());
  }
}

/**
 * 工作类
 */
class WorkState extends State {
  stateName: string = "工作状态";

  public handler(ctx: Context): void {
    console.log("工作啦~~~~~~~~~~~~~");
    ctx.setState(new SleepState());
  }
}
/**
 * 睡觉类
 */
class SleepState extends State {
  stateName: string = "睡觉状态";

  public handler(ctx: Context): void {
    console.log("睡觉啦~~~~~~~~~~~~~~");
  }
}
```

定义一个上下文`Context`类，其类中的行为由当前持有的业务逻辑状态子类决定。

```ts
/**
 * 上下文类
 */
class Context {
  private _state: State;

  get state(): State {
    return this._state;
  }

  private set state(nextState: State) {
    console.log(
      `当前状态：${this._state.stateName}, 下一个状态：${nextState.stateName}`
    );
    this._state = nextState;
  }

  constructor(initState: State) {
    this._state = initState;
  }

  /**
   * 改变Context的行为
   */
  setState(state: State) {
    this.state = state;
  }
  /**
   * 触发当前上下文状态的业务行为
   */
  request() {
    this.state.handler(this);
  }
}
```

调用方：

```ts
function bootstrap() {
  const ctx = new Context(new GetUpState());
  // 起床啦~~~~~~~~~~~
  // 当前状态：起床状态, 下一个状态：吃饭状态
  ctx.request();
  // 吃饭啦~~~~~~~~~~~
  // 当前状态：吃饭状态, 下一个状态：工作状态
  ctx.request();
  // 工作啦~~~~~~~~~~~~~
  // 当前状态：工作状态, 下一个状态：睡觉状态
  ctx.request();
  // 睡觉啦~~~~~~~~~~~~~~
  ctx.request();
  // 睡觉啦~~~~~~~~~~~~~~
  ctx.request();
}
```

### 3、前端开发中的实践

其实我们每天都在使用这个东西，如果你还不知道，那说明你对`async-await`函数的理解度还是相当欠缺的（如果`2023`年了，你还没有使用过`async-await`函数的话，那请你赶紧补补吧~）。

以下是我模拟的一段业务代码：

```js
async function func() {
  const val1 = await 1;
  const val2 = await (2 + val1);
  const val3 = await (3 + val2);
  const val4 = await (4 + val3);
  return val4;
}
```

这段代码，会被`babel`编译成以下代码：

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

如果你对`Generator函数`还不太清楚的话，请先移步`Generator函数`的介绍，否则后文的阐述，您将无法理解。

在这一节，我们把注意力放在`_regeneratorRuntime().mark(...)`这个位置，此刻的回调函数，其中的`_context`参数正是我们`状态模式`的这个`Context`类。

首先`Generator函数`执行得到一个迭代器，我们每次调用迭代器的`next`，这个回调函数都知道去修改`Context`的状态，只不过上面的业务实现类被其写成了`switch-case`(不要怪`babel`编译的代码违背了什么开闭原则，`babel`不是在写业务，它是不知道你的业务逻辑的，它只能根据`Generator函数`的`yield语句`得到这样的分支流程，不可能为你去生成那一系列的业务实现类)，因此，我们每次调用迭代器，其行为就不一样（体现在你执行的不同的异步逻辑）
