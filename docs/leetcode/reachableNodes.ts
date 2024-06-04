export function reachableNodes(
  n: number,
  edges: number[][],
  restricted: number[]
): number {
  /**
   * 边关系的引用
   */
  const map: Map<number, number[]> = new Map();
  const restrictedSet: Set<number> = new Set(restricted);
  edges.forEach((edge) => {
    const [startNum, endNum] = edge;
    const relationShip1 = map.get(startNum) || [];
    if (relationShip1.length === 0) {
      map.set(startNum, relationShip1);
    }
    relationShip1.push(endNum);
    const relationShip2 = map.get(endNum) || [];
    if (relationShip2.length === 0) {
      map.set(endNum, relationShip2);
    }
    relationShip2.push(startNum);
  });
  let total = 1;
  const set: Set<number> = new Set();
  set.add(0);
  const startSiblings = map.get(0) || [];
  const queue: number[] = [];
  startSiblings.forEach((node) => {
    // 不走回头路，不受限
    if (!set.has(node) && !restrictedSet.has(node)) {
      set.add(node);
      queue.push(node);
    }
  });
  while (queue.length) {
    const num = queue.shift()!;
    total += 1;
    const nextSiblings = map.get(num) || [];
    nextSiblings.forEach((node) => {
      // 不走回头路，并且不在受限的节点里面
      if (!set.has(node) && !restrictedSet.has(node)) {
        set.add(node);
        queue.push(node);
      }
    });
  }
  return total;
}
