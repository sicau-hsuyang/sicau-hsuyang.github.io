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

function isSame(tree1: TreeNode | null, tree2: TreeNode | null) {
  if (!tree1 && !tree2) {
    return true;
  } else if (
    (!tree1 && tree2) ||
    (tree1 && !tree2) ||
    (tree1 && tree2 && tree1.val !== tree2.val)
  ) {
    return false;
  } else {
    return (
      isSame(tree1!.left, tree2!.right) && isSame(tree2!.left, tree1!.right)
    );
  }
}

export function isSymmetric(root: TreeNode | null): boolean {
  return isSame(root, root);
}
