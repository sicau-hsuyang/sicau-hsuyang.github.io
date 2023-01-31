## 手写 call、apply、bind

这三个方法都是定义在函数上的方法，其目的都是改变函数的执行上下文`this`的指向。

它的`TS`定义如下：

```ts
/**
 * Creates a new function.
 */
interface Function {
  /**
   * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
   * @param thisArg The object to be used as the this object.
   * @param argArray A set of arguments to be passed to the function.
   */
  apply(this: Function, thisArg: any, argArray?: any): any;
  /**
   * Calls a method of an object, substituting another object for the current object.
   * @param thisArg The object to be used as the current object.
   * @param argArray A list of arguments to be passed to the method.
   */
  call(this: Function, thisArg: any, ...argArray: any[]): any;
  /**
   * For a given function, creates a bound function that has the same body as the original function.
   * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
   * @param thisArg An object to which the this keyword can refer inside the new function.
   * @param argArray A list of arguments to be passed to the new function.
   */
  bind(this: Function, thisArg: any, ...argArray: any[]): any;
}
```

第一个参数是函数本身，第二个参数是为函数执行时绑定`this`的指向，第三个参数是可选参数，代表的是原函数的实参列表，因为这是在函数的原型上的定义，当我们在使用时，其实第一个`this`参数就是函数本身，因此，这就是为什么我们在使用的时候并没有第一个参数的原因。

### 1、模拟实现 call

首先，先说一下`call`的功能，将函数的`this`上下文绑定在某个对象执行，原函数的参数以剩余参数逐个传递的形式传递。如果对于`call`的实现原理不太明白的同学可以先参考一下我阐述`this`的文章。

根据`this`的默认绑定规则，函数的调用者是谁，`this`就执行谁，那我们自然而然就会想到，把当前函数赋值给指定的上下文对象的某个`key`上，然后执行。有了实现思路之后，就可以很容易的编写出如下代码：

```js
typeof Function.prototype.call !== "function" &&
  (Function.prototype.call = function (ctx, ...args) {
    // 如果直接调用函数原型上的方法，就返回undefined;
    if (this === Function.prototype) {
      return;
    }
    // 默认绑定为window
    ctx = ctx || window;
    // 为了防止key在上下文对象上造成冲突，使用Symbol作为key
    const prop = Symbol("call");
    // 把当前函数赋值给这个临时key
    ctx[prop] = this;
    // 执行函数，并且把函数执行结果记录下来
    const result = ctx[prop](...args);
    // 为了防止对执行上下文对象造成污染，还需要删除这个临时key
    delete ctx[prop];
    // 返回函数的执行结果
    return result;
  });
```

上述代码，因为`call`接受的是剩余参数的形式，因此，我们需要用扩展运算符将第二个以后的参数收集成一个数组，但是在函数执行的时候，又必须将这个数组打散。

### 2、模拟实现 apply

在理解了`call`之后，编写`apply`就容易得多了，为了避嫌，我们不会借用`call`的实现，但是之所以这样说，是因为`apply`的原理和`call`几乎完全一样.

模拟实现如下：

```js
typeof Function.prototype.apply !== "function" &&
  (Function.prototype.apply = function (ctx, args) {
    // 如果直接调用函数原型上的方法，就返回undefined;
    if (this === Function.prototype) {
      return;
    }
    // 默认绑定为window
    ctx = ctx || window;
    // 为了防止key在上下文对象上造成冲突，使用Symbol作为key
    const prop = Symbol("apply");
    // 把当前函数赋值给这个临时key
    ctx[prop] = this;
    // 执行函数，并且把函数执行结果记录下来
    const result = ctx[prop](...args);
    // 为了防止对执行上下文对象造成污染，还需要删除这个临时key
    delete ctx[prop];
    // 返回函数的执行结果
    return result;
  });
```

### 3、模拟实现 bind

`bind`方法和上述两个方法有一点区别较大，`bind`是得到一个绑定了`this`上下文的函数，而上述两个函数立即就执行了。

`bind`还有一个需要注意的点是，在`bind`执行的时候，可以事先为函数预设参数，得到的函数最终执行的时候，入参会和之前绑定过的进行合并。

模拟实现如下：

```js
typeof Function.prototype.bind !== "function" &&
  (Function.prototype.bind = function (ctx, ...bindArgs) {
    const prop = Symbol("bind");
    ctx = ctx || window;
    const _this = this;
    // 返回一个新函数
    return function Construct(...restArgs) {
      // 如果当前函数被当做构造函数来用的话，直接返回合并之后的结果
      if (this instanceof Construct) {
        return new _this(...[...bindArgs, ...restArgs]);
      }
      ctx[prop] = _this;
      // 如果当前普通函数用，合并参数再执行
      const result = ctx[prop](...[...bindArgs, ...restArgs]);
      delete ctx[prop];
      return result;
    };
  });
```
