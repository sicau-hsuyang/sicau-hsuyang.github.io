## `Array`方法的一些实现

首先，最直接的办法还是通过`VSCode`查看一个数据方法的定义，我们就拿`Array.prototype.filter`来举例，以下是它的`TS`的定义：

```ts
interface Array<T> {
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[];
}
```

先解释一下这个类型体操的含义，读取外部的`predicate`函数，执行之后得到一个结果，这个结果是数组的子元素，最终由这些子元素组成一个新的数组，其中，`thisArg`作为一个可选参数，可以决定`predicate`的函数上下文，若不传，则为`undefined`。

数组其实是一个特殊的对象。

数组的这些标准遍历方法都有**一个共同的特征，遍历时，它会跳过为空的元素，这个空并不是说这个元素的值是`undefined`（用英语单词表达叫做`hole`，翻译过来就是`洞`），而是跳过并没有这个键的位置**.
比如：

```js
const a = [1, 2, 3, 4, 5];
a[6] = 7;
// [1, 2, 3, 4, 5, empty, 7]，其中，这个empty就是表示的当前索引上存在hole的意思
```

又如：

```js
const b = [undefined];
// 数组b是真的有一个key为0，只不过这个值是undefined而已
```

### `Array.prototype.filter`

`filter`方法的定义是，每次遍历的时候，将当前元素以及它所在的索引值传递给回调函数，如果回调函数返回为`true`，数组当前这个索引上的元素将会被添加到结果集中。

```js
function nullOrUndefinedCheck() {
  if (this == null || this === undefined) {
    throw new TypeError("filter can not called by null or undefined");
  }
}

function callbackCheck(callback) {
  if (typeof callback !== "function") {
    throw new TypeError("predicate must be a function");
  }
}

Array.prototype.filter = function (callback, thisArg) {
  // 异常断言
  nullOrUndefinedCheck() && callbackCheck(callback);
  // 强制将数组转化成对象
  const O = Object(this);
  // 将数组的length向右移动0位，这个操作的含义是，如果对象的length负数，二进制表示法它将会是其绝对值的补码表示，无符号向右移动，
  // 相当于将其强制看成一个无符号数，于是，将会得到一个很大的值，并且一定是正数。但是对于非负数，却是没有任何影响的
  const length = O.length >>> 0;
  // 定义一个结果集
  const res = [];
  for (let i = 0; i < length; i++) {
    // 此处必须要用in操作符，因为有可能当前值存在，但是结果肯呢个是falsy，判断就不准确了
    // 并且in操作符会沿着原型依次判断
    // 为callback绑定用户传入的this上下文，然后分别填充它需要的3个参数
    if (i in O && callback.call(thisArg, O[i], i, O)) {
      res.push(O[i]);
    }
  }
  // 返回一个新的结果集
  return res;
};
```

比如对数组去重，正常我们需要使用两重`for`循环（不太聪明的办法），而使用`filter`来做这件事，代码的简洁度就比较高（本质上和两重`for`循环是一个意思），

```js
/**
 * 数组去重
 */
function removeDuplicate1(arr) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    let flag = true;
    // 在结果集中查找元素，如果找到了，提前终止循环
    for (let k = 0; k < results.length; k++) {
      const compare = results[k];
      if (compare === cur) {
        flag = false;
        break;
      }
    }
    // 没找到，把当前索引的元素添加到结果集中
    if (flag) {
      results.push(cur);
    }
  }
  return results;
}

/**
 * 数组去重
 */
function removeDuplicate(arr) {
  return arr.filter((val, idx) => {
    // 判断当前元素是否是第一次出现在数组中的位置和它所在的索引位置是否一样
    return arr.indexOf(val) === idx;
  });
}
```

### `Array.prototype.map`

在明白了`filter`方法的实现之后，`map`方法就相当好写了，但是事情并不是我们想的那么简单。

先看一下这个场景的结果：

```js
const a = [];
a[3] = 2;
a[100] = 4;
const result = a.map((v) => {
  console.log(v);
  return String(v);
});
// [empty × 3, '2', empty × 96, '4']
```

所以万事一定不能想当然啊~

