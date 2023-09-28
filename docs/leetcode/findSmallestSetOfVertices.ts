interface Vertex {
  next: Vertex[];
  prev: Vertex[];
}

export function findSmallestSetOfVertices(
  n: number,
  edges: number[][]
): number[] {
  const refs: Vertex[] = Array.from({
    length: n,
  }).map((v) => {
    return {
      next: [],
      prev: [],
    };
  });
  edges.forEach((edge) => {
    const cur = edge[0];
    const next = edge[1];
    const curVertex = refs[cur];
    const nextVertex = refs[next];
    curVertex.next.push(nextVertex);
    nextVertex.prev.push(curVertex);
  });
  const map: Map<Vertex, boolean> = new Map();
  const results: number[] = [];
  for (let i = 0; i < n; i++) {
    const node = refs[i];
    if (node.prev.length) {
      continue;
    }
    if (map.get(node)) {
      continue;
    }
    results.push(i);
    const queue: Vertex[] = [node];
    while (queue.length) {
      const p = queue.shift()!;
      p.next.forEach((next) => {
        if (!map.get(next)) {
          map.set(next, true);
          queue.push(next);
        }
      });
    }
  }
  return results;
}
