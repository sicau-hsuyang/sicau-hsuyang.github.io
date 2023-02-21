## instanceof

`instanceof` 在实际开发中经常用来判断类型，语法是：

```js
a instanceof b;
```

如果`a`是`b`的实例，那么这个语句返回`true`，否则返回`false`。

但是它有一个使用条件限制，参与运算的两个参数都必须是引用类型才可以。

MDN 的原文如下：

> `instanceof` 运算符用来检测`constructor.prototype`是否存在于参数`object`的原型链上。
>
> 参数 `object`，某个实例对象；
>
> 参数 `constructor`某个构造函数

`instanceof`的实现思路也特别简单，就是判断左边对象的原型链上是否存在右边的构造器的原型对象，有了这个思路，我们便可以很容易的写出来。

```js
/**
 * 判断一个对象o是否是ancestor的实例
 * @param {Object} o
 * @param {Object} ancestor
 */
function MyInstanceOf(o, ancestor) {
  // 左边参数必须是个引用类型
  if (!isRef(o)) {
    return false;
  }
  // 右边参数必须是个构造器
  if (!ancestor || typeof ancestor.prototype !== "object") {
    return false;
  }
  let proto = o.__proto__;
  // 循环终止的条件是找到头了也没有找到
  while (proto) {
    // 如果找到了可以直接返回结果
    if (proto === ancestor.prototype) {
      return true;
    }
    // 向上迭代
    proto = proto.__proto__;
  }
  return false;
}

/**
 * 判断o是否是引用类型
 * @param {Object} o
 * @returns
 */
function isRef(o) {
  return ["[object Object]", "[object Array]", "[object Function]"].includes(
    Object.prototype.toString.call(o)
  );
}
```

以下是测试用例:

```js
console.log(MyInstanceOf([], Array));

const o = {};

const parent = {};

Object.setPrototypeOf(o, parent);

console.log(MyInstanceOf(o, parent));

class A {}

class B extends A {}

class C extends B {}

const a = new A();

const c = new C();

console.log(MyInstanceOf(a, A));

console.log(MyInstanceOf(c, C));

console.log(MyInstanceOf(c, B));

console.log(MyInstanceOf(c, A));

// true
// false
// true
// true
// true
// true
```
