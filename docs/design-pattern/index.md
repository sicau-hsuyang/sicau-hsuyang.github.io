---
{ "title": "设计模式专题" }
---

## 1. 面向对象的三大特性

### 封装

封装：将信息隐藏，也就是说，封装不仅仅是隐藏数据，还包括隐藏实现细节、设计细节以及隐藏对象的类型等，封装使得对象内部的变化对其他对象是不可见的。

对象对它自己的行为负责，其他对象或者用户都不关心它的内部实现。封装使得对象之间的耦合变松散，对象之间只通过暴露的`API（Application Program Interface）`接口来通信。当我们修改一个对象时，可以随意地修改它的内部实现，只要对外的接口没有变化，就不会影响到程序的其他功能。

下面是一个封装的例子：

```ts
class Stack<T> {
  /**
   * 链表的头结点
   */
  private head: LinkedListNode<T> | null = null;

  private length = 0;

  public get size() {
    return this.length;
  }
  /* 获取栈顶元素 */
  public get top(): T | null {
    return this.isEmpty() ? null : this.head.data;
  }

  /**
   * 压栈
   * @param ele
   */
  public push(ele: T) {
    const newNode: LinkedListNode<T> = {
      next: null,
      prev: null,
      data: ele,
    };
    // 栈长度增加
    this.length++;
    // 如果一个元素都没有，直接让head指向这个节点
    if (this.head === null) {
      this.head = newNode;
    } else {
      // 如果存在多个元素，让头指针指向新来的节点
      this.head!.next = newNode;
      // 新来的节点指向头指针
      newNode.prev = this.head;
      // 让原本的头指针指向新来的节点
      this.head = newNode;
    }
  }

  /**
   * 退栈
   */
  public pop() {
    if (this.isEmpty()) {
      throw new Error("can not pop from an empty stack");
    }
    // 获取到头节点的后继节点
    let head = this.head!.next;
    // 栈中的元素
    let ele = this.head!.data;
    // 解开第一个节点的后继节点
    this.head!.next = null;
    // 解开第一个节点的后继节点的前驱节点
    head!.prev = null;
    // 让栈首元素指向新的栈首元素
    this.head = head;
    // 栈长度递减
    this.length--;
    return ele;
  }

  /**
   * 栈是否为空
   * @returns
   */
  public isEmpty() {
    return this.length === 0;
  }
}
```

外界看不到内部任何的技术实现细节，只需要按照`Stack`提供的接口进行调用即可，这样可以使得我们的`Stack`在不修改代码的前提下适应绝大部分的业务场景。

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
