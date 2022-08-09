## 克隆

首先，先为大家介绍一下什么是`浅克隆`和`深克隆`。

对于`浅克隆`和`深克隆`，我们都是针对引用类型来讨论的，比如说：

```js
const a = "AAA";
const b = a;
```

因为`a`和`b`，都是基础类型，这个操作，其实就相当于把`a`拷贝了一份给`b`，所以这个话题针对非引用类型讨论没有意义。

### 浅克隆

```js
const a = {};
const b = a;
```

此刻，`a`和`b`都指向同一块内存区域，因此，大家都可以对这块区域进行修改。在实际开发中，经常会存在一些潜在的 bug，因为操作了同一块内存区域导致数据的一致性错误，因此，在处理数据的过程中，针对引用数据类型，一定要足够小心，注意其引用的内容。

::: danger
对于引用类型，不同的变量都引用同一个对象，都可以对这个对象进行修改
:::

### 深克隆

下面 2 种情况，是我总结的不太容易察觉的可能是深克隆的情况。

#### 场景 1

```js
const a = { name: "yangxu", age: "28" };
/* const b = a; */
const b = { ...a };
```

根据扩展运算符的运用场景，首先初始化了一个新对象`b`，然后就把对象`a`中的所有属性都复制给了`b`，其实这是完成了一次`深克隆`。

但是，这只是针对这个场景下的深克隆，假设现在：

```js
const a = {
  name: "yangxu",
  age: "28",
  location: {
    province: "sichuan",
    city: "chengdu",
    country: "shuangliu",
  },
};
const b = { ...a };

b.location.province = "beijing";
/* 输出beijing */
console.log(a.location.province);
```

为什么是`beijing`，这个操作，就相当于`a`和`b`都持有`location`，因此大家都可以对它进行修改了。

:::tip
使用`Object.assign`和扩展运算符类似
:::

#### 场景 2

```js
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const b = a.map((v) => v);
```

咋一看，好像是一个没有意义的操作，干嘛要空`map`一次呢？其实不然，我们知道`map`返回一个新的数组，那么，因为数组的元素是基本类型，不存在拷贝的问题，因此，我们就好比新建一个数组，把所有的元素都拷贝过去。

下面这个场景和上面类似：

```js
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const b = [...a];
```

但是，对于这个场景，就需要注意了。

```js
const a = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
const b = a.map((v) => v);
```

这样并没有完成一次`深克隆`，因为其实数组的键是特殊的键，即 `a[0]`和 `b[0]`都持有同一个对象，大家都能修改这个对象，数据一致性就可能存在问题，因此，这种情况就不能再使用`map`。

### 深克隆的实现

#### 使用 JSON.parse + JSON.stringify

```js
const o = {};
const b = JSON.parse(JSON.stringify(o));
```

首先，我觉得绝大部分人说不清楚`JSON.stringify`的序列化规则，这个是我曾经面试遇到过的一个问题，我特意去看过`MDN`的描述。具体的序列化规则我就不在此叙述，本文主要阐述一下用它可能存在的问题。

- `JSON.stringify` 无法解决循环引用的问题；
- `JSON.stringify` 无法序列化`Symbol`，`BigInt`，`Function`这类不能被序列化的类型；
- `JSON.stringify` 只能序列化对象的可枚举字段；
- `JSON.stringify` 序列化的数据可能不准确，如`Date`，`NaN`；

#### 使用 `DFS` 实现深克隆

同理，使用`BFS`或者`DFS`进行深克隆，仍然解决不全上述描述的问题（但解决度就可以取决于你自己对`JS`的积累了），但是，这个是基于算法的，它能够向面试官证明你的学习能力、编程能力与记忆力，至少能说明你是一个愿意学习的程序员。

使用`DFS`或`BFS`是可以解决对象循环引用的问题。

```js
/**
 * 使用深度优先深拷贝对象
 * @param {Array<any> | object} obj
 * @param { Map<Array<any> | object, Array<any> | object> } map
 * @returns
 */
function deepClone(obj, map = new Map()) {
  // 如果已经拷贝过，则可以直接返回拷贝过的值，主要是为了防止循环引用
  let cloneObj = map.get(obj);
  if (typeof cloneObj !== "undefined") {
    return cloneObj;
  }
  // 初始化拷贝的对象
  cloneObj = Array.isArray(obj) ? [] : {};
  // 建立已经拷贝的引用，不能再开始拷贝属性了再建立拷贝引用，否则将会导致递归最大调用栈的问题发生
  map.set(obj, cloneObj);
  // 对拷贝对象挨个赋值
  for (let prop in obj) {
    // 遇到对象，则递归拷贝
    if (obj[prop] instanceof Object) {
      cloneObj[prop] = deepClone(obj[prop], map);
      // 拷贝完成后，还要将其加入引用Map中去
      map.set(obj[prop], cloneObj[obj]);
    } else {
      cloneObj[prop] = obj[prop];
    }
  }
  return cloneObj;
}
```

#### 使用`BFS`实现深克隆

与`DFS`类似，不赘述。

```js
/**
 * 使用广度优先深拷贝一个对象
 * @param {Array<any> | object} obj
 * @returns
 */
function deepClone(obj) {
  // 根据目标对象确定拷贝是数组还是对象
  let cloneObj = Array.isArray(obj) ? [] : {};
  // 用一个map用以记住被拷贝过的内容
  const map = new Map();
  // 记住当前对象已经被拷贝过了
  map.set(obj, cloneObj);
  // 把原始内容和拷贝的内容追加到队列中去，准备开始以广度优先的方式进行深拷贝
  const queue = [
    {
      source: obj,
      clone: cloneObj,
    },
  ];
  while (queue.length > 0) {
    const { source, clone } = queue.shift();
    for (let prop in source) {
      if (source[prop] instanceof Object) {
        // 如果已经拷贝过，则直接将内容复制到目标对象上去
        if (map.get(source[prop])) {
          clone[prop] = map.get(source[prop]);
        } else {
          // 把当前对象和拷贝的空对象加入到队列中去，准备后序的深拷贝
          const nextClone = Array.isArray(source[prop]) ? [] : {};
          queue.push({
            source: source[prop],
            clone: nextClone,
          });
          // 建立拷贝关系，本轮还是空内容（可以理解为拷贝一个容器），待下一轮循环才拷贝值
          clone[prop] = nextClone;
          // 将已经拷贝的内容加入到map中去，防止循环拷贝
          map.set(source[prop], nextClone);
        }
      } else {
        // 基本类型，可直接拷贝
        clone[prop] = source[prop];
      }
    }
  }
  return cloneObj;
}
```
