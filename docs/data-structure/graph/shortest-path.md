## 最短路径

最短路径问题，这个问题几乎是我们每天必定会接触到的问题了吧。

当你打开高德地图，输入目的地，高德地图一下就可以给你计算出来了怎么走，甚至还能让你选条件，比如途经点，用时最短，里程最短等条件。我一直感叹其中的神奇，在我没有接触`图`这章的知识的时候，想破脑袋也不知道其中的原理，但是我从未放弃过要去搞明白计算机是怎么样解决这类问题的。

曾经我有一个朋友，他是银行职员，当时正值炎炎夏日，他需要在一周内拜访成都市区几百家客户，他来求助我，是否可以帮忙写一个程序算一下怎么安排这些客户的拜访顺序，囿于当时我的水平有限，只能遗憾的告诉他我不会啊，真实心疼他。他的这个需求其实是结合了`图`的最短路径问题和最小生成树问题的场景。

如果你掌握了本节内容，将来和朋友们出去玩儿的时候，编程求解旅行的规划，那应该可以狠狠地秀大家一把吧；

如果你不仅掌握了本节内容，还掌握了后面将会介绍的最小生成树问题，将来某一天大家有类似我朋友这种极端的需求的时候，一定可以帮到他哟，这就是程序员的力量，代码的魅力，加油，拿下这节知识。

### 无权图的单源最短路

无权图的单源最短路问题，跟我们的`广度优先遍历`的思路非常相似，我们从起点出发，依次操作当前节点的邻接点，若其还没有处理过，则处理，并且更新起点到这个点的距离，然后还要把这个点加到我们记录的一个路径数据集里面去。重复上述操作，直到处理完图中所有的点。

我们以这个图为例：

<div align="center">
  <img :src="$withBase('/graph/graph.png')" width ='400' alt="图" />
</div>

并且以如下表示方法表示图：

```js
/**
 * 边类
 */
class Edge {
  constructor(name) {
    this.name = name;
  }
  /**
   * 边的编号
   */
  name;
  /**
   * 起始点
   * @type {Vertex}
   */
  from;
  /**
   * 终止点
   * @type {Vertex}
   */
  to;
}

/**
 * 顶点类
 */
class Vertex {
  /**
   * 城市名称
   */
  cityName;
  /**
   * 邻接点
   */
  siblings = [];
  constructor(cityName) {
    this.cityName = cityName;
  }
}

/**
 * 图类
 */
class Graph {
  /**
   * 顶点集合
   * @type {Vertex[]}
   */
  vertexList = [];
  /**
   * 边集合
   * @type {Edge[]}
   */
  edgeList = [];
  /**
   * 向图中插入一个顶点
   */
  addVertex(v) {
    this.vertexList.push(v);
  }
  /**
   * 增加边，连接from和to两个顶点
   * @param {Vertex} from
   * @param {Vertex} to
   */
  addEdge(from, to) {
    const name = `${from.cityName}至${to.cityName}`;
    const edge = new Edge(name);
    this.edgeList.push(edge);
    from.siblings.push(to);
    to.siblings.push(from);
  }
}
```

接着，根据上面的那个`图`，构建出我们想要的连接关系：

```js
const g = new Graph();
const beijing = new Vertex("北京");
const nanjing = new Vertex("南京");
const guangzhou = new Vertex("广州");
const shenzhen = new Vertex("深圳");
const hongkong = new Vertex("香港");
const chengdu = new Vertex("成都");
const xian = new Vertex("西安");
const urumchi = new Vertex("乌鲁木齐");
/**
 * 将城市加入到图中
 */
g.addVertex(beijing);
g.addVertex(nanjing);
g.addVertex(guangzhou);
g.addVertex(shenzhen);
g.addVertex(hongkong);
g.addVertex(chengdu);
g.addVertex(xian);
g.addVertex(urumchi);
/**
 * 建立连接关系
 */
g.addEdge(beijing, nanjing);
g.addEdge(beijing, xian);
g.addEdge(nanjing, guangzhou);
g.addEdge(guangzhou, shenzhen);
g.addEdge(guangzhou, hongkong);
g.addEdge(hongkong, shenzhen);
g.addEdge(chengdu, guangzhou);
g.addEdge(chengdu, xian);
g.addEdge(urumchi, xian);
g.addEdge(urumchi, beijing);
```

那么，最短路径求解算法如下：

