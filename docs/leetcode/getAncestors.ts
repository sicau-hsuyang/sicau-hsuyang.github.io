interface Vertex {
  num: number;
  inDegree: Vertex[];
  outDegree: Vertex[];
}

export function getAncestors(n: number, edges: number[][]): number[][] {
  const ref: Vertex[] = Array.from({
    length: n,
  }).map((_, num) => {
    return {
      num,
      inDegree: [],
      outDegree: [],
    };
  });
  const getParent = (target: Vertex) => {
    const nodes: number[] = [];
    const map: Map<Vertex, boolean> = new Map();
    const queue: Vertex[] = [];
    target.inDegree.forEach((node) => {
      queue.push(node)
      map.set(node, true);
    });
    while (queue.length) {
      const node = queue.shift()!;
      nodes.push(node.num);
      node.inDegree.forEach((pre) => {
        if (!map.get(pre)) {
          queue.push(pre);
          map.set(pre, true);
        }
      });
    }
    return nodes.sort((a, b) => {
      return a - b;
    });
  };
  edges.forEach((refer) => {
    const cur = refer[0];
    const pre = refer[1];
    const curNode = ref[cur];
    const preNode = ref[pre];
    curNode.outDegree.push(preNode);
    preNode.inDegree.push(curNode);
  });
  const results: number[][] = [];
  for (let i = 0; i < n; i++) {
    const ancestors = getParent(ref[i]);
    results.push(ancestors);
  }
  return results;
}
