/**
 * 顶点
 */
export interface Vertex {
  /**
   * 入度
   */
  inDegree: Edge[];
  /**
   * 出度
   */
  outDegree: Edge[];
  /**
   * 节点名称
   */
  name: string;
}

export interface Edge {
  /**
   * 权重
   */
  weight?: number;
  /**
   * 前驱节点
   */
  prev: Vertex;
  /**
   * 后继节点
   */
  next: Vertex;
}

/**
 * 图
 */
export interface Graph {
  /**
   * 图的节点数组
   */
  nodes: Vertex[];
  /**
   * 图的节点的个数
   */
  get count(): number;
}

/**
 * 拓扑排序
 */
export function topologySort(g: Graph) {
  // 用于记住入度数
  const inDegreeMap: Map<Vertex, number> = new Map();
  // 队列，用于处理入度是0的点
  const queue: Vertex[] = [];
  const topSortResults: Vertex[] = [];
  let count = 0;
  // 初始化的时候，用map记住每个节点的入度数
  g.nodes.forEach((v) => {
    if (v.inDegree.length === 0) {
      queue.push(v);
    } else {
      inDegreeMap.set(v, v.inDegree.length);
    }
  });
  // 开始进行拓扑排序，一直处理所有的入度为0的节点直到没有
  while (queue.length) {
    // 出队一个节点进行处理
    const vertex = queue.shift()!;
    // 将其加入到结果里面去
    topSortResults.push(vertex);
    // 处理的个数加1
    count++;
    // 处理出度
    vertex.outDegree.forEach((edge) => {
      const nextVertex = edge.next;
      // 获取后继节点的入度
      const inDegree = inDegreeMap.get(nextVertex)!;
      // 设置节点新的入度
      inDegreeMap.set(nextVertex, inDegree - 1);
      // 如果除开这个节点的话，下个节点的入度将会是0，说明经过这个操作之后它已经没有入度了，可以进行操作了
      if (inDegree === 1) {
        queue.push(nextVertex);
      }
    });
  }
  // 如果把所有的入度为0的节点都找过了，凡是发现不够总的节点个数，于是可以得出一个结论，某些节点的入度无论如何不可能是0，于是可以推导出图中存在回路的结论。
  if (count < g.count) {
    throw new Error("图中存在回路，无法进行拓扑排序~");
  }

  return topSortResults;
}
