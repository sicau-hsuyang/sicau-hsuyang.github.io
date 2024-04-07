/**
 * Definition for Employee.
 * class Employee {
 *     id: number
 *     importance: number
 *     subordinates: number[]
 *     constructor(id: number, importance: number, subordinates: number[]) {
 *         this.id = (id === undefined) ? 0 : id;
 *         this.importance = (importance === undefined) ? 0 : importance;
 *         this.subordinates = (subordinates === undefined) ? [] : subordinates;
 *     }
 * }
 */

export class Employee {
  id: number;
  importance: number;
  subordinates: number[];
  constructor(id: number, importance: number, subordinates: number[]) {
    this.id = id || 0;
    this.importance = importance === undefined ? 0 : importance;
    this.subordinates = subordinates === undefined ? [] : subordinates;
  }
}

class TreeNode {
  uid: number;

  weight: number;

  children: TreeNode[];
}

export function getImportance(employees: Employee[], id: number): number {
  const map: Map<number, TreeNode> = new Map();
  employees.forEach((e) => {
    const { id: userId, importance: weight, subordinates: children } = e;
    let node: TreeNode;
    if (map.has(userId)) {
      node = map.get(userId)!;
      node.weight = weight;
    } else {
      node = new TreeNode();
      node.uid = userId;
      node.weight = weight;
      map.set(userId, node);
    }
    node.children = children.map((cid: number) => {
      let child = map.get(cid);
      if (child) {
        return child;
      }
      child = new TreeNode();
      child.uid = cid;
      map.set(cid, child);
      return child;
    }) as TreeNode[];
  });
  const root = map.get(id);
  if (!root) {
    return 0;
  }
  let total = 0;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift()!;
    total += node.weight;
    queue.push(...node.children);
  }
  return total;
}
