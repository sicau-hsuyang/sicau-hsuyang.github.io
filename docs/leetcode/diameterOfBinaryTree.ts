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

function diameterOfBinaryTree(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  if (root.left && root.right) {
    const leftDiameter = diameterOfBinaryTree(root.left);
    const rightDiameter = diameterOfBinaryTree(root.right);
    return Math.max(leftDiameter, rightDiameter) + 1;
  } else if (root.left) {
    const leftDiameter = diameterOfBinaryTree(root.left);
    return leftDiameter + 1;
  } else if (root.right) {
    const rightDiameter = diameterOfBinaryTree(root.right);
    return rightDiameter + 1;
  } else {
    return 1;
  }
}
