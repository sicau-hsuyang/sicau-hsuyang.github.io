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

export function kthLargestLevelSum(root: TreeNode | null, k: number): number {
  if (!root) {
    return -1;
  }
  const levelContainer: number[] = [];
  const queue: TreeNode[][] = [[root]];
  while (queue.length) {
    const level = queue.shift()!;
    let sum = 0;
    const nextLevel: TreeNode[] = [];
    level.forEach((node) => {
      sum += node.val;
      if (node.left) {
        nextLevel.push(node.left);
      }
      if (node.right) {
        nextLevel.push(node.right);
      }
    });
    levelContainer.push(sum);
    if (nextLevel.length) {
      queue.push(nextLevel);
    }
  }
  if (levelContainer.length < k) {
    return -1;
  }
  levelContainer.sort((a, b) => {
    return b - a;
  });
  return levelContainer[k - 1];
}
