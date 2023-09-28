interface Vertex {
  next: Vertex[];
  prev: Vertex[];
}

export function minReorder(n: number, connections: number[][]): number {
  const refs: Vertex[] = Array.from({
    length: n,
  }).map(() => {
    return {
      next: [],
      prev: [],
    };
  });
  const refMap: Map<Vertex, Vertex[]> = new Map();
  connections.forEach((edge) => {
    const cur = edge[0];
    const next = edge[1];
    const curNode = refs[cur];
    const nextNode = refs[next];
    curNode.next.push(nextNode);
    const set = refMap.get(nextNode);
    if (!set) {
      refMap.set(nextNode, [curNode]);
    } else {
      set.push(curNode);
    }
  });
  const map: Map<Vertex, boolean> = new Map();
  // 从0开始，0自动去掉
  map.set(refs[0], true);
  const queue: Vertex[] = [refs[0]];
  let counter = 0;
  while (queue.length) {
    const node = queue.shift()!;
    const parentSet: Vertex[] = refMap.get(node) || [];
    parentSet.forEach((p) => {
      if (!map.get(p)) {
        map.set(p, true);
        queue.push(p);
      }
    });
    node.next.forEach((next) => {
      if (!map.get(next)) {
        map.set(next, true);
        queue.push(next);
        counter++;
      }
    });
  }
  return counter;
}
