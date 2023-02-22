## 柯里化

> 在计算机科学中，柯里化（`Currying`）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

这是比较官方的话术，如果没有一些实际的开发经验的话，有些同学可能不太好懂

因此从几个例子体会一下，柯里化在实际开发中带来的收益

### 判断数据的类型

由于`JS`的历史渊源，`typeof`运算符对于`null`来说，得到的值是`object`。另外，不管参数是数组还是对象，`typeof`得到的结果都是`object`，会对我们造成一些困扰，其余场景返回对应的结果。因此，我们需要封装一些逻辑才能得到一个符合实际开发需要的类型判断方法。

```js
/**
 * 判断一个数据的类型
 * @param {any} o
 * @returns
 */
function getType(o) {
  if (o === null) {
    return "null";
  } else if (typeof o === "object") {
    return Array.isArray(o) ? "array" : "object";
  } else {
    return typeof o;
  }
}
```

但是，这个方法对于调用者来说，是非常难受的，如果你读过一些常见的开源库的源码的话，在它们的工具方法中会封装出类似的方法。

调用方来说，比如要判断当前对象是否是`null`，代码肯定不能写成`getType(o) === 'null'`，那调用方每次都还要去关心`getType`的返回值了，直接给调用方造成了心智负担，并且，这种代码其实是跟平台(比如要判断当前函数的`this`是否指向`globalThis`，不同的平台`nodejs`是`Global`对象，浏览器是`window`对象)耦合在一起了的，这种编码是无法接受的。

于是，我们需要做的事儿还需要继续做。

```js
function isType(expectType, o) {
  return expectType === getType(o);
}
```

有了这个`isType`函数，只是更进一步了，为了降低外界的心智负担，我们最好的办法是直接给它一个确切类型的判断函数。所以，我们会在`isType`再封装一次，直接把`expectType`给确定下来，这样调用者直接使用特定类型的判断函数，他得到一个`true`or`false`，就比较清爽了。

```js
export function isNull(o) {
  return isType("null", o);
}
export function isArray(o) {
  return isType("array", o);
}
export function isObject(o) {
  return isType("object", o);
}
export function isNumber(o) {
  return isType("number", o);
}
//...
```

本来，`isType`是一个接收多个参数的函数，但是被我们提前确定了第一个参数(`isNull`，`isArray`，`isObject`)，然后返回接受剩下参数的函数了。

说到这儿，其实您大概也理解了柯里化的意思了吧，我大概的理解就是：**降低函数的通用性，提高函数的专用性**

另外，如果跟闭包技术结合的话，柯里化另外一个作用起到了一个`提前确定参数，延迟计算`的效果（比如我们得到的`isNull`，最后执行的时候取决于外界调用，但是只是事先的确定了`expectType`）

有的同学可能遇到过这个比较变态的面试题：

```js
// 实现一个`add`函数，要求能够达到一下效果
add(1)(2)(3)(4); // 10
add(1, 2)(3, 4); // 10
add(1)(2, 3, 4); // 10
add(1, 2, 3)(4); // 10
add(1, 2, 3, 4); // 10
```

需要观察，`add`函数如果一下子传递`4`个参数的话，那么就可以直接算出结果了，如果只传递小于`4`个参数，它得到的是一个函数，并且，最终达到`4`个参数也会求值。

发现了这个特点以后，代码就比较好写了:

```js
function _add(a, b, c, d) {
  return a + b + c + d;
}

/**
 * 通用柯里化函数
 * @param {Function} fn
 * @param  {any[]} outerArgs
 * @returns
 */
function currying(fn, ...outerArgs) {
  return function (...innerArgs) {
    const args = [...outerArgs, ...innerArgs];
    // 如果参数已经确定完毕了，则执行传入的函数
    if (args.length === fn.length) {
      return fn.apply(this, args);
    } else {
      // 否则，将已经确定的参数绑定，递归调用currying
      return currying(fn, ...args);
    }
  };
}

const add = currying(_add);
```

其实这个通用的柯里化函数看起来还是比较好理解的，首先，柯里化是不断的在为函数确定参数，为谁确定参数，那肯定是需要用户传入的函数，剩下的就是用户随意传递的参数了，用户传递的函数的参数个数是确定的，一旦参数确定完成了，那这个函数肯定就可以执行了；如果还没有确定完，因为要对外返回一个函数，最简单的办法就是递归调用当前这个处理流程。

这个通用的柯里化函数也可以用来处理最开始我们的那个场景，如：

```js
export function isNull(o) {
  return currying(isType, "null")(o);
}
export function isArray(o) {
  return currying(isType, "array")(o);
}
export function isObject(o) {
  return currying(isType, "object")(o);
}
export function isNumber(o) {
  return currying(isType, "number")(o);
}
```
