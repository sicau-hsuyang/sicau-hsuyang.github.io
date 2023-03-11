## 观察者模式

### 1、基本概念

`观察者模式`（又叫`发布-订阅模式`）定义了一种一对多的依赖关系，让多个观察对象同时监听某一个主题对象，这个主题对象的状态发生变化时，会通知所有观察者对象，是他们能够主动更新自己。

上述是比较官方的话术解释，举个实际生活中的例子：

比如在实际开发中，前端开发的工作需要依赖其他同事，在其他同事完成工作这个期间，我们是无法进行开发的，但是我们又想在这个期间做一些准备工作，但是又不想一会儿又去打扰同事问：好了没有呀？此刻我们就会跟同事交代，你如果开发完成了的话，给我说一下吧。然后同事就会给你说，知道了，我的工作做完我就告诉你，你现在就放心的去干别的吧~。

这个过程中，给同事交代他完成之后要通知我们，这其实就是`订阅`，当同事的工作开发完成之后，他就会告诉我们他的工作已经完成了，这其实就是`发布`。

观察者模式的`UML`图如下：

<div align="center">
  <img :src="$withBase('/design-pattern/watcher-pattern.png')" alt="观察者模式" />
</div>

订阅者需要持有观察者，并且把自己加到（也支持移除）它订阅者中，正是因为这样，观察者模式有一个致命的缺点就是如果订阅者还没有持有观察者，那么观察者就会错过订阅者之前的通知，所以，在有些场景下就对业务代码的执行顺序由要求。

### 2、代码示例

```ts
abstract class Observer {
  abstract update(): void;
}

abstract class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    const idx = this.observers.findIndex((ob) => ob === observer);
    idx >= 0 && this.observers.splice(idx, 1);
  }

  notify() {
    this.observers.forEach((ob) => {
      ob.update();
    });
  }
}

class ConcreteObserver extends Observer {
  name: string;

  observeState: string;

  subject: ConcreteSubject;

  setSubject(subject: ConcreteSubject) {
    this.subject = subject;
  }

  update(): void {
    this.observeState = this.subject.subjectState;
    console.log(`观察者${name}的新状态是${this.observeState}`);
  }
}

class ConcreteSubject extends Subject {
  private _subjectState: string;

  get subjectState() {
    return this._subjectState;
  }

  set subjectState(val: string) {
    this._subjectState = val;
  }
}

const sub = new ConcreteSubject();
const obTom = new ConcreteObserver();
const obJohn = new ConcreteObserver();
obTom.setSubject(sub);
obJohn.setSubject(sub);
sub.attach(obTom);
sub.attach(obJohn);
sub.subjectState = "happy";
sub.notify();
sub.subjectState = "blue";
sub.notify();
```

以上是基于`UML`图给出的一种比较标准的范式。

但是上述代码还存在一些考量

- 第一个考量是，有些时候观察者不需要关心订阅者的状态，观察者就可以不必在内部持有订阅者。
- 第二个考量是，没有频道隔离，不是所有人每次都想接收到相应的通知。比如我是一个房产中介，我手底下有很多客户都订阅了我所管辖的区域的小区房价信息，但是如果别墅的价格变化了的话，我没有必要通知给普通的人（别墅降价对于他来说就是叨扰了，反正他也买不起），我只需要通知高端人群，毕竟他们才有可能消费的起。

对于第一个考量，稍稍的调整一下上述代码就可以了。

```ts
abstract class Observer {
  abstract update(): void;
}

abstract class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    const idx = this.observers.findIndex((ob) => ob === observer);
    idx >= 0 && this.observers.splice(idx, 1);
  }

  notify() {
    this.observers.forEach((ob) => {
      ob.update();
    });
  }
}

class ConcreteObserver extends Observer {
  name: string;

  observeState: string;

  /*
   移除了观察者内部持有的订阅者
   */

  update(): void {
    console.log("您有新的订单，请及时处理");
  }
}

class ConcreteSubject extends Subject {
  private _subjectState: string;

  get subjectState() {
    return this._subjectState;
  }

  set subjectState(val: string) {
    this._subjectState = val;
  }
}

const sub = new ConcreteSubject();
const obTom = new ConcreteObserver();
const obJohn = new ConcreteObserver();
sub.attach(obTom);
sub.attach(obJohn);
sub.notify();
```

