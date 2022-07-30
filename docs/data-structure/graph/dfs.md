## 深度优先搜索

深度优先搜索算法（英语：**Depth-First-Search**，简称 **DFS**）是一种用于遍历或搜索树或图的算法。其过程简要来说是对每一个可能的分支路径深入到不能再深入为止，而且每个结点只能访问一次.

比如下图展示的就是一个使用 `DFS` 遍历二叉树的过程：

<div align="center">
  <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd0588205915427d9bf12d2cc31b239b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />
</div>

对于图的遍历来说，不管采用[`DFS`还是**BFS(Breadth First Search，简称 BFS)**](./bfs.md)，都是可以的，需要注意一点的是，必须在某些特定的情况下，比较`BFS`还是`DFS`两者的遍历效果才有意义。

### DFS 的标准范式

`DFS`每次都是在先按照特定的规则（比如从第一个邻接点处理到第 N 个邻接点），每遍历一个节点，将当前节点标记为已遍历，若不能再继续向下处理，则向上回溯，继续处理这个交叉路口的下一个分支，重复这个过程，直到所有的节点都被处理，则遍历完成。

DFS 的伪代码实现如下：

```js
function DFS(v, visited) {
  visited[v] = true;
  for(v 的每个邻接点 w ) {
    if(!visited[w]) {
      DFS(w, visited);
    }
  }
}
```

为什么需要一个标记呢，因为图的关系是四通八达的，如果没有标记的话，就好比人迷失了方向，遍历将无法找到退出的出口，会出现最大堆栈调用的错误或死循环。一般我们这个标记的遍历会考虑使用哈希表，但是有些时候使用数组也可以，主要取决于你的图采用什么样的表示方法。

### DFS 的应用

#### 拍平数组（flat）

这题几乎是各大中小厂面试题的常客了。

假设有这样的数组： `[1,[2,3,[[4]]],[5],[[[[[6],7,8]]],9], 10]`，请将其展平为`[1,2,3,4,5,6,7,8,9,10]`。

主要有 3 种方法对数组进行拍平。

首先是最朴素的算法，将数组`toString`，然后将其中的`[`和,`]`替换掉，然后再将数组转换回数字类型，这个算法有一定的局限性，但是在你实在想不起来怎么样用`DFS`处理这个问题的时候，也可以使用。

为什么说这个方法有局限性呢，因为你`toString`注定了已知数据的类型必须是一样的，无法记录特值，并且如果数据源里面包含`[`或`]`，这个办法就歇菜，并且这个方法是**无法指定拍平多少层的**。

```js
/**
 * 拍平数组
 * @param {number[]} arr
 */
function flat(arr) {
  return arr
    .toString()
    .replace(/\[|\]/g, "")
    .split(",")
    .map((ele) => {
      return Number.parseInt(ele);
    });
}
```

说完了花里胡哨的操作，然后还是回到本质的东西，使用`DFS`拍平数组，并且支持拍平深度。

```js
/**
 * 拍平数组
 * @param {any[]} arr 源数据
 * @param {number} depth 指定拍平深度
 * @param {number} curDepth 当前的深度
 */
function flat(arr/*,*depth = Infinity, curDepth = 1*/) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) /*&& curDepth < depth*/) {
      results.push(...flat(arr[i]/*, depth, curDepth + 1)*/);
    } else {
      results.push(arr[i]);
    }
  }
  return results;
}
```

上述使用的是`push`的方式`flat`。

在有些时候，如果你写的过快，面试官还会问你有没有别更好的方法，稍微好一点儿的方法是使用`reduce`，如下：

```js
/**
 * 拍平数组
 * @param {any[]} arr
 * @returns
 */
function flat(arr) {
  return arr.reduce((preVal, curVal) => {
    return Array.isArray(curVal)
      ? preVal.concat(flat(curVal))
      : preVal.concat(curVal);
  }, []);
}
```

思维方式和上面的`DFS`一致，但是写法更简洁，需要注意的是，在`reduce`的时候，一定要提供默认参数`[]`。

#### 深拷贝对象

