function countStep(
  node: number,
  duplicateSet: Set<number>,
  nodeRef: Map<number, number[]>,
  hasApple: boolean[]
): number {
  const children: number[] = nodeRef.get(node)!;
  // 叶节点
  if (children.length === 0) {
    // 如果当前节点有苹果，出和入分别需要计算一次
    return hasApple[node] && node !== 0 ? 2 : 0;
  }
  const temp = children.filter((v) => {
    return !duplicateSet.has(v);
  });
  const childrenStep: number = temp.reduce((sumStep, childNode) => {
    // 加入到集合中，避免重复计算
    duplicateSet.add(childNode);
    const childStep = countStep(childNode, duplicateSet, nodeRef, hasApple);
    return sumStep + childStep;
  }, 0);
  // 如果后面都没有苹果了
  if (childrenStep === 0) {
    // 如果当前节点有苹果，出和入分别需要计算一次，但是如果是根节点，不需要处理
    return hasApple[node] && node !== 0 ? 2 : 0;
  } else {
    // 这个节点需要处理一下，所以+2，对于根节点，不需要增加这个操作
    return childrenStep + (node === 0 ? 0 : 2);
  }
}

export function minTime(
  n: number,
  edges: number[][],
  hasApple: boolean[]
): number {
  const nodeRef: Map<number, number[]> = new Map();
  // 初始化引用
  for (let i = 0; i < n; i++) {
    nodeRef.set(i, []);
  }
  // 建立引用关系
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    const [a, b] = edge;
    const edges1 = nodeRef.get(a)!;
    const edges2 = nodeRef.get(b)!;
    edges1.push(b);
    edges2.push(a);
  }
  const set: Set<number> = new Set();
  set.add(0);
  const total = countStep(0, set, nodeRef, hasApple);
  return total;
}