如何引入频道呢，可以继续在上述代码进行修改。

```ts
abstract class Observer {
  name: string;
  abstract update(msg: string): void;
}

abstract class Subject {
  private observers: Map<string, Set<Observer>> = new Map();

  attach(channel: string, observer: Observer) {
    // 在订阅的时候增加频道
    let obs = this.observers.get(channel);
    if (!obs) {
      obs = new Set();
    }
    obs.add(observer);
    this.observers.set(channel, obs);
  }

  detach(channel: string, observer: Observer) {
    let obs = this.observers.get(channel);
    if (!obs) {
      return;
    }
    obs.delete(observer);
  }

  notify(channel: string, msg: string) {
    // 只对订阅了这个频道的人进行通知
    const obSet = this.observers.get(channel);
    if (obSet) {
      obSet.forEach((ob) => {
        ob.update(msg);
      });
    }
  }
}

class ConcreteObserver extends Observer {
  name: string;

  observeState: string;

  update(msg: string): void {
    console.log(msg, this.name);
  }
}

class ConcreteSubject extends Subject {
  private _subjectState: string;

  get subjectState() {
    return this._subjectState;
  }

  set subjectState(val: string) {
    this._subjectState = val;
  }
}

const sub = new ConcreteSubject();
const obTom = new ConcreteObserver();
obTom.name = "tom";
const obJohn = new ConcreteObserver();
obJohn.name = "john";
sub.attach("villa", obTom);
sub.attach("department", obJohn);
sub.notify("villa", "别墅降价了");
sub.notify("villa", "别墅又降价了");
sub.notify("department", "公寓涨价了，再不买，买不到了");
```

所以，你必须根据实际的业务需要采取相应的设计才行。

### 3、前端开发中的实践

对于观察者模式可以说没有一个前端不熟悉它的身影了，因为`Vue`的双向绑定正是应用了这个设计模式，所以大家迫于面试就会去了解它。

除此之外，还有别的应用，比如`EventEmitter`，可以用它进行远距离通信（如`Vue`的事件管道，可以实现任何两个组件之间的通信），理解了观察者模式的设计思想，其实这个`EventEmitter`实现起来也就相当容易了，以下是我实现的一个`EventEmitter`。

```ts
class EventEmitter {
  private _map: Map<string, ((...args: any[]) => void)[]> = new Map();

  /**
   * 触发一个事件
   */
  $emit(channel: string, ...args: any[]) {
    const eventSets = this._map.get(channel);
    if (!Array.isArray(eventSets)) {
      return;
    }
    eventSets.forEach((f) => {
      f.apply(this, args);
    });
  }

  /**
   * 单次监听事件
   * @param {String} channel 监听事件的频道
   * @param {Function} handler 监听事件的处理器
   */
  $once(channel: string, handler: (...args: any[]) => void) {
    this.$on(channel, handler, true);
  }

  /**
   * 监听事件
   * @param {String} channel 监听事件的频道
   * @param {Function} handler 监听事件的处理器
   * @param {boolean} once 是否仅监听一次
   */
  $on(channel: string, handler: (...args: any[]) => void, once?: boolean) {
    let eventSets = this._map.get(channel);
    if (!Array.isArray(eventSets)) {
      eventSets = [];
    }
    if (!once) {
      eventSets.push(handler);
    } else {
      const wrapperFunc = function (...args: any[]) {
        handler.apply(this, args);
        this.$off(channel, wrapperFunc);
      };
      eventSets.push(wrapperFunc);
    }
    this._map.set(channel, eventSets);
  }

  /**
   * 移除事件监听
   * @param {String} channel 移除监听事件的频道
   * @param {Function} handler 移除监听事件的处理器
   */
  $off(channel: string, handler: (...args: any[]) => void) {
    const eventSets = this._map.get(channel);
    if (!Array.isArray(eventSets)) {
      console.warn("移除的事件频道不存在");
      return;
    }
    // 如果不传递handler则移除该管道的所有监听
    if (typeof handler !== "function") {
      this._map.delete(channel);
    } else {
      // 否则只删除一个事件监听器
      const delIdx = eventSets.findIndex((f) => f === handler);
      if (delIdx < 0) {
        console.warn("当前尚未设置此handler的监听");
        return;
      } else {
        eventSets.splice(delIdx, 1);
        this._map.set(channel, eventSets);
      }
    }
  }
}
```

