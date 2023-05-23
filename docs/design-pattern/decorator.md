## 装饰模式

### 1、基本概念

装饰模式是为已有功能动态的添加更多功能的一种方式

当系统需要新功能的时候，是向旧的类中添加新的代码，这些新加的代码通常装饰了原有类的核心职责或者主要行为。

<div align="center">
  <img :src="$withBase('/design-pattern/decorate-pattern.png')" alt="装饰模式" />
</div>

上述`UML`图含义如下：`Decorator`不仅需要实现`Component`类，并且其内部还需要依赖一个`Component`类（承载内部`Component`对象链的起始点），具体的业务根据需要来继承`Decorator`类

### 2、代码示例

```ts
interface Component {
  run(): void;
}

class Decorator implements Component {
  protected component: Component | null;

  constructor(component?: Component) {
    this.component = component || null;
  }

  run(): void {
    if (this.component) {
      this.component.run();
    }
  }

  decorate(com: Component): Component {
    this.component = com;
    return this;
  }
}

class GotoWork implements Component {
  run(): void {
    console.log("去上班了，不上班没有钱啊");
  }
}

class TakePhotoDecorator extends Decorator {
  run(): void {
    console.log("拍照，记录下春天美美的花草");
    super.run();
  }
}

class LookBeautyDecorator extends Decorator {
  run(): void {
    console.log("男人至死是少年，不看美女怎么行呢");
    super.run();
  }
}

let work = new GotoWork();
const take = new TakePhotoDecorator();
const look = new LookBeautyDecorator();
work = take.decorate(work);
work = look.decorate(work);
work.run();
```

上述代码中，我稍微做了一点儿处理，`Decorator`类的装饰方法返回的是`Component`，这样就可以把装饰好的结果赋值给最开始的对象（`work = take.decorate(work);`，改写了初始化的`work`对象，而不用最终调用`look.run`方法）最好执行方法的时候，逻辑上看起来比较好理解一些。

或者，我又思考了另外一种实现：

```ts
interface Component {
  run(): void;
}

class DecorateAbility implements Component {
  /**
   * 可以根据自己的需要用数组还是用Set来存储装饰类
   */
  protected components: Set<Component> = new Set();

  run(): void {
    this.components.forEach((com) => {
      com.run();
    });
  }

  decorate(com: Component) {
    // 保证唯一值
    this.components.add(com);
  }
}

class TakePhotoComponent implements Component {
  run(): void {
    console.log("拍照，记录下春天美美的花草");
  }
}

class LookBeautyComponent implements Component {
  run(): void {
    console.log("男人至死是少年，不看美女怎么行呢");
  }
}

class Work extends DecorateAbility {
  run(): void {
    super.run();
    console.log("要上班啊，不上班怎么有钱呢?");
  }
}

const work = new Work();
const take = new TakePhotoComponent();
const look = new LookBeautyComponent();
work.decorate(take);
work.decorate(look);
work.run();
```

这样，当每次调用`decorate`方法时，就是在给`Work`类的实例增加能力，不需要再考虑实例，逻辑上更好理解。

### 3、在前端开发中的实践

装饰模式的思想我们已经领悟到了其关键点—>`不修改原本的内容，扩展其能力`，但是如果真的把代码写成这样的话，还是比较复杂的。

如果有学习过`Spring`这类框架的同学一定对`AOP`（面向切面编程）有所了解，装饰模式就是这个思想，那抓住重点，我们就可以使用`AOP`来实现装饰模式。

因为`JS`有自己的语法特性，所以我们实现起来就不必那么绕了。

```js
/**
 * 增加前置执行的函数
 */
Function.prototype.beforeExec = function (fn) {
  const _this = this;
  return function wrapper() {
    fn.apply(this, arguments);
    return _this.apply(this, arguments);
  };
};
/**
 * 增加后置执行的函数
 */
Function.prototype.afterExec = function (fn) {
  const _this = this;
  return function wrapper() {
    const response = _this.apply(this, arguments);
    fn.apply(this, arguments);
    return response;
  };
};
```

为原型绑定这两个函数之后，比如在多人合作开发一个项目时，我们其实不知道`window.onload`上目前挂载了什么业务逻辑需要处理，但是又不敢贸然直接给`window.onload`赋值一个新函数，此刻，上述装饰模式的实现方式就派上了大用处。

```js
function onLoad() {
  console.log("我想处理一些业务逻辑");
}
// 不需要担心覆盖其它开发者增加的onload事件
window.onload =
  typeof window.onload === "function"
    ? window.onload.beforeExec(onLoad)
    : onLoad;
```

并且，再执行这个操作，仍然可以扩展`window.onload`回调函数的能力不用担心覆盖之前的内容。

以下是使用装饰模式处理`axios`请求增加`loading`提示的例子：

```js
import fetch from "axios";
import Vue from "vue";
/**
 * 为请求注入loading
 * @param {Function} fn 请求后端的函数
 * @param {String} msg loading提示信息
 * @returns
 */
function decorate(fn, msg = "") {
  return function enhance() {
    Vue.prototype.$loading.show(msg);
    const result = fn.apply(this, arguments);
    if (result && typeof result.then === "function") {
      return result
        .then((resp) => {
          Vue.prototype.$loading.hide();
          return resp;
        })
        .catch(() => {
          Vue.prototype.$loading.hide();
        });
    }
    return result;
  };
}

/**
 * 获取活动配置
 */
export const getAppInfo = decorate(function getAppInfo() {
  return fetch("/api/baofang/y2023/y2023/TombSweepingDay0403/index");
});
```

经过这个装饰函数之后，业务侧只需要关心数据处理逻辑，不用再关注处理页面的提示信息，简化调用。而对于一些不需要`loading`提示，或者处理比较复杂的`loading`就不走这个`decorate`装饰函数，根据业务需要灵活的控制。

在`ES5`及之前，我们只能通过这种办法实现装饰模式，但是`ES6`引入了一个新的语法：`Decorator`（不仅可以增加原对象的能力，还可以削弱原对象的能力），同样可以实现上述方式。

因为`Decorator`在`ES6`仍然是一个提案，其语法仍然在变化当中，本文以`2020`年的装饰器语法进行阐述：

```ts
function log(target: Object, name: string, descriptor: PropertyDescriptor) {
  var oldValue = descriptor.value;
  descriptor.value = function () {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };
  return descriptor;
}

class MyClass {
  @log
  handleClick() {
    console.log("用户点击了按钮");
  }
}
```

目前装饰器的语法，上述代码可能已经无法正常运行了。

其实它的思路和我们写的`AOP`函数是一样的，也是通过重写原函数增强了原函数的能力，未来装饰器的语法何去何从还不得而知，大家就权当看看稀奇吧。
