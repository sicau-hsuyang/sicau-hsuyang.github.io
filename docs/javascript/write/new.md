## new

`new`运算符，创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

`new`后边紧跟着一个`构造函数`或者`Class`（`Class`本质上还是一个构造函数，只不过是一个`ES6`的语法糖而已）。

在`MDN`或《你不知道的`JavaScript`》（中）所提到的 new 的过程大概如下：

- 1、创建一个`空`的简单`JavaScript`对象（即 `{}`）；
- 2、为步骤`1`新创建的对象添加属性 **proto**，将该属性链接至构造函数的原型对象；
- 3、将步骤`1`新创建的对象作为`this`的上下文；
- 4、如果该函数没有返回对象，则返回`this`。

因此，其实现大致如下：

```js
function MyNew(func, ...args) {
  if (!func || typeof func.prototype?.constructor !== "function") {
    throw new Error("the MyNew must be called by a constructor");
  }
  // 创建一个空对象
  const o = {};
  // 将当前空对象的原型挂载在构造函数的原型对象上
  o.__proto__ = func.prototype;
  // 以当前空对象为上下文执行构造函数
  const results = func.apply(o, args);
  // 如果构造函数返回的类型是引用类型，返回构造函数返回的结果，否则返回这个创建的对象
  return typeof results === "object" && results !== null ? results : o;
}
```

测试用例如下：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Joker(name, age) {
  this.name = name;
  this.age = age;
  return {};
}

function Twister(name, age) {
  this.name = name;
  this.age = age;
  return null;
}

const p1 = MyNew(Person, "Bill Gates", 80);
const p2 = MyNew(Joker, "Trump", 90);
const p3 = MyNew(Twister, "Zelensky", 60);
console.log(p1);
console.log(p1 instanceof Person);
console.log(p2);
console.log(p3);
// { name: 'Bill Gates', age: 80 }
// true
// {}
// { name: 'Zelensky', age: 60 }
```
