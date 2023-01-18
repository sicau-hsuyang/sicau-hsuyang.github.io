## Class 的前世今生

`JS`是一门基于原型继承的语言，对于熟悉`C#`，`Java`等语言的人来说，理解起来相当费解(我在学习JS的初期几乎是以完全忘记`C#`语法的姿态去学习的)，随着现代 Web 技术的发展（尤其是`nodejs`的出现），我们的项目也变得越来越庞大，维护成本也变得越来越高，因此 TC39 委员会也致力于将`JS`向一门完备的工业化语言迈进，因此就引入了`ES`的下一代版本，即`ES6`。

其中相当令人兴奋的一个特性便是引入了`Class`这一语法糖，使得我们可以不用再费力的去基于原型，控制`JS`代码的一些行为，对于初学者也更加的友好。

## Class 的基础语法

```js
class Person {
  name = "awesome boy";

  age = 18;

  constructor(hobby) {
    this.hobby = hobby;
  }

  run() {
    console.log("I can run");
  }

  say() {
    if (this.hobby) {
      console.log("I can say, I like " + this.hobby);
      return;
    }
    console.log("I can say");
  }

  inspect() {
    console.log(this);
  }
}

const xiaoming = new Person("Java");
xiaoming.say();
xiaoming.run();
```

上述代码我们便定义了一个`Person`，其中`name`和`age`叫做类的`属性`，`run`和`say`叫做类的`方法`，使用起来和`ES5`完全一致，如果改写成`ES5`的代码，大致如下。如果不修改类的方法的`this`指向的话，方法中`this`默认指向类的实例对象。

```js
function Person(hobby) {
  this.name = "awesome boy";
  this.age = 18;
  this.hobby = hobby;
}

Person.prototype.say = function () {
  if (this.hobby) {
    console.log("I can say, I like " + this.hobby);
    return;
  }
  console.log("I can say");
};

Person.prototype.run = function () {
  console.log("I can run");
};
```

:::warning
需要注意的一点儿就是，类中的方法是归属于类的实例对象的原型对象上的，并不在实例本身上，因此增加`say`和`run`方法不能直接写在构造函数内部。
:::

## Class 的 constructor 方法

用法和 `Java` 和 `C#`一样，当我们需要在类初始化的时候传递一些参数就需要用到构造函数，默认构造函数是可以不写的。

如果在使用类实现继承的时候，一旦写了构造函数就必须要在构造函数中**首先调用父类的构造函数**（仍然默认可以不写）

```js
class Person {}

class Male extends Person {
  constructor() {
    super();
    console.log("hello world");
  }
}
```

## Class 的静态属性和方法

对于静态属性和方法，其实也没有什么好神秘的，其实就是加了一个`static`关键字，使得这个属性或者方法归属于这个类本身，而不再归属于类的实例对象。

```js
class Person {
  static version = "0.0.1";

  static bootstrap() {
    console.log("I am alive");
  }
}
```

上述改写成`ES5`的代码的话，即:

```js
function Person() {}

Person.version = "0.0.1";

Person.bootstrap = function () {
  console.log("I am alive");
};
```

静态方法中`this`默认指向类本身。

## Class 的私有属性和私有方法

像`Java`，`C#` 甚至`TS`都有私有属性或者私有方法，并且是使用`private`，不过这个设想最终还是没有落到`JS`的语法上，`JS`类的私有属性和方法比较杀马特，需要在前面加入一个`#`，以表示这是一个私有的字段，如：

```js
class Person {
  #salary = 1800;

  #settleSalary() {
    console.log("月入1800，每天笑哈哈，月入3800，拿命往里搭");
  }
}
```

私有字段只有在类的内部才能访问的到，一旦出了类，就无法访问了，你可以简单的理解为在类的这两个`{}`之前可以访问到，除此之外再也无法访问到了。

