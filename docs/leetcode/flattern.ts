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

/**
 Do not return anything, modify root in-place instead.
 */
export function flatten(root: TreeNode | null): void {
  const getPrevNode = (head: TreeNode | null) => {
    if (!head) {
      return null;
    }
    let prev: TreeNode | null = null;
    let node: TreeNode | null = head;
    while (node) {
      prev = node;
      node = node.right;
    }
    return prev;
  };

  const dfs = (node: TreeNode | null) => {
    if (!node) {
      return null;
    }
    let head: TreeNode | null = node;
    let leftNode = head.left;
    let rightNode = head.right;
    head.left = null;
    head.right = null;
    if (leftNode) {
      const list = dfs(leftNode);
      head.right = list;
      head = getPrevNode(list);
    }
    if (rightNode) {
      const list = dfs(rightNode);
      head!.right = list;
    }
    return node;
  };

  dfs(root);
  console.log(root);
}
