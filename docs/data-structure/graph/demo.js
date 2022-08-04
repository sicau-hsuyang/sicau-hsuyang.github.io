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

// /**
//  * 单源无权图的最短路算法
//  * @param {Vertex} start
//  * @param {Vertex} end
//  */
// function unweightedShortestPath(start, end) {
//   const queue = [];
//   const dist = new Map();
//   const path = new Map();
//   dist.set(start, 0);
//   queue.push(start);
//   while (queue.length > 0) {
//     let vertex = queue.shift();
//     for (let i = 0; i < vertex.siblings.length; i++) {
//       let adjoinVertex = vertex.siblings[i];
//       /* 若adjoinVertex未被访问过 */
//       if (typeof dist.get(adjoinVertex) === "undefined") {
//         /* 将这个点到start的距离更新 */
//         dist.set(adjoinVertex, dist.get(vertex) + 1);
//         /* 将这个点记录在S到adjoinVertex的路径上 */
//         path.set(adjoinVertex, vertex);
//         queue.push(adjoinVertex);
//       }
//     }
//   }
//   const distance = dist.get(end);
//   const stack = [end];
//   let preVertex = path.get(end);
//   while (preVertex) {
//     stack.push(preVertex);
//     preVertex = path.get(preVertex);
//   }
//   let via = "";
//   while (stack.length) {
//     const city = stack.pop();
//     via += "->" + city.cityName;
//   }
//   return { distance, path: via.replace(/(^->)|(->$)/g, "") };
// }

const { distance, path } = unweightedShortestPath(chengdu, beijing);

console.log(distance, path);

debugger;
