## JS 常用的继承方案

本文前面的几种继承方式有点儿属于为了面试而准备八股文，如果您作为一个初学者，抱着学习的态度阅读本文的话，最好掌握`ES5的组合寄生继承`和`ES6`的继承并且理解其原理最佳。

### 1、原型链继承

```js
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  this.subproperty = false;
}

// 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
  return this.subproperty;
};

var instance = new SubType();
console.log(instance.getSuperValue()); // true
```

在`SubType.prototype = new SuperType()`可以看到，子类的原型都引用了同一个对象，因此原型链方案存在的缺点，当多个实例对引用类型的操作会被篡改，这种继承方式在实际开发中几乎不会用到。

### 2、借用构造函数继承

使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类

```js
function SuperType() {
  this.color = ["red", "green", "blue"];
}
function SubType() {
  //继承自SuperType
  SuperType.call(this);
}
var instance1 = new SubType();
instance1.color.push("black");
alert(instance1.color); //"red,green,blue,black"

var instance2 = new SubType();
alert(instance2.color); //"red,green,blue"
```

该方案就好比是仅仅把父类构造函数捞过来再执行了一遍，对自己的属性或方法形成一种 copy，但是这种继承无法继承父类原型上的属性和方法，这种继承方式在实际开发中也不会用。

### 3、组合继承

组合上述两种方法就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  alert(this.name);
};

function SubType(name, age) {
  // 继承属性
  // 第二次调用SuperType()
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType();
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```

实例对象 instance1 上的两个属性就屏蔽了其原型对象 SubType.prototype 的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。

组合继承的缺点就是父类的构造函数会调用两次。

### 4、原型式继承

利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。

```js
function inherit(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
```

```js
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};

var anotherPerson = inherit(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = inherit(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"
```

上述代码可以使用 ES5 提供的`Object.create`等价实现

同样存在多个实例的引用类型属性指向相同，存在篡改的可能的这个缺点，并且还无法传递参数。在实际开发中有一定的使用场景，但是比较局限

### 5、寄生式继承

在原型式继承的基础上，增强对象，返回构造函数

```js
function createAnother(original) {
  // 通过调用 Object.create() 函数创建一个新对象，其原型为original
  var clone = Object.create(original);
  clone.sayHi = function () {
    // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}
```

函数的主要作用是为构造函数新增属性和方法，以增强函数

```js
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

该方式和寄生继承存在一样的缺点。

### 6、⭐️ 寄生组合式继承

结合借用构造函数传递参数和寄生模式实现继承，即上述组合继承和寄生继承的结合体。

```js
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType; // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype; // 指定对象，将新创建的对象赋值给子类的原型
  subType.__proto__ = superType; // 挂载构造器的指向关系，使得构造器上的静态属性也能继承
}

// 父类初始化实例属性和原型属性
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function () {
  alert(this.age);
};

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]
```

这种方式的高效率体现在它只调用了一次`SuperType`构造函数，并且因此避免了在`SubType.prototype`上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用`instanceof` 和`Object.isPrototypeOf`。

这是最成熟的方法，也是现在库实现的方法，`ES6`类的继承编译成`ES5`代码之后就是使用的这种方式。

这种方式是我们必须要掌握的继承方式。

### 7、混入方式继承多个对象

```js
function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function () {
  // do something
};
```

`Object.assign` 会把 `OtherSuperClass` 原型上的函数拷贝到 `MyClass` 原型上，使 `MyClass` 的所有实例都可用 `OtherSuperClass` 的方法。

实际开发中有类似混入的需求，但一般不会使用此方式来实现继承。

### 8、⭐️ ES6 类继承 extends

`ES6`的继承最为简单，语法上跟`Java`，`C#`等语言类似，但是其原理是上述多种继承方式的组合。

`ES6`的继承，子类可以继承父类的非私有方法和属性（即使是静态方法或者属性也可以继承），比如：

```js
class Base {
  name = "111";

  static age = 222;

  static say() {
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
```

如果对`ES6`的类的语法及其原理不太清楚的同学请查看本文档阐述`ES6`的类的语法节。

`ES6`的继承有两条原型指向关系：

- `SubType.__proto__ === SuperType`
- `SubType.prototype.__proto__ === SuperType.prototype`

以下是上述代码经过`babel`编译之后的节选

```js
"use strict";
// 节选了相关代码

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
  return _setPrototypeOf(o, p);
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

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

var Base = /*#__PURE__*/ (function () {
  function Base() {
    _classCallCheck(this, Base);

    _defineProperty(this, "name", "111");
  }

  _createClass(
    Base,
    [
      {
        key: "run",
        value: function run() {
          console.log("base run");
        },
      },
    ],
    [
      {
        key: "say",
        value: function say() {
          console.log("base say");
        },
      },
    ]
  );

  return Base;
})();

_defineProperty(Base, "age", 222);

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

关键函数`_inherits`，在这个函数中建立了子类和父类的原型关系（`Object.create`方法：创建以某个对象为原型对象的对象），自然就推导出了上述所说的第二条关系，即`SubType.prototype.__proto__ === SuperType.prototype`，(`Object.setPrototypeOf`方法:设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象)，自然就推导出了上述的第一条结论，即：`SubType.__proto__ === SuperType`，以上便完成了静态属性和方法以及普通方法的继承。

在上述处理完成之后，看看是如何处理普通属性的，关键点在`_createSuper`，这个函数返回的是一个函数，可以看到，其执行结果就是获取到绑定了父类构造器的函数，在这个构造器中，用反射的形式创建一个父类的实例，`Reflect.construct(target, argumentsList[, newTarget])`，这样就相当于先构造了一个父类的实例，好处就是可以使得多个子类继承一个父类的话，如果一个子类实例修改父类属性，不至于影响到父类和别的子类。

所以`ES6`继承的本质还是组合寄生继承。
