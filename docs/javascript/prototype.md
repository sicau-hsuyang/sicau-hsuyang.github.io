<!--
 * @Autor: Zhang Yingying
 * @Date: 2022-08-09 13:53:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-08-17 16:44:53
-->

## 原型及原型链

`JS`是一门基于原型继承的语言，并不是传统的`Java`，`C#`基于类继承的语言，这是`JS`较为重要的一个特征之一。

虽然`ES6`增加了`class`的语法，然而`class`的本质还是基于原型及原型链的关系，是个语法糖而已，因此对于任何一个前端来说这个知识点是必须要掌握的。

### `__proto__` 和 `prototype`

之前我在论坛上听大家有叫`__proto__`什么隐式原型对象的，我个人感觉叫什么不重要，只要你理解它能干啥就行了（就好比你说话，如果别人都能听懂了，你还去纠结什么是主语什么是谓语什么是宾语就有点儿孔乙己了），所以我一直从初学到现在任意大中小厂面试只要提到原型链我都是直接念的`__proto__`。

#### `__proto__`

为什么说`JS`万物皆对象呢，我想大概就是因为它吧。

已知的除了`null`，`undefined`，`ø(即Object.create(null))`没有这个属性以外，所有的变量都会有`__proto__`。为什么一个空对象（`{}`）能够拥有`toString`方法呢，因为`({}).__proto__`指向的是`Object.prototype`。

`JS`属性的一个读取特征就是，首先它会在当前的对象上找，如果找的到的话，直接就使用，找不到就通过`__proto__`到它的原型对象上去找，如果还找不到，就到原型对象的原型对象上去找，如果原型对象的原型对象不存在呢？不存在的话就报错了，如：`a.demo is not a function`。

所以，任意的数据类型的实例都指向它的原型对象，因此有：

```js
(1).__proto__ === Number.prototype;
// 注意：NaN也是number类型
true.__proto__ === Boolean.prototype;
({}.__proto__ === Object.prototype);
Symbol(1).__proto__ === Symbol.prototype;
"hello world".__proto__ === String.prototype;
(() => {}).__proto__ === Function.prototype;
```

#### `prototype`

这个属性是找原型对象的钥匙，也就是说，我们要获取到一个原型对象，必须得通过`prototype`，我的理解就是原型对象它是放在仓库的一个工具箱，要想使用这个工具箱，首先得找仓库（即找对应的`构造器`），找到仓库之后，拿钥匙开门（即`prototype`），然后我们就可以打开这个工具箱，发现这里面有好多工具可以用。

<div align="center">
  <img :src="$withBase('/prototype/Object.prototype.png')" alt="对象的原型"/>
</div>

但是问题就是，不是随便一个阿猫阿狗都能拥有`prototype`这个属性的，想要拥有这个属性，这个对象必须是一个`构造器(constructor)`

现在我们用一个生活中的例子来捋一捋刚才所讲的知识点之间的关系：

印度尼西亚想向中国订购一列高铁（对象的实例，即`instance`），那么，中国中车是造高铁的工厂（`构造器`），高铁不是生产出来就完了，还需要有一系列维护运营的技术（即原型对象上的方法），生产的高铁上贴着标签: 中国中车制造(`__proto__`)，那么以后这列高铁的维护运营都可以使用中国中车提供的技术了。

<div align="center">
  <img :src="$withBase('/prototype/reference.png')" alt="原型及原型链指向关系"/>
</div>

有一个问题就是，虽然这些高铁技术是中国中车的，但是这些技术放在那儿，但我们总感觉会被西方反华势力剽窃走，所以，我们最好希望让这些技术的专业技术人员们知道自己是归属于谁的，因此原型对象上有一个`constructor`属性是指向构造器的，如：

```js
Object.prototype.constructor === Object; // true
```

有了这个例子之后，我们可以很容易的分清楚构造器和原型对象的关系了，如`Object`和`Object.prototype`。

### 获取或修改原型的指向关系

`Object.setPrototypeOf`和`Object.getPrototypeOf`

### 构造器

刚才我们阐述原型对象的过程中有一个非常关键的概念没有说，那就是`constructor`，通过上一节的分析，它跟原型对象，存在一定的关系，但是肯定不是一个东西，（最开始我们只阐述了`3`个没有原型对象的类型），那它指向的是谁呢？答案是函数原型对象(`Function.prototype`)。

任意一个构造器都是函数原型对象的实例，即：

```js
Object.__proto__ === Function.prototype; // true
Number.__proto__ === Function.prototype; // true
Boolean.__proto__ === Function.prototype; // true
String.__proto__ === Function.prototype; // true
Symbol.__proto__ === Function.prototype; // true
Array.__proto__ === Function.prototype; // true
```

上面还有一个关键的指向关系没有阐述,容我卖个关子。

我们已经得出结论，任意一个构造器都是函数原型对象的实例，请问`Function`是构造器吗？
毫无疑问必须得是啊，既然是，那就应该符合我们这个结论，即：

