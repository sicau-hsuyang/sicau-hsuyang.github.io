/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function maxAncestorDiff(root: TreeNode | null): number {
  const ancestorMap: Map<TreeNode, number[]> = new Map();
  const stack: TreeNode[] = [];
  let maxDistance = -Infinity;
  let node = root;
  while (stack.length || node) {
    while (node) {
      console.log(node.val);
      const ancestorNodeList = ancestorMap.get(node) || [];
      stack.push(node);
      if (node.left) {
        const tempArr = [...ancestorNodeList, node.val];
        ancestorMap.set(node.left, tempArr);
        tempArr.forEach((v) => {
          maxDistance = Math.max(Math.abs(node!.left!.val - v), maxDistance);
        });
      }
      node = node.left;
    }
    if (stack.length) {
      node = stack.pop()!;
      const ancestorNodeList = ancestorMap.get(node) || [];
      if (node.right) {
        const tempArr = [...ancestorNodeList, node.val];
        ancestorMap.set(node.right, tempArr);
        tempArr.forEach((v) => {
          maxDistance = Math.max(Math.abs(node!.right!.val - v), maxDistance);
        });
      }
      node = node.right;
    }
  }
  return maxDistance;
}
