## 广度优先搜索

广度优先搜索算法（**Breadth-First Search，缩写为 BFS**），又称为宽度优先搜索，是一种图形搜索算法。简单的说，`BFS` 是从根结点开始，沿着树的宽度遍历树的结点。如果所有结点均被访问，则算法中止。

下图生动形象的为我们展示了`BFS`的处理流程。

<div align="center">
  <img src="/graph/bfs.gif" alt="bfs" />
</div>

它总是一圈一圈的从内往外处理，每次都是一滴不漏的处理完每个角落，才会开始下一圈的处理。

比如下图展示的就是一个使用 `BFS` 遍历二叉树的过程：

<div align="center">
  <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/733b5048da12459db187ac862caeeb5c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?
" alt="bfs遍历二叉树" />
</div>

**由于本文和`DFS`有着非常强的关联，请各位读者在阅读之前，请确保已经阅读[深度优先搜索](./dfs.md)。**

### BFS 的标准范式

`BFS`，从一个给定的节点开始，每遍历一个节点，将当前节点标记为已遍历，并且将当前节点的未处理过的所有邻接节点加入队列中，若队列为空则遍历完成，若不为空，则从队列中再取出一个节点继续上述流程，直到遍历完成。

```js
function bfs(v, visited) {
  // 将当前节点标记为已处理
  visited[v] = true;
  // 将当前节点入队
  enqueue(v, Q);
  // 当队列中存在元素
  while (!isEmpty(Q)) {
    // 从队列中取出一个节点
    v = dequeue(v, Q);
    for(v 的每个邻接点 W) {
      // 若当前邻接点没有处理过，则将其标记为处理过，并且加入队列中去
      if(!visited[W]) {
        visited[W] = true;
        enqueue(v, w);
      }
    }
  }
}
```

### BFS 的应用

一般来说，能够使用`DFS`进行处理的问题都可以使用`BFS`处理，我们还是以之前`DFS`节讨论过的问题为例，看看使用 `BFS` 的话，可以怎么样实现它。因为`BFS`是非递归的算法，如果在数据量比较大的时候，请考虑要非递归实现`DFS`或直接使用`BFS`。

#### 拍平数组（flat）

假设有这样的数组： [1,[2,3,[[4]]],[5],[[[[[6],7,8]]],9], 10]，请将其展平为[1,2,3,4,5,6,7,8,9,10]。

```js
/**
 * 以广度优先的方式拍平数组
 * @param {any[]} arr
 */
function flat(arr) {
  const results = [];
  // 将数据加入到队列中
  const queue = [];
  if (Array.isArray(arr)) {
    queue.push(arr);
  }
  // 当队列内容不为空时，继续拍平数据
  while (queue.length) {
    // 从队列中取出一个元素，并且这个出队的一定是数组
    const ele = queue.shift();
    ele.forEach((subEle) => {
      if (Array.isArray(subEle)) {
        queue.push(subEle);
      } else {
        results.push(subEle);
      }
    });
  }
  return results.sort((a, b) => a - b);
}
```

为什么需要排序呢，因为在拍平的过程中，对于嵌套较深的元素，它的处理过程是滞后于不嵌套的元素的，比如先处理了 1，然后立马处理的是 10，所以 10 就跑到了 2,3 的前面去了。所以说，在根据实际情况，选择使用`DFS`或`DFS`，显然本例就不适合使用`BFS`。

#### 深拷贝对象

使用广度优先深拷贝一个对象有个比较不容易想到的地方，就是对象的`key`，不同于像普通的树或图那样，你持有某个引用，你可以方便的使用`curObj.xxx`获取到它的邻接点。所以我经过思考后，每次入队的都是一对的源对象和被拷贝对象，这样就可以很方便的直接根据当前源对象进行遍历然后依次给拷贝对象添加属性了。

注意，在此处我实现的深拷贝并没有完整考虑所有的情况，如果对深拷贝感兴趣的同学，请移步 `lodash` 的源码参考其实现。

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

