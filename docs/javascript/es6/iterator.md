## Iterator 和 for-of 循环

在阐述这篇文章之前，首先看一道比较经典的面试题，可能看过之后大家将会为什么技术积累有多么的重要了。（在阅读本文之前，请确保你已经完全掌握`Symbol`的相关知识点。）

为了使得下面的代码按预期运行，请问在右侧的对象上需要进行什么操作？

```js
const [a, b] = { a: 1, b: 2 };
```

既然这题放在`Iterator`这一节，那么肯定是跟 Iterator 的知识点相关了，如果你一时半会儿还没有任何思路的话，请先接着往下面看，然后你心中自然就会有答案了。

### 1、基本概念

遍历器（`Iterator`），它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署`Iterator`接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

在`ES6`之前只有`数组`和`对象`这两种表示`集合`的数据结构，但是`ES6`增加了很多的数据结构(如`Map`，`Set`)，因此`Iterator`的出现可以使得这些数据结构的遍历有一套标准的方法，`ES6`创造了一种新的遍历命令`for...of`循环，`Iterator`接口主要供`for...of`消费。

遍历器接口（`Iterable`）、指针对象（`Iterator`）和`next`方法返回值的规格可以描述如下。

```ts
interface Iterable {
  [Symbol.iterator](): Iterator;
}

interface Iterator {
  next(value?: any): IterationResult;
}

interface IterationResult {
  value: any;
  done: boolean;
}
```

原生具备`Iterator`接口的数据结构如下。

- `Array`
- `Map`
- `Set`
- `String`
- `TypedArray`
- 函数的`arguments`对象
- `NodeList`对象

也就是说，这些数据结构天生支持`for-of`遍历，并且我们可以拿上述这些数据结构自带的`Iterator`进行迭代:

```js
// 手动调用String的Iterator
const str = "hello world";
// 得到string的Iterator
const it = str[Symbol.iterator]();
it.next();
// {value: 'h', done: false}
it.next();
// {value: 'e', done: false}
it.next();
// {value: 'l', done: false}
it.next();
// {value: 'l', done: false}
it.next();
// {value: 'o', done: false}
it.next();
// {value: ' ', done: false}
it.next();
// {value: 'w', done: false}
it.next();
// {value: 'o', done: false}
it.next();
// {value: 'r', done: false}
it.next();
// {value: 'l', done: false}
it.next();
// {value: 'd', done: false}
it.next();
// {value: undefined, done: true}
```

```js
const str = "hello world";
for (const char of str) {
  console.log(char);
}
```

可以看到，如果我们自己去调用`String`的`Iterator`的话，最后会输出一个`{value: undefined, done: true}`的结果，可是为什么`for-of`循环没有输出这个结果呢？

:::warning
这儿有一个重要的结论：`for-of`循环只会遍历迭代器`done`的值为`false`的结果
:::

所以，如果用`for-of`循环遍历`Generator`生成的迭代器的话，无法处理到最后`Generator`函数的`return`值的(若有)。

### 2、调用 Iterator 的场合

如果你认真的阅读完本节，就可以回答本文开头提到的面试题了。除了`for-of`循环，主要在这几类场合会默认调用`Iterator`

- **解构赋值**: 对数组和`Set`结构进行解构赋值时，会默认调用`Symbol.iterator`方法。
- **扩展运算符**: 扩展运算符`...`也会调用默认的 `Iterator` 接口。
- `yield*`: `yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

```js
let generator = function* () {
  yield 1;
  yield* [2, 3, 4];
  yield 5;
};

var iterator = generator();

iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: 4, done: false }
iterator.next(); // { value: 5, done: false }
iterator.next(); // { value: undefined, done: true }
```

- 其它场合:
- `for...of`
- `Array.from()`
- `Map()`, `Set()`, `WeakMap()`, `WeakSet()`（比如 new Map([['a',1],['b',2]])）
- `Promise.all()`
- `Promise.race()`

因此，对于我们在文章开头提到的那题，我们只能从`解构赋值`的场景去思考，把右侧的内容当成一个数组，但是因为对象并不原生具备`Iterator`，因此，我们就可以给他补一个`Iterator`就可以使得代码正常运行了。

```js
const [a, b] = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    const keys = Object.keys(this);
    let idx = 0;
    const _this = this;
    return {
      next() {
        const i = idx++;
        return {
          value: _this[keys[i]],
          done: i >= keys.length,
        };
      },
    };
  },
};
```

需要注意的是，因为这种解构方式并不是原生支持的方式，有可能键取值顺序的关系，`a`和`b`变量并不是一定拿到的就是 `1` 和 `2`，仅仅是这行代码能够正常工作而已（**对象（`Object`）之所以没有默认部署`Iterator`接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定**）。

### 3、遍历器对象的 return 方法和 throw 方法

遍历器对象除了具有`next`方法，还可以具有`return`方法和`throw`方法。如果你自己写遍历器对象生成函数，那么`next`方法是必须的，`return`方法和 `throw`方法是可选的。
