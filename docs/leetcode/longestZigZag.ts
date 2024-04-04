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

class LongestZigZag {
  max = -Infinity;

  leftMap: Map<TreeNode, number> = new Map();

  rightMap: Map<TreeNode, number> = new Map();

  constructor(root: TreeNode | null) {
    this.run(root);
  }

  run(root: TreeNode | null) {
    let node = root;
    let stack: TreeNode[] = [];
    while (node || stack.length) {
      while (node) {
        const leftMax = this.calcMaxZigTag(node, node!.val, 0, false);
        const rightMax = this.calcMaxZigTag(node, node!.val, 0, true);
        if (leftMax > this.max) {
          this.max = leftMax;
        }
        if (rightMax > this.max) {
          this.max = rightMax;
        }
        stack.push(node);
        node = node.left;
      }
      if (stack.length) {
        node = stack.pop()!;
        node = node.right;
      }
    }
  }

  calcMaxZigTag(
    root: TreeNode | null,
    targetVal: number,
    len: number,
    isLeft: boolean
  ) {
    if (!root) {
      return len;
    }
    let size: number;
    // 当前来源是左子树，接下来要开始在右子树上找了
    if (isLeft && root.right) {
      size =
        this.leftMap.get(root) ||
        this.calcMaxZigTag(root.right, targetVal, len + 1, false);
    }
    // 当前来源是右子树，接下来要在左子树上找了
    else if (!isLeft && root.left) {
      size =
        this.rightMap.get(root) ||
        this.calcMaxZigTag(root.left, targetVal, len + 1, true);
    }
    // 不符合Z字形了，结束递归
    else {
      size = len;
    }
    if (isLeft) {
      this.leftMap.set(root, size);
    } else {
      this.rightMap.set(root, size);
    }
    return size;
  }
}

export function longestZigZag(root: TreeNode | null): number {
  const calculator = new LongestZigZag(root);
  return calculator.max;
}
