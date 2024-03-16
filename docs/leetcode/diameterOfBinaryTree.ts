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

export function diameterOfBinaryTree(root: TreeNode | null): number {
  let maxHeight = 1;
  function getHeight(node: TreeNode | null) {
    if (node === null) {
      return 0;
    }
    const lHeight = getHeight(node.left);
    const rHeight = getHeight(node.right);
    maxHeight = Math.max(maxHeight, lHeight + rHeight + 1);
    return Math.max(lHeight, rHeight) + 1;
  }
  getHeight(root);
  return maxHeight - 1;
}
