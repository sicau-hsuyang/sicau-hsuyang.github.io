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

### 带权图单源最短路径算法

对于这个问题，我们还是基于上面我们使用的那个城市相对位置的例子来阐述，不过，需要引入权重。

<div align="center">
  <img :src="$withBase('/graph/graph-with-weight.png')" alt="带权图" />
</div>

因为，增加了权重，上面的表示方法也有一定的调整：

```js {20-23,49-61}
class Edge {
  constructor(name, cost) {
    this.name = name;
    this.cost = cost;
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
  /**
   * @type {number}
   */
  cost;
}

class Vertex {
  constructor(cityName) {
    this.cityName = cityName;
  }
  /**
   * 城市名称
   */
  cityName;
  /**
   * 邻接边
   */
  edges = [];
}

class Graph {
  /**
   * 顶点列表
   */
  vertexList = [];

  addVertex(v) {
    this.vertexList.push(v);
  }
  /**
   * 增加边
   * @param {Vertex} from
   * @param {Vertex} to
   * @param {number} cost
   */
  addEdge(from, to, cost) {
    const into = new Edge(`${from.cityName}至${to.cityName}`, cost);
    const outside = new Edge(`${to.cityName}至${from.cityName}`, cost);
    // 建立两个城市的指向关系
    from.edges.push(outside);
    to.edges.push(into);
  }
}
```

然后，初始化数据：

```js {25-34}
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
g.addEdge(beijing, nanjing, 35);
g.addEdge(beijing, xian, 1000);
g.addEdge(nanjing, guangzhou, 15);
g.addEdge(guangzhou, shenzhen, 10);
g.addEdge(guangzhou, hongkong, 10);
g.addEdge(hongkong, shenzhen, 10);
g.addEdge(chengdu, guangzhou, 50);
g.addEdge(chengdu, xian, 120);
g.addEdge(urumchi, xian, 100);
g.addEdge(urumchi, beijing, 1000);
```

接下来是根据上面图的表示方法所对应的求解的核心代码，也就是大名鼎鼎的`迪杰斯特拉算法`：

