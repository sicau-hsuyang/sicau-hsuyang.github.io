export function findMinHeightTrees(n: number, edges: number[][]): number[] {
  const refMap: Map<number, Set<number>> = new Map();
  for (let i = 0; i < n; i++) {
    refMap.set(i, new Set());
  }
  edges.forEach((edge) => {
    const [a, b] = edge;
    const childrenA = refMap.get(a)!;
    const childrenB = refMap.get(b)!;
    childrenA.add(b);
    childrenB.add(a);
  });
  while (refMap.size > 2) {
    const pendingDelKeys: number[] = [];
    const notRemoveSet: Set<number> = new Set();
    refMap.forEach((set, key) => {
      if (set.size === 1 && !notRemoveSet.has(key)) {
        pendingDelKeys.push(key);
        // 通过仅剩的一个边获取到它的邻接节点
        const edges = [...refMap.get(key)!.keys()];
        // 邻接节点删除对当前边的引用，获取到邻接节点
        const nextNode = refMap.get(edges[0]);
        nextNode!.delete(key);
        // 必须将下一个节点加入到不能删的列表里面去，否则就多删了
        notRemoveSet.add(edges[0]);
      }
    });
    pendingDelKeys.forEach((key) => {
      refMap.delete(key);
    });
  }
  return [...refMap.keys()];
}
