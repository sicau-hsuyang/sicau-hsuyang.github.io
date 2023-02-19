## 扩展运算符

扩展运算符，`...`是`ES6`引入的一个相当实用的语法，它具有`收集`和`展开`的功能，本文将会从`2`个大类的一些实际应用场景（由于`迭代器`的场景众多，关于`迭代器`的应用，我将其作为单独的一节来阐述），结合`babel`的编译结果来学习一下`JS`引擎底层到底做了什么神奇的事儿。

### 1、对象

在对象上的运用主要是`解构赋值`

#### 1.1、对象的拷贝 或者 合并

```js
// 对象的合并
const obj1 = {
  a: 1,
  b: 2,
  c: 3,
};
const obj2 = {
  a: "xxx",
  d: "ddd",
  k: 2,
};
const newObj = {
  ...obj1,
  ...obj2,
};
console.log(newObj);
```

这种场景，就好比把一个个对象敲碎，然后再填入到一个新的对象里面去，所以体现的是扩展运算符的`展开`的作用。

编译后的结果如下：

```js
"use strict";
/**
 * 获取一个对象上包含Symbol在内的所有key
 * @param {Object} object 目标对象
 * @param {boolean} enumerableOnly 在获取Symbol类型的key时，是否只获取可枚举的
 * @returns
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    // 过滤掉Symbol的key中不可枚举的
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
/**
 * 对象展开，将除了target以外的所有key全部合并到target中
 * @param {Object} target
 * @returns
 */
function _objectSpread(target) {
  // 从第一个参数开始，分别对后面的参数进行处理
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    /* 这段是babel编译的结果，但是看起来不是那么直观，也于是决定对其进行改写 */
    // i % 2
    //   ? ownKeys(Object(source), !0).forEach(function (key) {
    //       _defineProperty(target, key, source[key]);
    //     })
    //   : Object.getOwnPropertyDescriptors
    //   ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    //   : ownKeys(Object(source)).forEach(function (key) {
    //       Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    //     });
    /* 为什么对 序号为偶数的key才去单独处理，没看懂这样的意义是什么？ */
    if (i % 2) {
      ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else {
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        );
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }
  }
  return target;
}
/**
 * 以兼容的方式定义对象的属性和值
 * @param {object} obj
 * @param {string} key
 * @param {any} value
 * @returns
 */
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var obj1 = {
  a: 1,
  b: 2,
  c: 3,
};
var obj2 = {
  a: "xxx",
  d: "ddd",
  k: 2,
};
var newObj = _objectSpread(_objectSpread({}, obj1), obj2);
console.log(newObj);
```

```js
// 对象的拷贝
const obj = {
  a: 1,
  b: {},
};
const copy = { ...obj };
```

上述代码原理和对象的合并是一样的，此处就不再贴`babel`的编译结果了。

对于这种方式拷贝对象，需要注意的问题是，如果`obj`对象上全部是基础类型的话，相当于是做了一次`深拷贝`（**`Symbol`类型一样是可以拷贝的**），而如果有引用类型的话就不再是深拷贝了，如果明确了这个点，在实际开发中就可以得心应手的处理各种问题了。

综上所述，这种场景的`...`其实它就是`Object.assign`的语法糖而已。

#### 1.2、提取需要的字段

取出某些键，将剩余的键收集到一个对象中，在实际开发中，可能你不想处理某些键（有点儿类似`lodash`的`omit`等操作，在`map`的时候，如果想刻意的丢弃一些键值，这个可比直接取对象出来然后再使用`delete`操作符方便的多呀）。或者说，需要对键值，需要分开处理的场景。

```js
const obj = { a: 1, b: 2, c: 3 };
const { a, ...rest } = obj;
console.log(a, rest);
```

这种场景，就好比把`obj`上的一些键值填到了叫做`rest`的对象里面，所以体现的是扩展运算符的`收集`的作用。

`babel`的编译结果：