在深拷贝的时候为了防止循环引用，把已经拷贝过的对象和新生成的对象映射加入到哈希表中去，并且递归拷贝的时候，要带上这个哈希表递归。需要注意一点就是，拷贝过程中，一旦新生成的对象产生，就需要建立映射，而不是，等拷贝完成再建立映射，否则就无法区分当前对象是否已经被拷贝了，出现最大调用堆栈报错。

注意，在此处我实现的深拷贝并没有完整考虑所有的情况，如果对深拷贝感兴趣的同学，请移步 `lodash` 的源码参考其实现。

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

#### [迷宫问题](https://www.nowcoder.com/practice/cf24906056f4488c9ddb132f317e03bc?tpId=37&tqId=21266&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3FjudgeStatus%3D1%26page%3D1%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=undefined&judgeStatus=1&tags=&title=)

这是华为的一道机考题。

定义一个二维数组 N\*M ，如 5 × 5 数组下所示：

```js
[
  [0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0],
];
```

它表示一个迷宫，其中的 1 表示墙壁，0 表示可以走的路，只能横着走或竖着走，不能斜着走，要求编程序找出从左上角到右下角的路线。入口点为[0,0],既第一格是可以走的路。

输入两个整数，分别表示二维数组的行数，列数。再输入相应的数组，其中的 1 表示墙壁，0 表示可以走的路。数据保证有唯一解,不考虑有多解的情况，即**迷宫只有一条通道**。

```js
/**
 * 寻找迷宫的出路
 * @param {number[][]} matrix
 * @param {number} startX
 * @param {number} startY
 * @param {boolean[][]} visited
 */
function findSolution(matrix, startX, startY, distX, distY, visited) {
  // 如果遇到边界，或者当前节点已经被处理过，此路不通
  if (!isEdge(matrix, startX, startY) || visited[startX][startY]) {
    return [];
  }
  // 将当前节点标记为已处理
  visited[startX][startY] = true;
  // 如果遇到障碍物，此路不通
  if (matrix[startX][startY] === 1) {
    return [];
  }
  // 定义当前节点
  let point = [startX, startY];
  // 如果已经找到了出口
  if (startX === distX && startY === distY) {
    return [point];
  }
  let viaLeft = [],
    viaRight = [],
    viaTop = [],
    viaBottom = [];
  // 向左处理路径
  if (isEdge(matrix, startX - 1, startY) && !visited[startX - 1][startY]) {
    viaLeft = findSolution(matrix, startX - 1, startY, distX, distY, visited);
  }
  // 向右处理路径
  if (isEdge(matrix, startX + 1, startY) && !visited[startX + 1][startY]) {
    viaRight = findSolution(matrix, startX + 1, startY, distX, distY, visited);
  }
  // 向下处理路径
  if (isEdge(matrix, startX, startY + 1) && !visited[startX][startY + 1]) {
    viaBottom = findSolution(matrix, startX, startY + 1, distX, distY, visited);
  }
  // 向上处理路径
  if (isEdge(matrix, startX, startY - 1) && !visited[startX][startY - 1]) {
    viaTop = findSolution(matrix, startX, startY - 1, distX, distY, visited);
  }
  // 从有用的路径中选择一个返回
  if (viaLeft.length) {
    return [point, ...viaLeft];
  } else if (viaRight.length) {
    return [point, ...viaRight];
  } else if (viaBottom.length) {
    return [point, ...viaBottom];
  } else if (viaTop.length) {
    return [point, ...viaTop];
  } else {
    return [];
  }
}

/**
 * 是否是边界
 * @param {number[][]} matrix
 * @param {number} x
 * @param {number} y
 */
function isEdge(matrix, x, y) {
  return Array.isArray(matrix[x]) && typeof matrix[x][y] !== "undefined";
}

/**
 * 从一个矩阵的左上角走到右下角
 * @param {number[][]} matrix
 */
function findPath(matrix, distX, distY) {
  // 生成一个标记数组，用于标记当前节点已处理
  const visited = matrix.map((row) => {
    return row.map(() => false);
  });
  const steps = findSolution(matrix, 0, 0, distX, distY, visited);
  return steps;
}
```

关于 `DFS` 还有很多有趣的问题，我暂时就先为大家介绍这几种常见的用法，欢迎大家补充。