另外，在有些场景，观察者模式可以用来控制异步操作，它和`Promise`结合起来能够达到一个化腐朽为神奇的效果。

在以前的团队使用的`Ajax`请求库是自己在`HTML5`提供的`fetch API`的一层封装（后文简称`sdk`），其中包裹了许多业务参数，直接调用这个`sdk`可以省时省力避免因其他因素而产生不确定的`bug`。但是`sdk`有个很不方便的特点就是只能当它调用了业务初始化接口获得响应内容结果之后才能正常工作。假设我们在页面中有个接口必须要等到`sdk`初始化执行，`sdk`初始化接口一定可以请求成功。

以下是利用观察者模式在`SDK`上的改造：

```js
class Request {
  request = null;
  constructor() {
    this.timeout = 3000;
    this.requestQueues = [];
  }
  initialize() {
    this.request = axios.create({
      baseURL: "/",
      timeout: this.timeout,
    });
    console.log("this request lib has been initialized!");
    // timeout error
    while (this.requestQueues.length > 0) {
      let execute = this.requestQueues.pop();
      let call = execute.dowork;
      // 如果执行到当前时刻的时候，已经超时，将不在执行了。
      if (execute.timeout) {
        return;
      }
      try {
        const result = typeof call === "function" && call();
        if (result && typeof result.then === "function") {
          result
            .then((response) => {
              execute.trigger("success", response);
            })
            .catch((err) => {
              execute.trigger("error", err);
            });
        } else {
          execute.trigger("success", result);
        }
      } catch (exp) {
        execute.trigger("error", exp);
      }
    }
  }

  post() {
    var args = arguments;

    if (!this.request) {
      const callback = {
        dowork: () => {
          return this.request.post.apply(this, args);
        },
        timeout: false,
      };

      callback.channels = {};

      callback.on = function (channel, func, once = false) {
        callback.channels[channel] = { func, once };
      };

      callback.off = function (channel) {
        delete callback.channels[channel];
      };

      callback.once = function (channel, callback) {
        callback.on(channel, callback, true);
      };

      callback.trigger = function (channel, args) {
        var action = callback.channels[channel];
        if (!action) {
          console.warn("this channel has been off");
          return;
        }
        const { func, once } = action;
        if (typeof func === "function") {
          func(args);
          once && delete callback.channels[channel];
        }
      };
      // 5S内SDK没有初始化成功，则认为SDK初始化超时
      setTimeout(() => {
        callback.off("success");
        callback.off("error");
        callback.timeout = true;
        callback.trigger("timeout");
        console.log("the request lib initialization timeout");
      }, 5000);

      this.requestQueues.push(callback);

      return new Promise((resolve, reject) => {
        callback.on("timeout", function () {
          resolve({ errno: 1, errmsg: "接口请求超时" });
        });

        callback.on("success", function (response) {
          clearInterval(timer);
          resolve(response);
        });

        callback.on("error", function (response) {
          clearInterval(timer);
          reject(response);
        });
      });
    }
    return this.request.post.apply(this, arguments);
  }
}
```

经过这番改造后，我们就可以无痛执行业务代码了，不需要关心`SDK`什么时候初始化完成。

实际开发中，这类应用场景还很多，请大家注意体会以灵活运用。