至于这个是怎么实现的，就需要更高级的语法了，`ES6`中引入了一个叫做`WeakMap`的接口，而`class`的私有字段便是基于这个实现的。

```js
"use strict";

var _background = new WeakMap();

var Point = /*#__PURE__*/ (function () {
  function Point(x, y) {
    _background.set(this, {
      writable: true,
      value: "red",
    });
  }

  return Point;
})();
```

对于每一个私有字段，都声明一个`WeakMap`来控制，每个`WeakMap`挂载的`key`为当前类，因此，一旦出了类，再也访问不到它，因为`WeakMap`不会增加对象的引用计数，一旦这个类销毁了，那么这个`WeakMap`也随之销毁了，不会造成内存泄露。

## Class 的 getter 和 setter

因为有私有属性，有些时候，我们仅仅想让外界读取而不能改写(只读)或者只写的时候就需要用到`getter`或者`setter`。

```js
class Person {
  #_salary = 0;

  get salary() {
    return this.#_salary;
  }

  set salary(value) {
    if (value <= 0) {
      console.warn("薪资不能是负值");
      return;
    }
    this.#_salary = value;
  }
}
```

`getter`和`setter`其实对应的就是`ES5`提供的`Object.defineProperty`方法中的`get`和`set`

```js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

var Person = /*#__PURE__*/ (function () {
  function Person() {
    _classCallCheck(this, Person);

    _classPrivateFieldInitSpec(this, _salary, {
      writable: true,
      value: 0,
    });
  }

  _createClass(Person, [
    {
      key: "salary",
      get: function get() {
        return _classPrivateFieldGet(this, _salary);
      },
      set: function set(value) {
        if (value <= 0) {
          console.warn("薪资不能是负值");
          return;
        }

        _classPrivateFieldSet(this, _salary, value);
      },
    },
  ]);

  return Person;
})();
```

## Class 的静态块

这是在`ES2021`中增加的内容，主要目的是对静态属性进行初始化，因为在这之前，静态属性的一个问题是，如果它有初始化逻辑，这个逻辑要么写在类的外部，要么写在`constructor()`方法里面。后者带来的问题是每次这个类初始化实例的时候都会执行一遍。前者的问题是使得代码的内聚性降低，不利于维护。

```js
class Position {
  static x;
  static y;
  static z;

  static {
    // 模拟一些初始化的操作
    this.x = 1;
    this.y = 2;
    this.z = 3;
  }
}
```

在类生成时运行且只运行一次，以后，新建类的实例时，这个块就不运行了。

转化为`ES5`的语法大致如下：

```js
var Position = /*#__PURE__*/ _createClass(function Position() {
  _classCallCheck(this, Position);
});

_defineProperty(Position, "x", void 0);

_defineProperty(Position, "y", void 0);

_defineProperty(Position, "z", void 0);

(function () {
  // 模拟一些初始化的操作
  Position.x = 1;
  Position.y = 2;
  Position.z = 3;
})();
```

用一个立即执行函数初始化这些操作，解决了写在构造器执行多次的问题，本质上是初始化逻辑写在类的外部的语法糖。

## Class 的继承

使用 Class 继承完美的解决了早期 ES 种继承的问题，而且语法相当简单，就一个`extends`就搞定了。

我们先以数学定理的形式先记住继承中父类子类之间的属性和方法的关系

- 1、子类可以继承父类中所有的非私有属性和方法
- 2、子类可以继承父类中所有的非私有静态属性和静态方法

假设有如下继承关系

```js
class Base {
  name = "111";

  age = 222;

  say() {
    console.log("base say");
  }

  run() {
    console.log("base run");
  }
}

class Sub extends Base {
  run() {
    console.log("sub run");
  }
}

const parent = new Base();
const child = new Sub();
child.run();
console.log(child.name);
```

我们根据第一条定理来推导第一条原型指向关系：

```js
Sub.prototype.__proto__ === Base.prototype;
```

