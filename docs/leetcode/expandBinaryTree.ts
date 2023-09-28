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
  left: null | TreeNode;
  right: null | TreeNode;
}

export function expandBinaryTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  } else {
    if (root.right) {
      const node: TreeNode = {
        left: null,
        right: null,
        val: -1,
      };
      let rightChild = root.right;
      root.right = node;
      node.right = expandBinaryTree(rightChild);
    }

    if (root.left) {
      const node: TreeNode = {
        left: null,
        right: null,
        val: -1,
      };
      let leftChild = root.left;
      root.left = node;
      node.left = expandBinaryTree(leftChild);
    }
    return root;
  }
}
