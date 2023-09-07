import { SimpleDsu } from "leetcode-test-utils";

export function validateBinaryTreeNodes(
  n: number,
  leftChild: number[],
  rightChild: number[]
): boolean {
  const dsu = new SimpleDsu(n);
  const refMap: Map<number, number> = new Map();

  for (let i = 0; i < leftChild.length; i++) {
    const val = leftChild[i];
    if (val === -1) {
      continue;
    }
    let node1 = i + 1;
    let node2 = val + 1;
    const node1Idx = dsu.find(node1);
    const node2Idx = dsu.find(node2);
    // 当前节点已经用被用过了，并且归属于同一个集合内
    if (
      // node1所在的集合多余2个点
      (dsu.dataSet[node1Idx] < -1 &&
        // node1和node2不在一个集合内
        node1Idx === node2Idx &&
        // node2不是一个孤立的点
        dsu.dataSet[node2Idx] != -1) ||
      // node2还没有被谁引用过
      refMap.get(node2)
    ) {
      return false;
    }
    dsu.union(node1, node2);
    // 设置引用
    refMap.set(node2, node1);
  }

  for (let i = 0; i < rightChild.length; i++) {
    const val = rightChild[i];
    if (val === -1) {
      continue;
    }
    let node1 = i + 1;
    let node2 = val + 1;
    const node1Idx = dsu.find(node1);
    const node2Idx = dsu.find(node2);
    // 当前节点已经用被用过了，并且归属于同一个集合内
    if (
      (dsu.dataSet[node1Idx] < -1 &&
        dsu.dataSet[node2Idx] != -1 &&
        node1Idx === node2Idx) ||
      // node2还没有被引用过
      refMap.get(node2)
    ) {
      return false;
    }
    dsu.union(node1, node2);
    // 设置引用
    refMap.set(node2, node1);
  }
  return dsu.count() === 1;
}
