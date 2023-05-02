interface RelationShip {
  num: number;
  parent?: RelationShip;
  children: RelationShip[];
  isNotified: boolean;
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
      num: i,
      parent: undefined,
      children: [],
      isNotified: false,
    };
    map.set(i, node);
    if (headID === i) {
      root = node;
    }
  }
  manager.forEach((employerId, employeeId) => {
    // 当employerId为-1时，说明它是根节点
    if (employerId != -1) {
      const parentNode = map.get(employerId)!;
      const node = map.get(employeeId)!;
      parentNode.children.push(node);
      node.parent = parentNode;
    }
  });
  let sum = 0;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift()!;
    // 只统计没有通知到节点
    if (!node.isNotified) {
      sum += informTime[node.num];
    }
    if (Array.isArray(node.children) && node.children.length) {
      node.children.forEach((levelNode) => {
        levelNode.isNotified = true;
      });
      queue.push(...node.children);
    }
  }
  return sum;
}
