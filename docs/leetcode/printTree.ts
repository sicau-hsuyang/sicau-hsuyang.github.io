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

function getTreeHeight(root: TreeNode | null) {
  if (!root) {
    return 0;
  }
  const leftHeight = getTreeHeight(root.left);
  const rightHeight = getTreeHeight(root.right);
  return 1 + Math.max(leftHeight, rightHeight);
}

export function printTree(root: TreeNode | null): string[][] {
  const height = getTreeHeight(root);
}
