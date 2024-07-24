interface EdgeNode {
  node: number;
  cost: number;
}

export function networkDelayTime(
  times: number[][],
  n: number,
  k: number
): number {
  const map: Map<number, EdgeNode[]> = new Map();
  times.forEach((group) => {
    const [start, end, cost] = group;
    const startNodeOutputs = map.get(start) || [];
    if (startNodeOutputs.length === 0) {
      map.set(start, startNodeOutputs);
    }
    startNodeOutputs.push({
      node: end,
      cost,
    });
  });
  const outputNodes = map.get(k)!;
  let visited = 1;
  let maxCost = -Infinity;
  // const usedSet: Set<number> = new Set();
  // usedSet.add(k);
  // 用来记录每个节点到达的最小花费
  const nodeMinCost: Map<number, number> = new Map();
  const dfs = (startNode: EdgeNode, preCost = 0) => {
    // 不走回头路
    // if (usedSet.has(startNode.node)) {
    //   return;
    // }
    // usedSet.add(startNode.node);
    const totalCost = startNode.cost + preCost;
    visited++;
    const nextNodes = map.get(startNode.node) || [];
    nextNodes.forEach((nextNode) => {
      dfs(nextNode, totalCost);
    });
    // 到达叶节点
    if (nextNodes.length === 0) {
      // maxCost = totalCost;
      // 获取到之前到这个节点的最小的花费
      const prevMaxCost = nodeMinCost.get(startNode.node) || Infinity;
      if (prevMaxCost && totalCost < prevMaxCost) {
        nodeMinCost.set(startNode.node, totalCost);
        if (maxCost < totalCost) {
          maxCost = totalCost;
        }
      }
    }
  };
  outputNodes.forEach((node) => {
    dfs(node, 0);
  });
  return visited < n ? -1 : maxCost;
}
