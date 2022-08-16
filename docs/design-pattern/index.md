---
{ "title": "设计模式专题" }
---

## 1. 面向对象的三大特性

### 封装

封装：将信息隐藏，也就是说，封装不仅仅是隐藏数据，还包括隐藏实现细节、设计细节以及隐藏对象的类型等，封装使得对象内部的变化对其他对象是不可见的。

对象对它自己的行为负责，其他对象或者用户都不关心它的内部实现。封装使得对象之间的耦合变松散，对象之间只通过暴露的`API（Application Program Interface）`接口来通信。当我们修改一个对象时，可以随意地修改它的内部实现，只要对外的接口没有变化，就不会影响到程序的其他功能。

下面是一个封装的例子：

<div align="center">
  <a href="https://leetcode.cn/problems/design-circular-queue/" target="_blank" title="LeetCode原文">
    <img :src="$withBase('/seal/queue.png')" alt="封装-循环队列"/>
  </a>
</div>

正常的思维，借助一个数组实现，然后会牵涉到对于数组的调整（有杠精会说 `JS` 不是有数组的`shift`和`push`吗？题目已经要求了不要使用内置的`Queue`，如果这样使用就违背了题目要求），因为有可能对数据进行拷贝，若每个数组项拷贝时间不可忽略的话，这个效率是比较低的。此外数组调整的逻辑也并不简单，还容易犯错。

但题目只要求不使用内置`Queue`即可，只要满足上述的`API`定义的要求就可以了，至于队列内部怎么实现，与外界无关。
因此可以自由发挥了，完全没有必要采用数组实现，链表的插入和删除都是`O(1)`，只要限制队列的最大长度，外界完全感觉不到队列的内容调整。

由此，采用双向链表实现这个循环队列，逻辑简单且高效，具体实现如下：

```ts
/**
 * 队列节点定义
 */
interface CircularQueueNode<T> {
  /**
   * 前驱节点
   */
  prev: CircularQueueNode<T> | null;
  /**
   * 后继节点
   */
  next: CircularQueueNode<T> | null;
  /**
   * 数据域
   */
  data: T;
}
/**
 * 循环双端队列
 */
class MyCircularQueue<T> {
  /**
   * 队列的最大长度限制
   */
  private limit: number = Infinity;
  /**
   * 队列当前已存储的长度
   */
  private size: number = 0;
  /**
   * 链表表头
   */
  private head: null | CircularQueueNode<T> = null;
  /**
   * 链表表尾
   */
  private tail: null | CircularQueueNode<T> = null;
  /**
   * 暴露给外界的当前队列的长度，不允许修改
   */
  public get count(): number {
    return this.size;
  }
  /**
   * 入队
   * @param value
   * @returns
   */
  public enQueue(value: T): void {
    if (this.isFull()) {
      console.warn("can not enqueue an full queue");
      return;
    }
    let newNode: CircularQueueNode<T> = {
      prev: null,
      next: null,
      data: value,
    };
    /* 入队：使用头插法 */
    if (this.head === null && this.tail === null) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }
  /**
   * 出队
   * @returns
   */
  public deQueue(): null | T {
    if (this.isEmpty()) {
      console.warn("can not dequeue from an empty queue");
      return null;
    }
    let node = this.head!;
    /* 出队：删除尾节点，将尾节点的前驱节点变成尾节点 */
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      let nextNode = node.next;
      nextNode!.prev = null;
      this.head = nextNode;
    }
    this.size--;
    return node.data;
  }
  /**
   * 获取队首的元素
   * @returns
   */
  public Front(): null | T {
    return !this.isEmpty() ? this.head!.data : null;
  }
  /**
   * 获取队尾元素
   */
  public Rear(): null | T {
    return !this.isEmpty() ? this.tail!.data : null;
  }
  /**
   * 队列是否为空
   */
  public isEmpty(): boolean {
    return this.size === 0;
  }
  /**
   * 队列是否满
   */
  public isFull(): boolean {
    return this.size === this.limit;
  }
}
```

外界看不到内部任何的技术实现细节，只需要按照`Queue`提供的接口进行调用即可，这样可以使得我们的`Queue`在不修改代码的前提下又能适应绝大部分的业务场景，由此例完全体现了封装的优势。

### 继承

继承：它可以使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。

继承的过程，就是从一般到特殊的过程。

在实际的开发中，我们通常会对我们的业务进行抽象，将一些比较宏观的行为编写成一个超类，不同的业务因为特殊的业务，可以对抽象的超类实现以获得更好的代码复用。

