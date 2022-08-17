## 函数上下文——this

如果你是一个`JS`的初学者，`this`这一定是一个能够让你欲哭无泪的语法。像`C#`，`Java`这类语言，如果类的方法是非静态的，那么`this`指向的就是类的实例，如果是静态方法，那么就指向类本身，而`JS`的`this`是可变的，在没有搞懂`this`之前，不妨忘记之前学过的知识，以利于学习。

它有一个更加贴切的名字，**函数上下文**，这个名字恰到好处的表达了`this`的含义。

当函数在不同的环境下执行，`this`的指向是不同的，简言之就是哪个对象调用的这个函数，`this`就指向那个对象。

## `this`的默认绑定

默认情况的`this`调用都是隐式绑定，即谁调用，指向谁。因此，这节所有内容都不考虑方法被强制指定`this`的情况

### 方法中的`this`

```JS
let person = {
  firstName: "Bill",
  lastName: "Gates",
  id: 123,
  fullName: function(){
    return this.firstName + " " + this.lastName;
  }
};

person.fullName() // Bill Gates

let fullName = person.fullName;

fullName(); // "undefined undefined"
```

如果在 ES6 的`class`中的话，`this`的指向分两种情况：

```js
class App {
  static run() {
    console.log(this);
  }

  log() {
    console.log(this);
  }
}
```

对于静态方法中的`this`，默认指向的是当前`class`（如`run`方法的`this`指向`App`），对于非静态方法的`this`，默认指向的是当前`class`的原型对象(如`log`方法的`this`指向`App.prototype`)

### 单独的`this`

```js
console.log(this); // globalThis
```

在单独使用时，拥有者是全局对象，`this`指的是全局对象，即`globalThis`，对于`nodejs`，`globalThis`指向的是`global`对象，而对于浏览器，
`globalThis`指向的是`window`对象，这就是上小节内容为什么`fullName()`输出的内容是`"undefined undefined"`，而对于`WebWorker`中，`this`指向`self`对象。

### 函数的`this`

```JS
function Person(){
  return this;
}
```

非严格模式中，函数的拥有者默认绑定`this`，因此，在函数中，`this`指的是全局对象`globalThis`。

**严格模式不允许默认绑定**，因此，在函数中使用时，在严格模式下，`this`是未定义的`undefined`。

### 事件处理中的`this`

```html
<button onclick="this.style.display='none'">点击来删除我！</button>
```

`this`指向的是当前触发事件的元素，如上面例子中，`this`指向的是`button`

## 改变`this`的默认绑定方式

由于`this`的可变性，导致我们的程序可能会变的脆弱，因此，需要在某些时候明确`this`的指向。

### `new`

```JS
function Person(){
  console.log(this instanceof Person)
  console.log(new.target);
}

const people = new Person(); // Person Person
```

这是一个隐式改变`this`的调用，同时又是`this`绑定中**优先级最高**的调用。

有了这个手段，我们可以用来判断函数是否是被用于`new`的形式调用，下面的代码就是`babel`转码`class`的结果的节选。

在`ES6`中为`new`引入了一个新的数据`target`，也可以用来判断是否是通过`new`调用的。

```js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
```

接下来就是一个比较迷惑也不迷惑的面试题了，如下：

```JS
const obj = {
  name: 'JohnYang',
  age: 28,
}
function Person(){
  console.log(this instanceof Person)
  console.log(new.target);
  console.log(this.name, this.age);
}
// 想强制指定this为obj
const MyPerson = Person.bind(obj);

const p = new MyPerson();
```

因为使用`new`调用时的`this`绑定优先级是最高的，所以其实`MyPerson`就是`Person`，`this`上不存在`name`和`age`，因此最终输出的是`undefined undefined`

### `call`，`apply`，`bind`

这几个问题是面试题中考场最多的问题之一了，面试官：“请问`call`，`apply`，`bind`三者有什么区别，并说出如何实现”?

本文不讨论它们的实现，只讨论用法。

```JS
interface Function {
  apply(this: Function, thisArg: any, argArray?: any): any;
  call(this: Function, thisArg: any, ...argArray: any[]): any;
  bind(this: Function, thisArg: any, ...argArray: any[]): any;
}
```

首先，`call`和`apply`几乎是差不多的，它们的第一个参数都是`this`上下文，而`call`是接受`N`个参数，一字排开，而`apply`是接受一个由函数的`N`个参数组成的数组（类数组对象也可以的），然后这个函数就被立即执行了。

如：

```js
let firstName = "John";
let lastName = "Yang";
let person = {
  firstName: "Bill",
  lastName: "Gates",
  id: 123,
  fullName: function (arg1, arg2) {
    console.log(arg1, arg2);
    return this.firstName + " " + this.lastName;
  },
};
person.fullName.apply(person, ["hello", "world"]); // "hello" "world" 返回 "Bill Gates"
const fullName2 = person.fullName.bind(window, "hello", "world"); // "hello" "world" 返回 "John Yang"
```

而`bind`和它们两者有个最大的不同，**`bind`是返回一个被改变了`this`指向的函数**。

`bind`在使用的过程中还可以预制一些参数，那么得到的函数在执行的时候就可以省略掉预制的参数，如：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const MyPerson = Person.bind(window, "Tom");

const p = new MyPerson("28"); // { name:'Tom', age: '28' }
const yang = new MyPerson("Yang", "28"); // { name:'Yang', age: '28' }
```

### 箭头函数

箭头函数的`this`其实本质并不是改变了`this`的默认绑定，但是为了说明改变`this`指向的手段，就将其暂且的列在这一小节了。

```js
class MyButton extends React.Component {
  onClick = () => {
    console.log(this.name);
  };

  render() {
    return <button onClick={this.onClick}>Hello World</button>;
  }
}
```

`ES6`中引入的新语法，箭头函数的`this`永远指向当前的父作用域的`this`，如在`React`的组件中可以经常看到上述代码。

接下来看一段转码前与转码后的代码。

转码前：

```js
class A {
  name = "A";

  say = () => {
    console.log(this.name);
  };
}

const D = () => {
  console.log(this);
};
```

转码后：

```js
var _this2 = void 0;

var A = /*#__PURE__*/ _createClass(function A() {
  var _this = this;

  _classCallCheck(this, A);

  _defineProperty(this, "name", "A");

  _defineProperty(this, "say", function () {
    console.log(_this.name);
  });
});

var D = function D() {
  console.log(_this2);
};
```

## `this`绑定的优先级

说完了`this`在实际开发中的场景之后，最后来聊一下`this`绑定的优先级的问题。

对于隐式绑定（或默认绑定）来说优先级是最低的（谁调用，指向谁），其次是使用`call`，`apply`，`bind`进行的显示绑定，优先级次之，最后是通过`new`调用的`new`绑定，优先级最高。

这儿并没有讨论箭头函数的`this`的优先级，因为箭头函数的`this`绑定在父级作用域下，是`babel`通过定义特定作用域下的变量，转化使得函数的最终的`this`能够符合预期，是语法糖，属于作用域链的范畴，跟`this`绑定无关。
