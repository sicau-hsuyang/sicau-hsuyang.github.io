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

function trySum(root: TreeNode | null, currentSum: number, targetSum: number) {
  if (!root) {
    return 0;
  }
  // 这儿是不是等于了 就可以提前return了呢？不能，因为比如求总和 2 2+0 可以 2+0+0也可以
  let temp = currentSum + root.val;
  let count = temp === targetSum ? 1 : 0;
  return (
    count +
    trySum(root.left, temp, targetSum) +
    trySum(root.right, temp, targetSum)
  );
}

export function pathSum(root: TreeNode | null, targetSum: number): number {
  if (!root) {
    return 0;
  }
  let total = trySum(root, 0, targetSum);
  if (root.left) {
    // 要从左子树递归，不能在这儿调用trySum，否则会漏掉左右子树
    total += pathSum(root.left, targetSum);
  }
  if (root.right) {
    // 要从右子树递归，不能在这儿调用trySum，否则会漏掉左右子树
    total += pathSum(root.right, targetSum);
  }
  return total;
}
