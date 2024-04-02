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
  left: TreeNode | null;
  right: TreeNode | null;
  val: number;
}

export function allPossibleFBT(n: number): Array<TreeNode | null> {
  if (n % 2 === 0) {
    return [];
  }
  if (n === 1) {
    return [
      {
        left: null,
        right: null,
        val: 0,
      },
    ];
  }
  const results: TreeNode[] = [];
  for (let i = 1; i <= n - 1; i += 2) {
    const leftSubtrees = allPossibleFBT(i);
    const rightSubtrees = allPossibleFBT(n - 1 - i);
    leftSubtrees.forEach((leftNode) => {
      rightSubtrees.forEach((rightNode) => {
        results.push({
          val: 0,
          left: leftNode,
          right: rightNode,
        });
      });
    });
  }
  return results;
}
