/**
 * 边
 */
class Edge {
  /**
   * 节点的传输时间
   */
  cost: number;
  /**
   * 下一个节点
   */
  next: Vertex;
}

/**
 * 节点
 */
class Vertex {
  /**
   * 节点编号
   */
  num: number;
  /**
   * 节点的出度
   */
  outputDegree: Set<Edge>;
}

/**
 * 图
 */
class Graph {
  /**
   * 图的节点数
   */
  size = 0;
  /**
   * 图中的顶点
   */
  nodes: Map<number, Vertex> = new Map();
}

function buildGraph(times: number[][]) {
  const g = new Graph();
  const map: Map<number, number[][]> = new Map();
  times.forEach((node) => {
    const v = node[0];
    if (!map.has(v)) {
      map.set(v, [node]);
    } else {
      map.get(v)!.push(node);
    }
  });
  map.forEach((value, key) => {
    value.forEach((relationship) => {
      // 图中能不能找到节点
      let sourceVertex = g.nodes.get(key);
      // 找不到，则新增
      if (!sourceVertex) {
        sourceVertex = new Vertex();
        sourceVertex.num = relationship[0];
        g.size++;
        // 设置节点引用
        g.nodes.set(key, sourceVertex);
      }
      // 尝试在图内找节点
      let targetVertex = g.nodes.get(relationship[1]);
      // 如果找不到，则新增
      if (!targetVertex) {
        targetVertex = new Vertex();
        targetVertex.num = relationship[1];
        g.nodes.set(relationship[1], targetVertex);
        g.size++;
      }
      const edge = new Edge();
      // 花费的时间
      edge.cost = relationship[2];
      edge.next = targetVertex;
      // 把边加入到出度中
      sourceVertex.outputDegree.add(edge);
    });
  });
  return g;
}

function networkDelayTime(times: number[][], n: number, k: number): number {
  const g = buildGraph(times);
  // 图不连通
  if (g.size < n) {
    return -1;
  }
  // 获取开始的节点
  const startNode = g.nodes.get(k);
  const queue = [[startNode]];
  let counter = 1;
  // 目标花费时间
  let distCost = 0;
  while (queue.length) {
    const level = queue.shift()!;
    let maxCost = 0;
    const nextLevel: Vertex[] = [];
    // 有的时间快，有的时间慢，比如某一个节点等着，另外一个节点已经往外传递了好几圈都有可能
    level.forEach((node) => {
      [...node!.outputDegree.values()].forEach((v) => {
        // 更新时间花费
        if (maxCost < v.cost) {
          maxCost = v.cost;
        }
        if (v.next) {
          nextLevel.push(v.next);
        }
      });
    });
    counter += nextLevel.length;
    distCost += maxCost;
    // TODO: 不知道怎么算最小值
    if (nextLevel.length) {
      queue.push(nextLevel);
    }
  }
  // 如果图连通，但是统计到的节点数小于图总的顶点数
  if (counter < n) {
    return -1;
  }
  return distCost;
}