```js
/**
 * 移除source对象中包含exclude的键（包含Symbol）
 * @param {Object} source 源对象
 * @param {Object} excluded 用来匹配需要删除的键的对象
 * @returns {Object}
 */
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  // 如果当前环境支持Symbol，Symbol类型的key也可以拷贝，但是对于不能枚举的Symbol属性则不拷贝
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      // 不处理不可枚举的Symbol
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
/**
 * 宽松的移除source对象中包含exclude的键
 * @param {Object} source 源对象
 * @param {Object} excluded 用来匹配需要删除的键的对象
 * @returns {Object}
 */
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  // 不对当前对象原型上的属性进行处理
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var obj = {
  a: 1,
  b: 2,
  c: 3,
};
var a = obj.a,
  rest = _objectWithoutProperties(obj, ["a"]);
console.log(a, obj);
```

### 2、数组

#### 2.1、函数参数聚合

众所周知，箭头函数是没有`arguments`这个内置对象的，但是有些时候我们又希望`箭头函数`能够处理不定参数，此时`...`就是一个应用场景。

```js
// 不定参数的求和函数
const sum = (...args) => {
  // 此时将会把多个参数聚合成一个数组
  return args.reduce((total, cur) => {
    return total + cur;
  }, 0);
};
```

这种场景也体现的也是扩展运算符的`收集`作用。

`babel`的编译结果为：

```js
"use strict";
// 不定参数的求和函数
var sum = function sum() {
  for (
    var _len = arguments.length, args = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key];
  }

  // 此时将会把多个参数聚合成一个数组
  return args.reduce(function (total, cur) {
    return total + cur;
  }, 0);
};
```

不出意外，借助函数的`arguments`是最简单的实现了，只是需要额外处理一下`this`即可（因为求和函数没有用到，所以没有这部分的处理，但是实际上会有）。

还有这种用法:

```js
const sum = (a, b, ...rest) => {
  return (
    a * 100 +
    b * 10 +
    rest.reduce((total, cur) => {
      return total + cur;
    }, 0)
  );
};
```

原理和上面的是一样的，但是这种用法剩余参数只能在最后一个参数，因为这样编译器才知道分配多少个参数到`rest`变量身上，否则就乱套了。

#### 2.2、接受多个参数的函数

这个经常见到，比如常见的`JS`原生函数的`TS`定义：

```ts
interface Math {
  /**
   * Returns the larger of a set of supplied numeric expressions.
   * @param values Numeric expressions to be evaluated.
   */
  max(...values: number[]): number;
  /**
   * Returns the smaller of a set of supplied numeric expressions.
   * @param values Numeric expressions to be evaluated.
   */
  min(...values: number[]): number;
}

interface Console {
  log(message?: any, ...optionalParams: any[]): void;
}

interface Array<T> {
  push(...items: T[]): number;
}
```

这个操作和上面的操作是相反的。在传递参数的时候，我们可以传递一个数组。

这种场景下，体现的是扩展运算符的`展开`的作用。

比如:

```js
const arr = [1, 2, 3];
console.log(...arr);
Math.max(...arr);
```

`babel`编译之后的结果如下：

```js
"use strict";

var _console;

var arr = [1, 2, 3];

(_console = console).log.apply(_console, arr);

Math.max.apply(Math, arr);
```

这种情况下，是`apply`的语法糖。

#### 2.3、数组合并 或 拷贝

对于数组合并，这个`babel`编译的结果有一定的非预期。

```js
const arr = [1, 2, 3];
const b = [3, ...arr];
console.log(b);
```

`babel`的编译结果:

```js
var arr = [1, 2, 3];
var b = [3].concat(arr);
console.log(b);
```

上述代码，如果我们在数组上手动部署了迭代器的话，`babel`编译的时候会忽略，仍然使用`concat`，但是在支持`ES6`的环境下体现出来的是迭代器的效果。

对于这种`case`下的数组拷贝的话，仍然和上文提到的对象拷贝是一样的，如果说数组的元素每一个都是引用类型的话，就相当于深拷贝了一个数组的壳，而里面的元素还是引用的是和原数组相同的内容，但如果数组的元素是基本类型的话，就相当于完完全全的拷贝了一个数组，这种场景等价于：

