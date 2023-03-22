## 职责链模式

### 1、基本概念

职责链模式可以说是前端中几乎最常见的设计模式了，但是可能大家并没有注意到这就是职责链模式，像日常开发中的`Promise`链式调用（异步请求神器`axios`的请求或响应拦截器就是基于`Promise链`实现的。），像`Rx.js`.

职责链模式：**使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。将这个对象连成一条链，直到有一个对象处理它为止。**

当客户提交一个请求时，请求是沿着一个业务处理链进行传递。

另外，如果业务代码足够复杂，并且每个`if-else`分支都有大量的逻辑需要处理，此时使用职责链模式对代码进行重构就比较划算了。因为它可以抹平`if-else`分支，从而可以使得代码的业务逻辑看起来比较直观（每个处理节点只关心对应的逻辑，无法处理则向后传递，代码单一化职责），但是如果业务逻辑简单的`if-else`经过这么一个大动干戈的重构，有点儿得不偿失。

职责链模式的`UML`图如下所示：

<div align="center">
  <img :src="$withBase('/design-pattern/responsibility-chain-pattern.png')" alt="职责链模式" />
</div>

其含义是：具体的业务逻辑处理节点实现接口，每个业务逻辑节点有一个后继节点，在当前节点处理完成之后（或不能处理），委托给它的后继节点处理。

如果**职责链构建的太长，那处理效率必然会下降**，在实际开发中，我们需要注意取舍。

### 2、代码范式

```ts
abstract class Component {
  successor?: Component;

  setSuccessor(next: Component) {
    this.successor = next;
  }

  abstract exec(target: Map<string, string>): void;
}

class ComputerComponent extends Component {
  exec(target: Map<string, string>): void {
    target.set("computer", "Windows 98");
    console.log("计算机行业处理");
    this.successor?.exec(target);
  }
}

class FinanceComponent extends Component {
  exec(target: Map<string, string>): void {
    target.set("finance", "招商银行600036");
    console.log("金融行业处理");
    this.successor?.exec(target);
  }
}

class MedicalComponent extends Component {
  exec(target: Map<string, string>): void {
    target.set("medical", "APTX 4869");
    console.log("医药行业处理");
    this.successor?.exec(target);
  }
}

class AgricultureComponent extends Component {
  exec(target: Map<string, string>): void {
    target.set("agriculture", "杂交水稻");
    console.log("农业行业处理");
    this.successor?.exec(target);
  }
}

class Invoker {
  chian: Component;

  constructor(component: Component) {
    this.chian = component;
  }

  doWork() {
    const map = new Map();
    this.chian.exec(map);
    console.log(map);
  }
}

const computer = new ComputerComponent();
const finance = new FinanceComponent();
const medical = new MedicalComponent();
const agriculture = new AgricultureComponent();

computer.setSuccessor(finance);
finance.setSuccessor(medical);
medical.setSuccessor(agriculture);

const invoker = new Invoker(computer);

invoker.doWork();
```

每个处理节点可以根据自己的业务需求选择处理当前任务再将其委托给下一个处理节点，也可以根据业务直接忽略当前处理委托给一下处理节点（示例是需要处理的方式）

### 3、在前端开发中的实践

在前端中，我们可能每天都在使用`Promise`，如果你研究过`Promise`，你会发现，`Promise`就是基于职责链模式设计的，而我们给`then`方法中部署回调函数则就是每个职责节点的处理器，因为`then`方法返回一个新的`Promise`可以为其委托新的业务处理节点。

`axios`的拦截器管道就是基于`Promise`进行设计的，具体源码节选如下：

```js
// 文件位置: axios>lib>core>Axios.js 版本——>0.21.1
// 以省略无关代码
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  // 注册两个拦截器的管理器
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}

Axios.prototype.request = function request(config) {
  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  // 处理请求拦截器
  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor
  ) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  // 处理响应拦截器
  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor
  ) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  // 部署一个Promise链，类似链表的头插法操作，像多米罗骨牌那样的链式反应，是反向部署的
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  // 返回最开头的那个Promise给外界，到时候就可以起到导火索的作用
  return promise;
};
```

但是`Promise`构建的职责链有一个缺点，就是一旦部署好了，就不再从中删除或增加节点，并且`Promise`链就像鞭炮一样，如果你将其点燃了（因为`Promise`的状态只会从`pending`到`resolved`或`rejected`），它就会从头到尾噼里啪啦的炸到结束，关键就是炸到结束这串鞭炮就没了，我想再点一串，就得从新再买一串鞭炮。

比如：

```js
let trigger = null;

function demo() {
  return new Promise((resolve) => {
    trigger = resolve;
  });
}

const d = demo();

d.then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
});

trigger(); // 只会触发一次输出1， 2
trigger();
trigger();
```

在有些时候，如果业务处理链可能有变动的时候，用`Promise`可能就不太符合我们的需求了，这个时候，真的就要自己写一下职责链模式的范式了。

实现方式和`装饰模式`的`AOP`范式几乎差不多，根据返回结果决定是否将业务逻辑抛给下一个处理节点。

```js
Function.prototype.after = function (fn) {
  let self = this;
  return function () {
    let ret = self.apply(this, arguments);
    // 根据上一个职责处理的返回决定是否将其向后抛
    if (ret === "nextSuccessor") {
      return fn.apply(this, arguments);
    }
    return ret;
  };
};
```

基于`AOP`实现模拟的一个业务场景：

```js
function Computer() {
  console.log("计算机行业处理");
  return "nextSuccessor";
}

function Finance() {
  console.log("金融行业处理");
  return "nextSuccessor";
}

function Medical() {
  console.log("医药行业处理");
  return "nextSuccessor";
}

function Agriculture() {
  console.log("农业行业处理");
}
// 构建职责链
let chain = Computer.after(Finance).after(Medical).after(Agriculture);
chain();
```

上述这个职责链可以触发多次，不存在像`Promise`链那样的问题，而且可以随时应对业务的修改。

所以实际开发中可以根据自己的需求选择是直接使用`Promise`链还是自己实现职责链模式。