```js
/**
 * 在图中返回未被收录顶点中dist最小者
 * @param {Graph} graph
 * @param {Map<number, number>} distance
 * @param {Map<Vertex, boolean>} collected
 * @returns {Vertex | null}
 */
function findMinDist(graph, distance, collected) {
  /* 返回未被收录顶点中dist最小顶点 */
  let minVertex;
  let minDist = Infinity;
  for (let i = 0; i < graph.vertexList.length; i++) {
    const curVertex = graph.vertexList[i];
    /* 若curVertex未被收录，且dist.get(curVertex)更小 */
    if (!collected.get(curVertex) && distance.get(curVertex) < minDist) {
      /* 更新最小距离 */
      minDist = distance.get(curVertex);
      /* 更新对应顶点 */
      minVertex = curVertex;
    }
  }
  // 如果能够找到这样的顶点，则返回最小的距离，否则，这样的距离不存在
  return minDist < Infinity ? minVertex : null;
}

/**
 * 迪杰斯特拉算法求解最短路径
 * @param {Graph} graph
 * @param {Vertex} start
 * @returns
 */
function dijkstra(graph, start) {
  let collected = new Map();
  let distance = new Map();
  let path = new Map();
  /* 先将起点收入集合 */
  distance.set(start, 0);
  collected.set(start, true);
  graph.vertexList.forEach((vertex) => {
    if (vertex === start) {
      // 对start节点本身除外
      return;
    }
    // 找到start节点的邻接点，如果当前节点存在出度指向起点，则证明当前节点是开始节点的邻接点
    const neighborEdge = vertex.edges.find((v) => v.to === start);
    // 若存在连接的话，则按权重初试化，否则初始化为无穷大
    if (neighborEdge) {
      distance.set(vertex, neighborEdge.cost);
      path.set(vertex, start);
    } else {
      distance.set(vertex, Infinity);
    }
  });
  while (true) {
    /* vertex为未被收录顶点中distance最小者 */
    let vertex = findMinDist(graph, distance, collected);
    /* 若这样的vertex不存在，流程结束 */
    if (!vertex) {
      break;
    }
    /* 收录vertex */
    collected.set(vertex, true);
    /* 遍历图中的每个顶点 */
    for (let i = 0; i < graph.vertexList.length; i++) {
      let curVertex = graph.vertexList[i];
      /* 若curVertex是vertex的邻接点并且未被收录 */
      const linkEdge = curVertex.edges.find((edge) => edge.to === vertex);
      if (!collected.get(curVertex) && linkEdge) {
        /* 若有负边 */
        if (linkEdge < 0) {
          /* 不能正确解决，返回错误标记 */
          return { distance: null, path: null };
        }
        /* 若收录vertex使得distance变小 */
        if (distance.get(vertex) + linkEdge.cost < distance.get(curVertex)) {
          /* 更新dist */
          distance.set(curVertex, distance.get(vertex) + linkEdge.cost);
          /* 更新start到curVertex的路径 */
          path.set(curVertex, vertex);
        }
      }
    }
  }
  return { distance, path };
}

/**
 * 根据迪杰斯特拉算法求解结果求最终的结果
 * @param {Map<Vertex, number>} distance
 * @param {Map<Vertex, Vertex>} path
 * @param {Vertex} destination
 */
function getShortestPath(path, distance, destination) {
  if (path === null || distance === null) {
    return { cost: -1, path: null };
  }
  const stack = [destination];
  let preVertex = path.get(destination);
  while (preVertex) {
    stack.push(preVertex);
    preVertex = path.get(preVertex);
  }
  let via = "";
  let cost = distance.get(destination);
  while (stack.length) {
    via += "->" + stack.pop().cityName;
  }
  return { path: via.replace(/(^->)|(->$)/g, ""), cost };
}
```

我们来分析一下迪杰斯特拉算法的求解过程：

首先，将起始节点收录，然后找到它的所有邻接点，如果找的到邻接点的话，初始化该邻接点到起点的距离，并且将该邻接点更新在起始节点的路径上，`西安`和`广州`是`成都`的邻接点，因此可以得到如下图：

<div align="center">
  <img :src="$withBase('/graph/example/chengdu.png')" alt="成都" />
</div>

接着，我们找到未收录节点中的最小的节点，经过查找，找到的是`广州`，因为发现`成都`到`南京`，`香港`，`深圳`的距离由原来的无穷大变成经过`广州`再到对应的城市，因此可以更新距离和路径，可以得到如下图：

<div align="center">
  <img :src="$withBase('/graph/example/guangzhou.png')" alt="广州" />
</div>

// 步骤更新中，请耐心等待...

因此，我们可以写出`迪杰斯特拉算法`的伪代码，如下：

```js
/* 单源有权最短路径算法 */
function dijkstra(vertex) {
  collected[vertex] = true;
  for(图中所有顶点 V) {
    if(当前 V 是 vertex的邻接点) {
      distance[V] = vertex到V的权重
      把 V 更新在 vertex的路径上
    } else {
      distance[V] = 无穷大
    }
  }
  while(true) {
    minVertex = 找出未收录顶点的最小者；
    if(找不到这样的minVertex) {
      break;
    }
    collected[minVertex] = true;
    for(minVertex 的每个邻接点 neighborVertex) {
      if(!collected[neighborVertex]) {
        if(存在负值圈) {
          return false;
        }
        if(distance[minVertex] + minVertex到neighborVertex的权重 < distance[neighborVertex]) {
          distance[neighborVertex] = distance[neighborVertex] + minVertex到neighborVertex的权重
          path[neighborVertex] = minVertex
        }
      }
    }
  }
  return true;
}
```