```js
const arr = [1, 2, 3];
const copiedArr = arr.map((v) => v);
```

### 3、迭代器

对于这一节，应用就比较广泛了，上文我们提到过，对于数组的合并也是基于这个操作。

所以回归到本质，`ES6`哪些结构是部署了`Iterator`的结构呢？

- `String`
- `Array` (或者 `TypedArray`，指的是那一大堆跟`二进制`数据结构相关的类型)
- `Generator`函数的执行结果
- `Map`和`Set`
- 函数的`arguments`对象
- `NodeList`对象

在`Array`上应用，目前从`babel`的编译结果看存在一些非预期。

```js
const arr = [1, 2, 3, 4, 5];
arr[Symbol.iterator] = function () {
  let idx = 0;
  return {
    next() {
      const val = {
        value: idx + 1,
        done: idx >= 10,
      };
      idx++;
      return val;
    },
  };
};

const b = [...arr]; // [1,2,3,4,5,6,7,8,9,10]
```

`babel`的编译结果:

```js
var arr = [1, 2, 3, 4, 5];

arr[Symbol.iterator] = function () {
  var idx = 0;
  return {
    next: function next() {
      var val = {
        value: idx + 1,
        done: idx >= 10,
      };
      idx++;
      return val;
    },
  };
};

var bbb = [].concat(arr);
```

对于上面的代码，按目前已经支持`ES6`的浏览器运行结果，`b`的结果是`[1,2,3,4,5,6,7,8,9,10]`，但`babel`的编译结果明显是`[1,2,3,4,5]`不知道这是`babel`的`bug`还是什么其它方面的限制呢，有兴趣的同学可以探究一下。

但是这种场景属于极端的场景，一般业务代码肯定轮不到我们去自定义数组的迭代器的，把`Array`处理成`concat`明显要比操作`迭代器`简单很多。

在`String`上应用

```js
const str = "hello world";
const arr = [...str];
```

`babel`的编译结果如下：

```js
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

var str = "hello world";

var arr = _toConsumableArray(str);
```

在`Map`或`Set`，`Generator`函数，`NodeList`对象上的应用和`String`类似，有兴趣的读者可以自己试一下（只不过`Generator`函数`babel`编译了一个`generator-runtime`的库，代码比较多而已）。

在`arguments`上应用：

```js
function func() {
  const args = [...arguments];
  console.log(args);
}
```

`babel`编译结果:

```js
function func() {
  var args = Array.prototype.slice.call(arguments);
  console.log(args);
}
```

说了这么多，其实上述场景我们都只是在做一件事，即`Array.from`的语法糖，这个方法的`TS`定义如下。

```ts
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}

interface ArrayConstructor {
  /**
   * Creates an array from an array-like object.
   * @param arrayLike An array-like object to convert to an array.
   */
  from<T>(arrayLike: ArrayLike<T>): T[];

  /**
   * Creates an array from an iterable object.
   * @param arrayLike An array-like object to convert to an array.
   * @param mapfn A mapping function to call on every element of the array.
   * @param thisArg Value of 'this' used to invoke the mapfn.
   */
  from<T, U>(
    arrayLike: ArrayLike<T>,
    mapfn: (v: T, k: number) => U,
    thisArg?: any
  ): U[];
}
```

在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)的定义阐述的是**对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。**，多了支持可迭代对象这个条件。

### 4、易错点

这儿有一个易错点。 在`React`中，我们很有可能会看到这种代码

```jsx
class MyButton extends Component {
  render() {
    const props = { ...this.props, name: "我自己封装的Button" };
    return <Button {...props} />;
  }
}
```

这个扩展运算符对对象的`props`进行批量传递，是`React`生态自己的支持（相当于是人家多了一个插件去转码这个语法，而原生`JS`是不支持这种语法的），需要注意一下区别。
