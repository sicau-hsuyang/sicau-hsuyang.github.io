/**
 * 顶点
 */
export interface Vertex {
  num: number;
  /**
   * 入度
   */
  inDegree: Vertex[];
  /**
   * 出度
   */
  outDegree: Vertex[];
}

interface VertexInfo {
  deps: number[];
}

export class BuildDAG {
  refMap: VertexInfo[] = [];
  /**
   * 用来检测使用存在环的哈希表
   */
  private detectCycleMap: Map<number, number> = new Map();

  private builtMap: Map<number, Vertex> = new Map();

  groupBy(prerequisites: Array<[number, number]>) {
    const map: Map<number, number[]> = new Map();
    prerequisites.forEach((depRef) => {
      const num = depRef[0];
      const set = map.get(num);
      if (Array.isArray(set)) {
        set.push(depRef[1]);
      } else {
        map.set(num, [depRef[1]]);
      }
    });
    map.forEach((value, num) => {
      this.refMap[num].deps = value;
    });
  }

  constructor(total: number, prerequisites: Array<[number, number]>) {
    // 初始化引用数组
    this.refMap = Array.from({
      length: total,
    }).map(() => {
      return {
        deps: [],
      };
    });
    this.groupBy(prerequisites);
  }

  /**
   * 链接两个节点
   * @param startVertex 开始节点
   * @param endVertex 结束节点
   */
  private link(startVertex: Vertex, endVertex: Vertex): void {
    startVertex.outDegree.push(endVertex);
    endVertex.inDegree.push(startVertex);
  }
  /**
   * 构建顶点
   * @param num 顶点的编号
   */
  private buildVertex(num: number) {
    if (this.builtMap.get(num)) {
      return this.builtMap.get(num);
    }
    const vertex: Vertex = {
      inDegree: [],
      outDegree: [],
      num,
    };
    const depsNodes: number[] = this.refMap[num].deps;
    depsNodes.forEach((preNum) => {
      if (this.detectCycleMap.get(num) === preNum) {
        throw new Error("循环依赖");
      } else {
        // 将当前节点的前驱节点添加到依赖路径上
        this.detectCycleMap.set(num, preNum);
        const preVertex = this.buildVertex(preNum)!;
        this.link(preVertex, vertex);
      }
    });
    this.builtMap.set(num, vertex);
    return vertex;
  }

  getGraph() {
    return [...this.builtMap.values()];
  }

  build(): boolean {
    try {
      for (let i = 0; i < this.refMap.length; i++) {
        this.buildVertex(i);
      }
      return true;
    } catch (exp) {
      return false;
    }
  }
}

/**
 * 拓扑排序
 */
function topologicalSort(nodes: Vertex[], total: number) {
  // 用于记住入度数
  const inDegreeMap: Map<Vertex, number> = new Map();
  // 队列，用于处理入度是0的点
  const queue: Vertex[] = [];
  let count = 0;
  const results: number[] = []
  // 初始化的时候，用map记住每个节点的入度数
  nodes.forEach((v) => {
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
    // 处理的个数加1
    count++;
    results.push(vertex.num);
    // 处理出度
    vertex.outDegree.forEach((vertex) => {
      // 获取后继节点的入度
      const inDegree = inDegreeMap.get(vertex)!;
      // 设置节点新的入度
      inDegreeMap.set(vertex, inDegree - 1);
      // 如果除开这个节点的话，下个节点的入度将会是0，说明经过这个操作之后它已经没有入度了，可以进行操作了
      if (inDegree === 1) {
        queue.push(vertex);
      }
    });
  }
  // 如果把所有的入度为0的节点都找过了，凡是发现不够总的节点个数，于是可以得出一个结论，某些节点的入度无论如何不可能是0，于是可以推导出图中存在回路的结论。
  if (count < total) {
    return [];
  }
  return results;
}

export function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const builder = new BuildDAG(
    numCourses,
    prerequisites as Array<[number, number]>
  );
  const buildSuccess = builder.build();
  if (!buildSuccess) {
    return [];
  }
  const g = builder.getGraph();
  return topologicalSort(g, numCourses);
}
