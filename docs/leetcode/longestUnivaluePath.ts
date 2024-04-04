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

class LongestUnivaluePath {
  max = -Infinity;

  constructor(root: TreeNode | null) {
    this.run(root);
  }

  run(root: TreeNode | null) {
    let node = root;
    const stack: TreeNode[] = [];
    while (stack.length || node) {
      while (node) {
        // 自身 + 左边最长的同值节点数 + 右边最长的同值节点数 - 1
        const leftNodes = this.findUnivaluePath(node.left, node.val);
        const rightNodes = this.findUnivaluePath(node.right, node.val);
        const total = leftNodes + rightNodes;
        if (total > this.max) {
          this.max = total;
        }
        stack.push(node);
        node = node.left;
      }

      if (stack.length) {
        node = stack.pop()!;
        node = node.right;
      }
    }
    return this.max;
  }

  findUnivaluePath(root: TreeNode | null, targetVal: number): number {
    // 空树或者不相等，结束
    if (!root || root.val !== targetVal) {
      return 0;
    }
    // 两边都有子树的话，取一个最大值
    if (root.left && root.right) {
      const maxLeftPath = this.findUnivaluePath(root.left, targetVal);
      const maxRightPath = this.findUnivaluePath(root.right, targetVal);
      return Math.max(maxLeftPath, maxRightPath) + 1;
    }
    // 仅仅有左子树
    else if (root.left) {
      return 1 + this.findUnivaluePath(root.left, targetVal);
    }
    // 仅仅有右子树
    else if (root.right) {
      return 1 + this.findUnivaluePath(root.right, targetVal);
    }
    // 没有子树了
    else {
      return 1;
    }
  }
}

export function longestUnivaluePath(root: TreeNode | null): number {
  const calculator = new LongestUnivaluePath(root);
  return calculator.max;
}
