## 单例模式

### 1、基本概念

单例模式，保证一个类仅有一个实例，并提供一个访问它的全局节点。

通常我们可以让一个全局变量使得一个对象被访问，但它不能被防止你实例化多个对象，一个最好的方式就是，让类自身负责保存它的唯一实例。

这个类可以保证没有其它实例可以被创建。

它的`UML`图如下:

<div align="center">
  <img :src="$withBase('/design-pattern/singleton-pattern.png')" alt="单例模式" />
</div>

从上图中可以看出，将其**构造方法私有化**，这样外界就无法实例化它了，并且**暴露出了一个访问它唯一实例的方法**。

### 2、代码示例

```ts
class Singleton {
  /**
   * 内部持有全局唯一的实例
   */
  private instance: Singleton | null = null;
  /**
   * 私有化构造函数
   */
  private constructor() {}
  /**
   * 暴露访问其唯一实例的访问方法
   * @returns
   */
  getInstance(): Singleton {
    return this.instance || (this.instance = new Singleton());
  }
}
```

### 3、前端开发中的实践

这个场景已经不能说是在前端开发中的场景了。

我们在使用`Nest.JS`这类框架开发`BFF`服务时，通常操作数据库的上下文就会应用单例模式来设计。

另外一个大家比较熟悉的场景就是前端的`Notice`组件了，比如`Element UI`的`Message`组件，如果频繁的执行（用户点击的过快的话），
就会出现以下这种场景：

<div align="center">
  <img :src="$withBase('/design-pattern/singleton-pattern-example.png')" alt="单例模式的例子" />
</div>

我个人觉得这种交互是比较糟糕的，但是`Element UI`的设计团队为了把最大的灵活度交给开发者，它并没有在实现的时候就保证其单例，因此，我们可以使用单例模式对`Message`组件进行封装。

因此，我们需要使用单例模式对`Message`组件进行封装：

```js
import Vue from "vue";
/**
 * 单例的Message组件
 */
class SingletonMessage {
  static instance = null;

  constructor() {
    // 不允许当前类实例化
    throw new Error("this class can not called by new");
  }

  static show(options) {
    // 如果当前实例存在则什么事儿都可以不做了
    if (this.instance) {
      return;
    }
    let config;
    if (typeof options === "string") {
      config = {
        message: options,
        onClose: () => {
          // 做一些清理工作
          this.instance = null;
        },
      };
    } else {
      const { onClose, ...others } = options;
      config = {
        ...others,
        onClose: (...args) => {
          // 处理额外的清理工作
          this.instance = null;
          // 处理默认的参数
          typeof onClose === "function" && onClose.apply(this, args);
        },
      };
    }
    this.instance = Message(config);
  }

  static close() {
    if (!this.instance) {
      return;
    }
    this.instance.close();
  }
}

Vue.prototype.$singletonMessage = SingletonMessage;
```

看得仔细的同学可能会觉得上面的代码跟单例模式的`UML`的表示还是有一些差别的，切记学设计模式不要死板（很多时候，我们都在借鉴其设计思想），使用设计模式最大的动机在于将我们的代码写的易于维护，如果应用了设计模式反而使得我们的代码维护成本更高了，那就应该反思是不是做错了。

此例受制于`Element UI`的限制，`Message`组件每次关闭的时候都会移除`DOM`，所以看起来好像并不是那么“纯”，因此仅借鉴了`单例模式`的思想，达到了业务预期。

除此之外，还有个对象也是全局单例的，可能你每天都在用到，但你并没有在意，它就是->`Math`对象