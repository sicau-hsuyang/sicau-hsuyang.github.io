export function eventualSafeNodes(graph: number[][]): number[] {
  const preMap: Map<number, Set<number>> = new Map();
  const nextMap: Map<number, Set<number>> = new Map();
  // 找到终点节点
  const queue: number[] = [];
  graph.forEach((rela, num) => {
    // 添加初试的终点节点
    if (rela.length === 0) {
      queue.push(num);
    }
    rela.forEach((intoNum) => {
      const intoDegree = preMap.get(intoNum) || new Set();
      const outputDegree = nextMap.get(num) || new Set();
      if (intoDegree.size === 0) {
        intoDegree.add(num);
        preMap.set(intoNum, intoDegree);
      } else {
        intoDegree.add(num);
      }
      if (outputDegree.size === 0) {
        outputDegree.add(intoNum);
        nextMap.set(num, outputDegree);
      } else {
        outputDegree.add(intoNum);
      }
    });
  });
  const res: number[] = [];
  while (queue.length) {
    const num = queue.shift()!;
    res.push(num);
    const prevNumNodes = preMap.get(num) || new Set();
    // 当前节点的前驱节点遍历，删除它到这个点的所有入度
    for (const prevNode of prevNumNodes) {
      const nextNumNodes = nextMap.get(prevNode)!;
      nextNumNodes.delete(num);
      if (nextNumNodes.size === 0) {
        queue.push(prevNode);
      }
    }
  }
  return res.sort((a, b) => {
    return a - b;
  });
}
