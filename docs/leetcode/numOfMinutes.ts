interface RelationShip {
  // num: number;
  parent?: RelationShip;
  children: RelationShip[];
  cost: number;
}

export function numOfMinutes(
  n: number,
  headID: number,
  manager: number[],
  informTime: number[]
): number {
  let root!: RelationShip;
  const map: Map<number, RelationShip> = new Map();
  // 初始化节点
  for (let i = 0; i < n; i++) {
    const node: RelationShip = {
      // num: i,
      parent: undefined,
      children: [],
      cost: informTime[i],
    };
    map.set(i, node);
    if (headID === i) {
      root = node;
    }
  }
  manager.forEach((managerId, workerId) => {
    // 当employerId为-1时，说明它是根节点
    if (managerId != -1) {
      const parentNode = map.get(managerId)!;
      const node = map.get(workerId)!;
      parentNode.children.push(node);
      node.parent = parentNode;
    }
  });
  return visitTree(root, root.cost);
}

function visitTree(root: RelationShip, cost: number) {
  if (!root || root.children.length === 0) {
    return cost;
  }
  const costList = root.children.map((treeNode) => {
    return visitTree(treeNode, treeNode.cost + cost);
  });
  return Math.max(...costList);
}
