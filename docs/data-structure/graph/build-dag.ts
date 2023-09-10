import { Edge, Graph, Vertex } from "./topology-sort";

interface VertexInfo {
  id: string;
  name: string;
  deps: string;
}

export class BuildDAG {
  private refMap: Map<string, VertexInfo> = new Map();

  private builtMap: Map<string, Vertex> = new Map();

  private vertexInfo: VertexInfo[];

  constructor(vertexInfo: VertexInfo[]) {
    this.vertexInfo = vertexInfo;
  }

  /**
   * 链接两个节点
   * @param startVertex 开始节点
   * @param endVertex 结束节点
   */
  private link(startVertex: Vertex, endVertex: Vertex): void {
    const edge: Edge = {
      prev: startVertex,
      next: endVertex,
    };
    startVertex.outDegree.push(edge);
    endVertex.inDegree.push(edge);
  }
  /**
   * 构建顶点
   * @param name 顶点的名称
   * @param deps 顶点的依赖节点
   */
  private buildVertex(id: string) {
    const vertexInfo = this.refMap.get(id);
    if (!vertexInfo) {
      return null;
    }
    if (this.builtMap.get(id)) {
      return this.builtMap.get(id);
    }
    const { id: vertexId, deps, name } = vertexInfo;
    const vertex: Vertex = {
      name,
      inDegree: [],
      outDegree: [],
    };
    const depsNodes: Vertex[] =
      deps === ""
        ? []
        : deps.split(",").map((depId) => {
            return this.buildVertex(depId) as Vertex;
          });
    depsNodes.forEach((pre) => {
      this.link(pre, vertex);
    });
    this.builtMap.set(vertexId, vertex);
    return vertex;
  }

  /**
   * 构建图
   */
  private buildGraph(): Graph {
    this.vertexInfo.forEach((item) => {
      this.refMap.set(item.id, item);
    });
    const nodes = this.vertexInfo.map((v) => {
      return this.buildVertex(v.id) as Vertex;
    });
    return {
      nodes,
      get count() {
        return nodes.length;
      },
    };
  }

  build() {
    return this.buildGraph();
  }
}