```JS
Function.__proto__ === Function.prototype; // true
```

曾经很长一段时间，我都是把这个指向关系当结论给记住的，其实经过上述的一通分析，完全没有必要死记硬背啦。

所以，我们就可以画出一个比较全面的指向关系：

<div align="center">
  <img :src="$withBase('/prototype/reference_complex.png')" alt="综合原型及原型链指向关系"/>
</div>

再来个更复杂一点儿的，加一个自定义的构造器试试：

```js
function Person() {}

Person.prototype.getName = function () {
  return "JohnYang";
};

let p = new Person();
```

把`Person`和`p`加到我们刚才的图中去，得到的关系如下：

<div align="center">
  <img :src="$withBase('/prototype/custom_constructor.png')" alt="自定义构造器的原型及原型链指向关系"/>
</div>

### `ES6`类继承中的原型链指向关系

本文不阐述`class`的语法，如果还不了解的朋友可以先行查阅相关资料。

假设现在有如下两个类，并且有继承关系：

```js
class Parent {
  static aaa;

  bbb() {
    console.log("hello world");
  }
}

class Child extends Parent {
  bbb() {
    super.bbb();
    console.log("hello world 222");
  }
}
```

接下来看一下经过`babel`编译之后的结果，为了节约篇幅，只贴比较关键的部分。

```JS
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
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

var Parent = /*#__PURE__*/ (function () {
  function Parent() {
    _classCallCheck(this, Parent);
  }

  _createClass(Parent, [
    {
      key: "bbb",
      value: function bbb() {
        console.log("hello world");
      },
    },
  ]);

  return Parent;
})();


_defineProperty(Parent, "aaa", void 0);

var Child = /*#__PURE__*/ (function (_Parent) {
  _inherits(Child, _Parent);

  var _super = _createSuper(Child);

  function Child() {
    _classCallCheck(this, Child);

    return _super.apply(this, arguments);
  }

  _createClass(Child, [
    {
      key: "bbb",
      value: function bbb() {
        _get(_getPrototypeOf(Child.prototype), "bbb", this).call(this);

        console.log("hello world 222");
      },
    },
  ]);

  return Child;
})(Parent);
```

从编译的结果看，凡是带`static`的关键字的都给添加到了构造器上，没有`static`关键字的都添加到了原型对象上。

最关键的一个方法是`_inherits`，其中：

```js
subClass.prototype = Object.create(superClass && superClass.prototype, {
  constructor: { value: subClass, writable: true, configurable: true },
});
/**
 Object.create: 创建一个以什么对象为原型的对象，即可以理解为：
 subClass.prototype.__proto__ === superClass.prototype // true
 */
_setPrototypeOf(subClass, superClass);

/**
  subClass.__proto__ === superClass // true
 */
```

:::tip
在`ES6`中，**子类.`__proto__` === 父类， 子类的原型对象.`__proto__` === 父类的原型对象 **
:::

其实这个结论从我们的实际开发中也体验的出来，`static`属性可以被继承，那么必然存在子类.`__proto__` === 父类，非 static 属性也可以被继承（均非私有）当我们初始化一个子类的实例的时候，必然存在 `ins.__proto__` 指向 `Child.prototype`，`Child.prototype.__proto__`指向`Parent.prototype`

### 实际应用

对于应付面试八股文非我们学习的本意，学习的目的还是为了提高生产力

#### 1、 实现`instanceof`

`instanceof`的原理就是判断输入参数的`__proto__`在不断向其原型链上迭代的过程中，最终是否指向构造器关联的原型对象。

```js
function MyInstanceOf(child, parent) {
  if (!parent || !parent.prototype) {
    throw `the instanceof must apply to compare two object`;
  }
  let flag = false;
  while (child) {
    if (child.__proto__ === parent.prototype) {
      flag = true;
      break;
    }
    child = child.__proto__;
  }
  return flag;
}
```

#### 2、面向切面编程

这是一个在实际开发中非常有价值的应用。

现在某个团队提供给你了一个包和这个包的`API`，这个包是被压缩过的，你没有修改包源码的权利，但是某个方法`A`我们发现它不完全满足我们的业务场景，怎么办呢？其实挺好办的，修改原型链，给它追加一层我们自己的业务逻辑控制，并且不改变它本身的实现，这就是常提到的面向切面编程（或者说是装饰模式也行）。

```js
import lib from "@xxx/xxx-sdk";
const enhancedLib = {
  /* 注意：不能写成 init: function() {} */
  init() {
    // 不侵入库本来的代码
    typeof super.init === "function" && super.init.apply(this, arguments);
    // 扩展当前特殊的业务
    console.log("Initialized");
  },
};
// 让增强的对象的__prototo__指向库
Object.setPrototypeOf(enhancedLib, Lib);
export default enhancedLib;
```

:::danger
`super`关键字必须要在类中或者要将对象的方法写成`ES6`方法的简写形式才可使用。
:::