输入两个整数，分别表示二维数组的行数，列数。再输入相应的数组，其中的 1 表示墙壁，0 表示可以走的路。数据保证有唯一解,不考虑有多解的情况，即迷宫只有一条通道。

```js
/**
 * 以BFS的形式找迷宫的出口
 * @param {number[]} matrix
 */
function findPath(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;
  // 定义一个队列
  const queue = [];
  // 定义一个标记数组
  const maker = Array.from({
    length: height,
  }).map(() => {
    return Array.from({
      length: width,
    }).fill(0);
  });
  // 先将开始节点加入到队列中去
  queue.push({
    x: 0,
    y: 0,
    path: [[0, 0]],
  });
  // 将起始节点标记为已处理
  maker[0][0] = true;
  let distPath = null;
  while (queue.length) {
    const { x, y, path } = queue.shift();
    if (x === width - 1 && y === height - 1) {
      distPath = path;
    }
    // 上边的点，存在且没有被访问过，并且不是障碍物
    const topPoint =
      isExist(matrix, x, y - 1) && !maker[y - 1][x] && matrix[y - 1][x] !== 1
        ? { x, y: y - 1 }
        : null;
    if (topPoint) {
      queue.push({
        x: topPoint.x,
        y: topPoint.y,
        path: [...path, [topPoint.y, topPoint.x]],
      });
      maker[y - 1][x] = true;
    }
    // 右边的点，存在且没有被访问过，并且不是障碍物
    const rightPoint =
      isExist(matrix, x + 1, y) && !maker[y][x + 1] && matrix[y][x + 1] !== 1
        ? { x: x + 1, y }
        : null;
    if (rightPoint) {
      queue.push({
        x: rightPoint.x,
        y: rightPoint.y,
        path: [...path, [rightPoint.y, rightPoint.x]],
      });
      maker[y][x + 1] = true;
    }
    // 下边的点，存在且没有被访问过，并且不是障碍物
    const bottomPoint =
      isExist(matrix, x, y + 1) && !maker[y + 1][x] && matrix[y + 1][x] !== 1
        ? { x, y: y + 1 }
        : null;
    if (bottomPoint) {
      queue.push({
        x: bottomPoint.x,
        y: bottomPoint.y,
        path: [...path, [bottomPoint.y, bottomPoint.x]],
      });
      maker[y + 1][x] = true;
    }
    // 左边的点 存在且没有被访问过，并且不是障碍物
    const leftPoint =
      isExist(matrix, x - 1, y) && !maker[y][x - 1] && matrix[y][x - 1] !== 1
        ? { x: x - 1, y }
        : null;
    if (leftPoint) {
      queue.push({
        x: leftPoint.x,
        y: leftPoint.y,
        path: [...path, [leftPoint.y, leftPoint.x]],
      });
      maker[y][x - 1] = true;
    }
  }
  return distPath;
}

/**
 * 判断当前元素是否存在于迷宫中
 * @param {number[][]} matrix
 * @param {number} x
 * @param {number} y
 */
function isExist(matrix, x, y) {
  return Array.isArray(matrix[y]) && typeof matrix[y][x] !== "undefined";
}
```

使用`BFS`查找迷宫的出路有个问题，虽然我们在找路的时候比较方便，但是怎么把这个路径记录下来却是个问题。

因此，我在搜索过程中把对应已经走过的 `path` 一并加入到了队列中，在取出节点进行判断的时候，可以很方便的知道之前走过的路径是怎么样的，但是问题就是这样**会占用大量的内存空间**，所以对于这个问题，我实现的`BFS`是不如`DFS`的，如果读者有更好的解法，欢迎提出，大家一起交流，把它完善的更美好，以传递更好的知识。

关于 `BFS` 还有很多有趣的问题，我暂时就先为大家介绍这几种常见的用法，欢迎大家补充。
