## Flatten

这是一道`携程`的算法手写题。

> 已知如下数组：
>
> const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
>
> 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

### 1、直接`toString`

`MDN`的阐述是:

> `toString`() 方法返回一个字符串，表示指定的数组及其元素。`Array`对象覆盖了`Object`的`toString`方法。对于数组对象，`toString`方法在内部调用`join`() 方法拼接数组中的元素并返回一个字符串，其中包含用逗号分隔的每个数组元素。如果`join`方法不可用，或者它不是一个函数，将使用 `Object.prototype.toString` 代替，返回 `[object Array]`。

缺点是很明显的，无法指定拍平的层级，也无法保留数据本来的类型

### 1、正则替换

正则替换也属于是比较`naive`的解法了，（而且使用这个解法的人可能根本还不知道`toString`的作用呢，哈哈哈，比如我，曾经面试美团的时候，第一面就是这题）如果我是一个面试官，求职者只会使用正则替换的话，假设满分`100`分，我觉得可以打`30`分。

正则替换的思路非常简单，首先，数组看成一个字符串，然后，我们只需要替换里面的`[`，`]`即可。但是直接这样做的缺陷是非常明显的，要么最后得到的数据类型全部是`string`或者要么全部是`number`（挨个`Number.parseInt`），如果面试官要求你不要影响原来的数据类型的话，还得花一些功夫的。（也正是这一点，所以它还算比`toString`要好一些）

```js
function flatten(arr) {
  const strArr = JSON.stringify(arr);
  // 注意，正则表达式不要写错，我们需要全局替换空格或者\[或者\]，所以要将它们三个写成一个字符集
  const tmpStr = strArr.replace(/[\s\[\]]*/g, "");
  // 使用eval可以保留数组原本的类型
  return eval("[" + tmpStr + "]");
}
```

这个缺点也是非常明显的，无法做到指定拍平多少级的数组

### 2、DFS——递归实现

仅掌握前面两种解法同学绝大部分是没有系统的学过数据结构的人，其实这是一个常见的树形结构的应用。对于树形结构，一般会有两种解题思路，要么`深度优先遍历（DFS）`，要么`广度优先遍历（BFS）`

不使用`reduce`：

```js
/**
 * 拍平数组的方法
 * @param {number[]} arr 需要被拍平的深度
 * @param {number} maxDeep 最大拍平深度
 * @returns
 */
function flatten2(arr, maxDeep) {
  const flattenPass = [];
  arr.forEach((v) => {
    if (Array.isArray(v) && maxDeep > 0) {
      flattenPass.push(...flatten2(v, maxDeep - 1));
    } else {
      flattenPass.push(v);
    }
  });
  return flattenPass;
}
```

如果你在面试中很快就使用递归完成了的话，那么面试官肯定会问你有没有改进的空间，上述代码看起来还是有那么一点儿丑的，使用`reduce`的话，看起来就会优雅许多。

使用`reduce`：

```js
/**
 * 拍平数组的方法
 * @param {number[]} arr 需要被拍平的深度
 * @param {number} maxDeep 最大拍平深度
 * @returns
 */
function flatten3(arr, maxDeep) {
  return arr.reduce((total, cur) => {
    // 为什么concat的是[cur]呢，因为，如果cur是数组，concat会给抹平，而给它包上这一次就可以防止它被抹平，才能跟最大拍平深度对应的上
    return total.concat(
      Array.isArray(cur) && maxDeep > 0 ? flatten3(cur, maxDeep - 1) : [cur]
    );
  }, []);
}
```

确实，使用`reduce`的代码看起来非常简洁

### 3、DFS——非递归实现

我们并不是像孔乙己一样的在研究茴香豆怎么写，只是想通过这些常见的`API`手写场景加深我们对计算机基础知识的理解。

`DFS`是一套标准的范式，几乎都是可以用递归和非递归实现的。递归只不过我们借助的是`系统的调用栈`，**如果数据的层级比较深的话，递归会出现最大调用栈错误**。

以下是`DFS`的非递归实现:

```js

```

所以在某些场景下，我们还是不得不使用`栈`来模拟遍历的顺序。

### 4、BFS

广度优先遍历实现思路比较简单，但是需要考虑层级的问题，就需要额外的处理。

广度优先遍历是有一个标准的范式的，如果对此有不太清楚的同学可以查看我算法相关的博客。这个场景，我们需要知道当前处理的层级，最简单的办法就是把层级和节点值放在一起，这样在取出值进行处理的时候一下子就可以知道它所处的层级了。另外稍微复杂一点儿的办法还可以用`Map`建立引用关系，处理起来要复杂的多，因此示例就没有采用这种办法。

```js
/**
 * 拍平数组的方法
 * @param {number[]} arr 需要被拍平的深度
 * @param {number} maxDeep 最大拍平深度
 * @returns
 */
function flatten5(arr, maxDepth) {
  const results = [];
  const queue = [];
  arr.forEach((v) => {
    // 在处理第一层的时候将其标记为第0层
    queue.push({
      val: v,
      depth: 0,
    });
  });
  while (queue.length) {
    const node = queue.shift();
    const { val, depth } = node;
    // 如果当前节点需要处理，并且还没有到最大处理层数，则可继续处理，否则直接忽略
    if (Array.isArray(val) && depth < maxDepth) {
      val.forEach((sub) => {
        queue.push({
          val: sub,
          depth: depth + 1,
        });
      });
    } else {
      results.push(val);
    }
  }
  return results;
}
```
