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
  constructor(k: number) {
    this.limit = k;
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

开闭原则（Open-Closed Principle，`OCP`）是指一个软件实体（如类、模块和函数）应该对扩展开放，对修改关闭。

所谓的开闭，也正是对扩展和修改两个行为的一个原则。它强调的是用抽象构建框架，用实现扩展细节，可以提高软件系统的可复用性及可维护性。

开闭原则的核心思想就是面向抽象编程。

对于前端，我们经常接触到的一个业务，导入导出，就拿导出举例，前端的导出五花八门，可以是`xlsx`，可以是`xml`，也可以是`json`，还可以是普通的`text`等。

对于导出的业务来说，它不应该预设一些`if-else`语句去判断系统需要支持导出什么样的文件类型，因为这个关系的维持是脆弱的，设想现在要导出一个`yml`格式的文件，恭喜你，你的`if-else`语句就必须要增加分支了，显然已经违背`开闭原则`。

我们可以设想，这些行为其实都是具有共性的，它们都是向服务器拉取数据，然后向浏览器写文件，回到上文提到的面向抽象编程。

所以导出接口的定义就比较明确了，如下：

```ts
/**
 * 定义一个导出接口
 */
interface IExporter {
  /**
   * 获取导出数据
   */
  fetchData(): any[];
  /**
   * 导出文件
   */
  generateFile(filename: string): void;
}

/**
 * 定义一个导出Excel文件的实现类
 */
class XlsxExporter implements IExporter {
  fetchData(): any[] {
    return [];
  }

  generateFile(filename: string): void {
    console.log("Generating file..., please wait a moment");
  }
}
```

对于我们的业务，比如点击一个按钮实现导出：

```tsx
import React, { Component } from "react";
import { Factory } from "./utils";
export class MyComponent extends Component {
  onExport = (filename: string) => {
    const exportInstance: IExport = Factory.getInstance();
    exportInstance.onExport("爱我中华");
  };

  render() {
    return <Button onClick={this.onExport}>导出文件</Button>;
  }
}
```

如果产品经理现在来找你说，小杨啊，我导出`Excel`的时候，发现有很多残缺数据，用户导出这些数据其实没有多大的意义的，能不能前端做一些判断呀？

辛辛苦苦写好的导出，一句话又给加了一个需求，做肯定是要做的，关键是怎么做呢？

上文已经提到了面向对象编程的`多态`，此刻我们也不需要改动多少代码，大致修改如下：

```ts
class AdvanceXlsxExporter extends XlsxExporter {
  fetchData(): any[] {
    const data = super.fetchData();
    // TODO: 对数据进行一些处理
    return data;
  }
}
```

有的朋友可能不太明白为什么要这样做，觉得这样设计有点儿无病呻吟之嫌，现实场景中产品经理的这个需求其实也是很脆弱的，如果此时产品总监说，不行，我们的系统就需要向用户呈现真实的数据性便于用户进行统计分析，那刚才的需求其实就废了，这样又需要改动`XlsxExporter`这个类的实现，这类业务场景本来工厂函数就是极易改动的地方，因此把修改动作这种脏活累活交给工厂方法做的话，要好过直接修改`XlsxExporter`类，所以通过`继承`+`重写`较为妥当。

:::tip
如果系统现在需要新增导出的文件类型，直接编写一个新的导出类实现相应的业务逻辑即可，无需对业务代码进行修改。
:::

### 里氏代换原则

里氏代换原则的定义如下：如果`Sub`是`Parent`的子类型（子类），那么在任何使用`Parent`的地方都可以用`Sub`来替换，而不会产生任何错误或异常。

换句话说，派生类应该能够在不改变程序正确性的前提下扩展基类的功能。这意味着子类应该遵守父类的接口规范、行为约束和约定，不应该修改父类的已有行为。

遵守里氏代换原则的好处包括：

- 1、提高代码的可重用性和可维护性：通过子类的替代，可以轻松地扩展和修改代码而不影响已有的功能。
- 2、提高代码的可扩展性：可以通过添加新的子类来增加系统的功能，而不需要修改已有的代码。
- 3、降低代码的耦合性：基于基类编程，降低了代码之间的依赖关系，提高了代码的灵活性和可测试性。

在实际开发中，尤其是在开发一些基础库的时候，这个原则相当重要，这可以使得我们在定义的时候编码成依赖某个接口，然后再根据实际业务注入相应的实现子类，根据多态的性质，子类就能够完成这个模块的功能，当需求发生变更的时候，只需要编写新的业务实现类替换就可以了，而不用修改代码的底层设计，尤其是在开发一些跨平台的库的时候，遵守这个原则的话，开发体验是相当的好。

### 接口隔离原则

### 组合代替继承原则

### 单一职责原则

单一职责原则(Single Responsibility Principle，`SRP`)的职责被定义为“引起变化的原因”。如果我们有两个动机去改写一个方法，那么这个方法就具有两个职责。每个职责都是变化的一个轴线，如果一个方法承担了过多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。

此时，这个方法通常是一个不稳定的方法，修改代码总是一件危险的事情，特别是当两个职责耦合在一起的时候，一个职责发生变化可能会影响到其他职责的实现，造成意想不到的破坏，这种耦合性得到的是低内聚和脆弱的设计。

因此，`SRP`原则体现为: **一个对象(方法)只做一件事情。**

实际开发中，所谓的屎山代码是怎么来的，那绝对是写代码的时候一把梭哈只顾着实习功能完全没有考虑后续的维护性造成的，本来是几个类共同完成的，因为没有良好的设计，直接一个类就完成了，类臃肿，编写单元测试也难受。（有个经验是当编写单元测试不太容易的时候，能够倒推出当前代码的设计很大可能性是违背了单一职责原则的）。

就拿`Vue`的组件来说，为什么有的人能写出一个组件几千行代码的场景，有些人却永远不会遇到这样的场景。对于`Vue`的组件来说，它不仅有抽象、内聚业务、复用的能力，同时有隔离代码的作用，很多人只知道复用的时候需要抽离组件，却忽视了隔离代码降低维护成本的作用。

### 依赖倒置原则

### 迪米特原则(即最小知识原则)

它强调对象之间应该保持松散耦合的关系，尽量减少对象之间的相互依赖和交互。遵守迪米特原则可以使系统更加稳定，减少因为对象之间过度依赖而导致的代码修改风险。

主要有以下好处：

- 1、减少对象之间的依赖关系，降低耦合性。
- 2、提高代码的可维护性和可测试性，因为修改一个对象不会影响其他对象。
- 3、提高系统的可扩展性，可以更容易地引入新的对象或修改现有对象。

在实际开发中，如果这个原则遵循的好的话，在编写单元测试的时候，可能需要做的一些前置准备工作就少，从而降低单元测试的编写难度。在应对业务变更时候的代码改动量也少。

怎么样更好的遵循这个原则，我个人的实际开发经验得出最简单的办法就是开发之前先划分好职责，明确好什么该我做，什么该他做，举个例子：就比如一个弹窗需要渲染一个列表数据，如果它可以直接在它打开之后就去请求服务器，而不需要外界的上下文，那么这个数据获取的过程就可以直接交给弹窗，而不是在外界获取到数据再传递进来。

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
- [状态模式](./state.md)
- [职责链模式](./responsibility-chain.md)