为什么是这样，根据上文阐述，我们知道，所有的类的方法都挂载类的原型对象上的，既然当前类能够访问到父类的所有方法，当前类方法定义的位置在`Sub.prototype`，既然 JS 引擎取值不会报错，那么自然这个原型对象的原型是父类的原型对象。

那么，属性是怎么继承来的呢？

```js
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

var Base = /*#__PURE__*/ (function () {
  function Base() {
    _classCallCheck(this, Base);

    _defineProperty(this, "name", "111");

    _defineProperty(this, "age", 222);
  }

  _createClass(Base, [
    {
      key: "say",
      value: function say() {
        console.log("base say");
      },
    },
    {
      key: "run",
      value: function run() {
        console.log("base run");
      },
    },
  ]);

  return Base;
})();

var Sub = /*#__PURE__*/ (function (_Base) {
  _inherits(Sub, _Base);

  var _super = _createSuper(Sub);

  function Sub() {
    _classCallCheck(this, Sub);

    return _super.apply(this, arguments);
  }

  _createClass(Sub, [
    {
      key: "run",
      value: function run() {
        console.log("sub run");
      },
    },
  ]);

  return Sub;
})(Base);
```

关键就是看`_createSuper`这个辅助函数，其返回一个函数，其直接调用了一次`Super`，相当于我们得到的是一个把当前类上所有属性完成拷贝的对象，**这就避免了多个子类继承同一个父类的时候，共用一个父类的属性的问题**

接着，我们根据第二条定理来推导的第二条原型指向关系：

```js
Sub.__proto__ = Base;
```

为什么是这样，根据上文阐述，我们知道，所有类的静态属性或者方法都挂载在类本身的，既然 JS 引擎取值不会报错，那么自然这个类的原型是父类。

### super 关键字

上述代码中我们可以看到，当子类中方法和父类重名的时候，会出现一种比较奇妙的现象，我们回想一下 JS 对象的属性访问规则，当前对象上有名为 xxx 的方法，便不会向上查找了，子类已经完全修改了父类的行为，专业术语叫做**重写**或者**覆盖**，这个语法特性在面向对象程序设计中有相当大的应用，比如常见的设计模式：`模板方法模式`、`策略模式`、`命令模式`等都可以看到这个特性的应用。

```js
class Strategy {
  run() {
    console.log("base run");
  }
}

class SimpleStrategy extends Strategy {
  run() {
    console.log("sub run");
  }
}

class ComplexStrategy extends Strategy() {
  run() {
    console.log("sub run");
  }
}

function selectStrategy(mode) {
  let stg = null;
  switch (mode) {
    case "simple":
      stg = new SimleStrategy();
      break;
    case "multi":
      stg = new ComplexStrategy();
      break;
  }
  return stg;
}

class Bootstrap {
  runner() {
    const stg = selectStrategy(import.meta.env.STRATEGY);
    stg.run();
  }
}
```

若我们又不想完全覆盖父类的行为呢，比如某些时候，我们得到的一个 SDK 已经提供了某些功能，但是这个功能又不完全满足我们的业务，我们需要针对我们的业务定制化，此刻就可以使得`super`关键字派上用场了。

```js
class Base {
  run() {
    console.log("base run");
  }
}

class Sub extends Base {
  run() {
    super.run();
    console.log("sub run");
  }
}
```

## Class 的一些注意点

- 类和模块的内部，默认就是严格模式
- 类的方法内部如果含有`this`，它默认指向类的实例，但是并不意味着就是绝对安全的，比如有些老六

```js
class Person {
  name = "yx";

  say() {
    console.log(this.name);
  }
}
const p = new Person();
const say = p.say;
// Uncaught TypeError: Cannot read properties of undefined
say();
```

- 类不存在提升
- 类中有一个名为`new.target`的属性，这个属性在初始化的时候指向的是类本身，因此可以用这个属性判断类是否使用`new`调用，即便子类继承了父类，在父类中，`new.target`仍然指向子类。