下面是一个继承的例子(节选自`vue-router@3.5.4`)：

```js
/**
 * 操作浏览器History的类
 */
class History {
  cb: (r: Route) => void;
  ready: boolean;
  readyCbs: Array<Function>;
  readyErrorCbs: Array<Function>;
  errorCbs: Array<Function>;
  listeners: Array<Function>;

  listen(cb: Function) {
    this.cb = cb;
  }

  onReady(cb: Function, errorCb: ?Function) {
    if (this.ready) {
      cb();
    } else {
      this.readyCbs.push(cb);
      if (errorCb) {
        this.readyErrorCbs.push(errorCb);
      }
    }
  }

  onError(errorCb: Function) {
    this.errorCbs.push(errorCb);
  }
}

/**
 * 低版本操作浏览器History的类
 */
class HashHistory extends History {}

/**
 * 高版本操作浏览器History的类
 */
class HTML5History extends History {}
```

### 多态

多态的实际含义是:同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。

举个例子，假设现在需要给不同的对象发送同一个消息，这些对象会根据这个消息分别给出不同的反馈。

多态的实现有二种方式，`重写`（也可以叫做`覆盖`），`重载`。

`重写`：对于父类和子类的同一个方法，子类完全（或完全不）舍弃父类的逻辑，并且由自己的业务决定实现一套新的逻辑。

`重载`：对于一个类中同一个方法名，参数类型不同，参数数量不同，方法执行的结果返回类型不同，均可构成`重载`。

:::danger
最常见的一个面试题：请问重写和重载什么关系？答案是没有关系
:::

由于`JS`是弱语言，实际开发中不存在`重载`，实现`多态`主要是采用`重写`。

下面是一个多态的例子(节选自`vue-router@3.5.4`)：

```ts
class History {
  go(n: number): never {
    throw new Error("not implement exception");
  }

  push(loc: RawLocation, onComplete?: Function, onAbort?: Function): never {
    throw new Error("not implement exception");
  }

  replace(loc: RawLocation, onComplete?: Function, onAbort?: Function): never {
    throw new Error("not implement exception");
  }
}

/**
 * 低版本操作浏览器History的类
 */
class HashHistory extends History {
  push(location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this;
    this.transitionTo(
      location,
      (route) => {
        pushHash(route.fullPath);
        handleScroll(this.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  }

  replace(location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this;
    this.transitionTo(
      location,
      (route) => {
        replaceHash(route.fullPath);
        handleScroll(this.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  }

  go(n: number) {
    window.history.go(n);
  }
}

/**
 * 高版本操作浏览器History的类
 */
class HTML5History extends History {
  go(n: number): void {
    window.history.go(n);
  }

  push(location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this;
    this.transitionTo(
      location,
      (route) => {
        pushState(cleanPath(this.base + route.fullPath));
        handleScroll(this.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  }

  replace(location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this;
    this.transitionTo(
      location,
      (route) => {
        replaceState(cleanPath(this.base + route.fullPath));
        handleScroll(this.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  }
}
```

上面的代码，大家如果看不懂没有关系，不用过分关心其中的详细实现，把主要关注点放在类的方法名定义上即可。

在实际开发中，`继承`和`多态`几乎都是一起出现的。

## 2. 面向对象的 7 大设计原则

### 开闭原则

### 里氏代换原则

### 接口隔离原则

### 组合代替继承原则

### 单一职责原则

单一职责原则(`SRP`)的职责被定义为“引起变化的原因”。如果我们有两个动机去改写一个方法，那么这个方法就具有两个职责。每个职责都是变化的一个轴线，如果一个方法承担了过多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。

此时，这个方法通常是一个不稳定的方法，修改代码总是一件危险的事情，特别是当两个职责耦合在一起的时候，一个职责发生变化可能会影响到其他职责的实现，造成意想不到的破坏，这种耦合性得到的是低内聚和脆弱的设计。

因此，`SRP`原则体现为: **一个对象(方法)只做一件事情。**

### 依赖倒置原则

### 迪米特原则(即最小知识原则，当前类知道的事儿越少越好)

## 2.常见的设计模式列表

- [单例模式](./singleton.md)
- [工厂模式](./factory.md)
- [命令模式](./command.md)
- [代理模式](./proxy.md)
- [观察者模式](.watcher.md)
- [桥接模式](./bridge.md)
- [适配器模式](./adaptor.md)
- [装饰模式](./decorate.md)
- [模板方法模式](./template.md)
- [策略模式](./strategy.md)
- [享元模式](./fly-weight.md)
- [中介者模式](./mediator.md)
