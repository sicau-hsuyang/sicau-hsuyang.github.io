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
   * 邻接边 @type {Edge[]}
   */
  edges = [];
}

class Graph {
  /**
   * 顶点列表 @type {Vertex[]}
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
    const outside = new Edge(`${from.cityName}至${to.cityName}`, cost);
    outside.from = from;
    outside.to = to;
    const into = new Edge(`${to.cityName}至${from.cityName}`, cost);
    into.from = to;
    into.to = from;
    // 建立两个城市的指向关系
    to.edges.push(into);
    from.edges.push(outside);
  }
}

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

/**
 * 在图中返回未被收录顶点中dist最小者
 * @param {Graph} graph
 * @param {Map<number, number>} dist
 * @param {Map<Vertex, boolean>} collected
 * @returns {Vertex | null}
 */
function findMinDist(graph, dist, collected) {
  /* 返回未被收录顶点中dist最小顶点 */
  let minVertex;
  let minDist = Infinity;
  for (let i = 0; i < graph.vertexList.length; i++) {
    const curVertex = graph.vertexList[i];
    /* 若curVertex未被收录，且dist.get(curVertex)更小 */
    if (!collected.get(curVertex) && dist.get(curVertex) < minDist) {
      /* 更新最小距离 */
      minDist = dist.get(curVertex);
      /* 更新对应顶点 */
      minVertex = curVertex;
    }
  }
  // 如果能够找到这样的顶点，则返回最小的距离，否则，这样的距离不存在
  return minDist < Infinity ? minVertex : null;
}

/**
 * 迪杰斯特拉算法
 * @param {Graph} graph
 * @param {Vertex} start
 * @param {Map<Vertex, number>} dist
 * @param {Map<Vertex, Vertex>} path
 * @returns
 */
function dijkstra(graph, start, dist = new Map(), path = new Map()) {
  let collected = new Map();
  let vertex;
  /* 先将起点收入集合 */
  dist.set(start, 0);
  collected.set(start, true);
  start.edges.forEach((edge) => {
    let nextVertex = edge.to;
    dist.set(nextVertex, edge.cost);
  });
  while (true) {
    /* vertex为未被收录顶点中dist最小者 */
    vertex = findMinDist(graph, dist, collected);
    /* 若这样的vertex不存在 */
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
          return false;
        }
        /* 若收录vertex使得dist变小 */
        if (dist.get(vertex) + linkEdge.cost < dist.get(curVertex)) {
          /* 更新dist */
          dist.set(curVertex, dist.get(vertex) + linkEdge.cost);
          /* 更新start到curVertex的路径 */
          path.set(i, vertex);
        }
      }
    }
  }
  return true;
}

dijkstra(g, chengdu);
