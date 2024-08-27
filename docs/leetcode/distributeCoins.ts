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

export function distributeCoins(root: TreeNode | null): number {
  let total = 0;

  function moveCoin(root: TreeNode | null) {
    if (!root) {
      return 0;
    }
    let rootStep = Math.abs(root.val - 1);
    let rootCount = root.val - 1;
    if (root.left && root.right) {
      const leftCount = moveCoin(root.left);
      const rightCount = moveCoin(root.right);
      total += Math.abs(leftCount + rootCount + rightCount);
      return leftCount + rootCount + rightCount;
    } else if (root.left) {
      const leftCount = moveCoin(root.left);
      total += Math.abs(leftCount + rootCount);
      return leftCount + rootCount;
    } else if (root.right) {
      const rightCount = moveCoin(root.right);
      total += Math.abs(rightCount + rootCount);
      return rightCount + rootCount;
    } else {
      // 如果是正数代表向上贡献，如果是负数，代表向下索取
      total += rootStep;
      return rootCount;
    }
  }

  moveCoin(root);

  return total;
}
