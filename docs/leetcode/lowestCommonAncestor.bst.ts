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

export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (!root || !p || !q) {
    return null;
  }
  // 如果根节点就是其中一个，那肯定就是最深的根节点
  if (root.val === q.val) {
    return root;
  } else if (root.val === p.val) {
    return root;
  } else {
    // 找到大的节点和小的节点
    const maxNode = p.val > q.val ? p : q;
    const minNode = p === maxNode ? q : p;
    // 如果两个节点都位于BST的一侧，那么最终肯定root节点不可能是他们的公共祖先
    if (maxNode.val < root.val && minNode.val < root.val) {
      // 左子树找
      return lowestCommonAncestor(root.left, p, q);
    } else if (maxNode.val > root.val && minNode.val > root.val) {
      // 右子树找
      return lowestCommonAncestor(root.right, p, q);
    } else {
      return root;
    }
  }
}
