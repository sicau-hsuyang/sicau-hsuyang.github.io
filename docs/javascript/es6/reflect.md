## Reflect

`Reflect` 能够算的上是 `ES6` 中最没有存在感的 `API` 了，我了解 `ES6` 也是很长时间了，但是在实际项目中对于 `Reflect` 的使用也比较少。

正所谓存在即合理，为什么 `ES6` 会推出这样的一个 `API`呢，什么时候必须使用 `Reflect` 相关的 `API` 呢，本文将结合一些实际的例子和大家聊聊这些问题？

首先是从阮一峰老师的`ES6`网络书籍上摘录的一些原因：

- 1、将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。
- 2、修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。
- 3、让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。
- 4、`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

`Reflect`对象一共有 `13` 个静态方法。

```js
Reflect.apply(target, thisArg, args);
Reflect.construct(target, args);
Reflect.get(target, name, receiver);
Reflect.set(target, name, value, receiver);
Reflect.defineProperty(target, name, desc);
Reflect.deleteProperty(target, name);
Reflect.has(target, name);
Reflect.ownKeys(target);
Reflect.isExtensible(target);
Reflect.preventExtensions(target);
Reflect.getOwnPropertyDescriptor(target, name);
Reflect.getPrototypeOf(target);
Reflect.setPrototypeOf(target, prototype);
```

## Reflect.apply

在某些场景下，使用 `Reflect.apply` 可以增加我们的代码可读性，

```js
// 老写法
function isObjType(o) {
  return Object.prototype.toString.apply(p) === "[object Object]";
}

// 新写法
function isObjType(o) {
  return Reflect.apply(Object.prototype.toString, o, []);
}
```
