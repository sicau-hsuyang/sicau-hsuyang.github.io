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
   * 顶点列表 @type { Vertex[] }
   */
  vertexList = [];

  /**
   * 增加一个顶点
   * @param {Vertex} v
   */
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
g.addEdge(urumchi, beijing, 300);

/**
 * 弗洛伊德算法
 * @param {Graph} graph
 */
function floyd(graph) {
  // 根据图中最大的顶点数初始化dp数组
  let size = graph.vertexList.length;
  // 初始化无穷大，为了在日后的计算中将最短距离缩小
  const dp = Array.from({
    length: size,
  }).map(() => {
    return Array.from({
      length: size,
    }).fill(Infinity);
  });
  // 初始化为-1，代表两点之间不存在中间节点
  const path = Array.from({
    length: size,
  }).map(() => {
    return Array.from({
      length: size,
    }).fill(-1);
  });
  /**
   * 定义一个求两点之间最短路径的函数
   * @param {Vertex} start
   * @param {Vertex} end
   * @returns
   */
  const getShortestPath = (start, end) => {
    const shortestPath = (i, j) => {
      let k = path[i][j];
      // 如果两点之间不存在中间节点
      if (k < 0) {
        return (
          graph.vertexList[i].cityName + "->" + graph.vertexList[j].cityName
        );
      }
      // 从i到k的路径
      const leftVia = shortestPath(i, k);
      // 从k到j的路径
      const rightVia = shortestPath(k, j);
      // 因为计算途径路径的时候，多算了一个k节点，因此，需要给它替换掉
      const via = leftVia + "->" + rightVia.replace(/^[\u4e00-\u9fa5]+->/, "");
      return via;
    };
    const i = graph.vertexList.findIndex((v) => v === start);
    const j = graph.vertexList.findIndex((v) => v === end);
    if (i < 0 || j < 0) {
      return "";
    }
    return shortestPath(i, j);
  };
  /**
   * 定义一个求两点之间最小化肥的函数
   * @param {Vertex} start
   * @param {Vertex} end
   */
  const getShortestDistance = (start, end) => {
    const i = graph.vertexList.findIndex((v) => v === start);
    const j = graph.vertexList.findIndex((v) => v === end);
    return i >= 0 && j >= 0 ? dp[i][j] : null;
  };
  // 初始化dp的值，若两点之间存在边，则初始化为权重，若不存在边，则初始为无穷大
  for (let i = 0; i < size; i++) {
    // 将对角线初始化为0，因为不允许自回路
    dp[i][i] = 0;
    const v1 = graph.vertexList[i];
    // 将存在邻接点的点初始化为两点之间的权重，若不存在则初始化为无穷大
    v1.edges.forEach((edge) => {
      const j = graph.vertexList.findIndex((x) => x === edge.to);
      dp[i][j] = edge.cost;
    });
  }
  for (k = 0; k < size; k++) {
    for (i = 0; i < size; i++) {
      for (j = 0; j < size; j++) {
        // 如果从i到k的距离和k到j的距离比当前的小，则更新最短距离
        if (dp[i][k] + dp[k][j] < dp[i][j]) {
          dp[i][j] = dp[i][k] + dp[k][j];
          if (i == j && dp[i][j] < 0) {
            /* 若发现负值圈，不能正确解决，返回错误标记 */
            return {
              distance: () => {
                throw new Error("存在负值圈，无法计算");
              },
              path: () => {
                throw new Error("存在负值圈，无法计算");
              },
            };
          }
          // 将k更新在i和j之间，表示从i到j必须要途径k节点
          path[i][j] = k;
        }
      }
    }
  }
  return {
    distance: getShortestDistance,
    path: getShortestPath,
  };
}

const { path, distance } = floyd(g);

const via = path(chengdu, beijing);

const d = distance(chengdu, beijing);

console.log(via, d);