```js
Array.prototype.map = function (call, thisArg) {
  // 异常断言
  nullOrUndefinedCheck() && callbackCheck(callback);
  // 强制将数组转化成对象
  const O = Object(this);
  // 将数组的length向右移动0位，这个操作的含义是，如果对象的length负数，二进制表示法它将会是其绝对值的补码表示，无符号向右移动，
  // 相当于将其强制看成一个无符号数，于是，将会得到一个很大的值，并且一定是正数。但是对于非负数，却是没有任何影响的
  const length = O.length >>> 0;
  const res = [];
  // 必须让新数组上的长度和原数组保持一致，也就是说，原来本来有洞的位置还是得留着，不能抹掉
  res.length = length;
  for (let i = 0; i < length; i++) {
    // 如果当前位置存在元素
    if (i in O) {
      // 将回调函数转化之后的结果返回给新数组
      res[i] = callback.call(thisArg, O[i], i, O);
    }
  }
  // 返回处理之后的结果
  return res;
};
```

### `Array.prototype.forEach`

```js
Array.prototype.forEach = function (callback, thisArg) {
  // 异常断言
  nullOrUndefinedCheck() && callbackCheck(callback);
  // 强制将数组转化成对象
  const O = Object(this);
  // 将数组的length向右移动0位，这个操作的含义是，如果对象的length负数，二进制表示法它将会是其绝对值的补码表示，无符号向右移动，
  // 相当于将其强制看成一个无符号数，于是，将会得到一个很大的值，并且一定是正数。但是对于非负数，却是没有任何影响的
  const length = O.length >>> 0;
  for (let i = 0; i < length; i++) {
    // 跨过hole
    if (i in O) {
      callback.call(thisArg, O[i], i, O);
    }
  }
};
```

### `Array.prototype.every`

```js
Array.prototype.every = function (callback, thisArg) {
  // 异常断言
  nullOrUndefinedCheck() && callbackCheck(callback);
  // 强制将数组转化成对象
  const O = Object(this);
  // 将数组的length向右移动0位，这个操作的含义是，如果对象的length负数，二进制表示法它将会是其绝对值的补码表示，无符号向右移动，
  // 相当于将其强制看成一个无符号数，于是，将会得到一个很大的值，并且一定是正数。但是对于非负数，却是没有任何影响的
  const length = O.length >>> 0;
  for (let i = 0; i < length; i++) {
    // 跨过hole
    if (i in O) {
      // 有一个是false，就可以直接对外返回false
      if (!callback.call(thisArg, O[i], i, O)) {
        return false;
      }
    }
  }
  return true;
};
```

### `Array.prototype.some`

```js
Array.prototype.some = function (callback, thisArg) {
  // 异常断言
  nullOrUndefinedCheck() && callbackCheck(callback);
  // 强制将数组转化成对象
  const O = Object(this);
  // 将数组的length向右移动0位，这个操作的含义是，如果对象的length负数，二进制表示法它将会是其绝对值的补码表示，无符号向右移动，
  // 相当于将其强制看成一个无符号数，于是，将会得到一个很大的值，并且一定是正数。但是对于非负数，却是没有任何影响的
  const length = O.length >>> 0;
  for (let i = 0; i < length; i++) {
    // 跨过hole
    if (i in O) {
      // 有一个是false，就可以直接对外返回false
      if (callback.call(thisArg, O[i], i, O)) {
        return true;
      }
    }
  }
  return false;
};
```

### `Array.prototype.reduce`

`reduce`的定义稍微和前面几个函数不一样。它没有第二个`thisArg`用来绑定`callback`上下文的参数，而是多了一个可选参数，以它作为迭代的初始值。

```js
Array.prototype.reduce = function (callback, initialValue) {
  // 异常断言
  nullOrUndefinedCheck() && callbackCheck(callback);
  // 强制将数组转化成对象
  const O = Object(this);
  // 将数组的length向右移动0位，这个操作的含义是，如果对象的length负数，二进制表示法它将会是其绝对值的补码表示，无符号向右移动，
  // 相当于将其强制看成一个无符号数，于是，将会得到一个很大的值，并且一定是正数。但是对于非负数，却是没有任何影响的
  const length = O.length >>> 0;
  // 定义迭代的值，暂时先不着急赋值
  let accumulator;
  let offset = 0;
  // 如果没有传递初始值，找第一个可用的值作为初始值
  if (typeof initialValue === "undefined") {
    // 跳过开头的那些hole
    while (!(offset in O) && offset < length) {
      offset++;
    }
    // 退出循环的时候有两种情况，第一种：找到了第一个可用元素，第二种，已经把数组遍历完了还没有找到
    if (offset === length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = O[offset];
  }
  for (let i = offset + 1; i < length; i++) {
    // 跳过hole元素
    if (i in O) {
      // 将之前的迭代值传入callback，并且将得到的结果赋值给accumulator
      accumulator = callback(accumulator, O[i], i, O);
    }
  }
  return accumulator;
};
```