```js
/**
 * 单源无权图的最短路算法
 * @param {Vertex} start
 * @param {Vertex} end
 */
function unweightedShortestPath(start, end) {
  const queue = [];
  /* 距离哈希表，用于存储开始顶点到任意节点的距离 */
  const dist = new Map();
  /* 路径哈希表，用于存储开始顶点到任意节点所经过的顶点 */
  const path = new Map();
  dist.set(start, 0);
  queue.push(start);
  while (queue.length > 0) {
    let vertex = queue.shift();
    for (let i = 0; i < vertex.siblings.length; i++) {
      // 取出当前正在处理的顶点的邻接点进行处理
      let adjoinVertex = vertex.siblings[i];
      /* 若adjoinVertex未被访问过 */
      if (typeof dist.get(adjoinVertex) === "undefined") {
        /* 将这个点到start的距离更新 */
        dist.set(adjoinVertex, dist.get(vertex) + 1);
        /* 将这个点记录在S到adjoinVertex的路径上 */
        path.set(adjoinVertex, vertex);
        // 并且将当前邻接点入队
        queue.push(adjoinVertex);
      }
    }
  }
  // 获取终点的最短路径长度
  const distance = dist.get(end);
  // 使用栈记住终点
  const stack = [end];
  let preVertex = path.get(end);
  // 沿途处理从终点到起点所经过的路径
  while (preVertex) {
    stack.push(preVertex);
    // 继续向上迭代，寻找经过的顶点
    preVertex = path.get(preVertex);
  }
  // 经过逆序，得到了正确的路径
  let via = "";
  while (stack.length) {
    const city = stack.pop();
    via += "->" + city.cityName;
  }
  return { distance, path: via.replace(/(^->)|(->$)/g, "") };
}
```

假设我们想求出成都到北京的最短距离，并且需要求出是怎么样达到北京的，如下：

```js
const { path, distance } = unweightedShortestPath(chengdu, beijing);
// path 成都->西安->北京
// distance 3
```

下面，我们画图描述一下这个处理流程。

首先，在开始时将`成都`入队，同时设置距离为`0`，因为我们设置了它的距离，其实际上就相当于之前我们在广度优先遍历节的时候所提到的标记当前的节点已经被处理的手段，一举两得。接着，我们把`成都`出队，准备处理它的邻接点。

<div align="center">
  <img :src="$withBase('/graph/chengdu.png')" alt="成都" />
</div>

紧接着，我们把`西安`和`广州`入队

<div align="center">
  <img :src="$withBase('/graph/xian.png')" alt="西安" />
</div>

接着，把`西安`出队，同时标记`成都`到`西安`的最短距离，然后将`西安`的邻接节点`乌鲁木齐`和`北京`入队。

<div align="center">
  <img :src="$withBase('/graph/xian-end.png')" alt="西安已处理" />
</div>

接着，把`广州`出队，同时标记`成都`到`广州`的最短距离，然后将`广州`的邻接节点`深圳`、`香港`和`南京`入队。

<div align="center">
  <img :src="$withBase('/graph/guangzhou.png')" alt="广州已处理" />
</div>

接着，把`乌鲁木齐`出队，同时标记`成都`到`乌鲁木齐`的最短距离，然后把`乌鲁木齐`的邻接节点加入队列（**虽然会将其邻接点加入队列，但是因为后面其实这些邻接点并不会重复处理，为了简便起见，我们在图上就不体现其邻接节点加入队列的过程**）。

`乌鲁木齐`到`成都`需要经过`西安`，已知`成都`到`西安`的距离，故可以求得`成都`到`乌鲁木齐`的距离。

<div align="center">
  <img :src="$withBase('/graph/urumuchi.png')" alt="乌鲁木齐已处理" />
</div>

接着，把`北京`出队，同时标记`成都`到`北京`的最短距离，然后把`北京`的邻接节点加入队列，同理，邻接节点入队这个过程我们图上就没有体现了。

`北京`到`成都`需要经过`西安`，已知`成都`到`西安`的距离，故可以求得`成都`到`北京`的距离。

<div align="center">
  <img :src="$withBase('/graph/beijing.png')" alt="北京已处理" />
</div>

同理可以求得`深圳`、`香港`、`南京`的最短距离。

即最终结果如下：

<div align="center">
  <img :src="$withBase('/graph/dist.png')" alt="最终结果" />
</div>

因为我们在求解过程中把经过的路径已经计算出来了，类同于链表的原理，我们可以从终点倒推到起点，便可以求得经过的节点，因为这个是一个逆序的结果，所以我们需要使用栈再次将其逆序，即可求得最终的结果。

**不管是有向还是无向图，我们都可以使用上述算法求得从某个指定的开始节点到所有节点的最短路径。**
