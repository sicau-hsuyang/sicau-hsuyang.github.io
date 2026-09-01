class Graph {
  nodeRef: Map<number, GNode> = new Map();

  unionFind: UnionFind;

  constructor(initData: Array<[number, number, number]>) {
    initData.forEach(([node1, node2, weight]) => {
      this.init(node1, node2, weight);
    });
    this.unionFind = new UnionFind(this.nodeRef.values());
  }

  private init(nodeNum1: number, nodeNum2: number, weight: number) {
    const node1 = this.nodeRef.get(nodeNum1) ?? new GNode(nodeNum1);
    const node2 = this.nodeRef.get(nodeNum2) ?? new GNode(nodeNum2);
    // 设置缓存
    this.nodeRef.set(nodeNum1, node1);
    this.nodeRef.set(nodeNum2, node2);
    node1.link(node2, weight);
  }

  public kruskalMST(): { edges: GEdge[]; totalWeight: number } {
    const edgeSet: Set<GEdge> = new Set();
    this.nodeRef.forEach((node) => {
      const edges = node.getEdges();
      edges.forEach((edge) => {
        edgeSet.add(edge);
      });
    });
    const targetEdgeCount = edgeSet.size - 1;
    const collectedEdges: GEdge[] = [];
    const sortedEdges = [...edgeSet];
    sortedEdges.sort((a, b) => {
      return a.weight - b.weight;
    });
    let weight = 0;
    // 搜集v-1条边
    while (collectedEdges.length < targetEdgeCount && sortedEdges.length) {
      const edge = sortedEdges.shift()!;
      const { startNode, endNode } = edge;
      const root1 = this.unionFind.find(startNode);
      const root2 = this.unionFind.find(endNode);
      if (root1 != root2) {
        weight += edge.weight;
        collectedEdges.push(edge);
      }
    }

    return {
      edges: collectedEdges,
      totalWeight: weight,
    };
  }
}

class UnionFind {
  private parent: Map<GNode, GNode> = new Map();
  private rank: Map<GNode, number> = new Map();

  constructor(nodes: Iterable<GNode>) {
    for (const node of nodes) {
      this.parent.set(node, node);
      this.rank.set(node, 0);
    }
  }

  find(node: GNode): GNode {
    if (this.parent.get(node) !== node) {
      this.parent.set(node, this.find(this.parent.get(node)!)); // Path compression
    }
    return this.parent.get(node)!;
  }

  union(node1: GNode, node2: GNode): boolean {
    const root1 = this.find(node1);
    const root2 = this.find(node2);

    if (root1 === root2) return false;

    const rank1 = this.rank.get(root1)!;
    const rank2 = this.rank.get(root2)!;

    if (rank1 > rank2) {
      this.parent.set(root2, root1);
    } else if (rank1 < rank2) {
      this.parent.set(root1, root2);
    } else {
      this.parent.set(root2, root1);
      this.rank.set(root1, rank1 + 1);
    }

    return true;
  }
}

class GNode {
  private edgeSet: Set<GEdge> = new Set();

  constructor(private num: number) {}

  getEdges(): GEdge[] {
    return [...this.edgeSet];
  }

  link(targetNode: GNode, weight: number) {
    // 初始化边
    const edge = new GEdge();
    edge.weight = weight;
    targetNode.edgeSet.add(edge);
    this.edgeSet.add(edge);
    // 添加节点的引用
    edge.startNode = this;
    edge.endNode = targetNode;
  }
}

class GEdge {
  weight: number;
  startNode: GNode;
  endNode: GNode;
}
