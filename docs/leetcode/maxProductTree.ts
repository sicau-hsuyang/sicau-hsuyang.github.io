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

export function maxProduct(root: TreeNode | null): number {
  const map: Map<TreeNode, number> = new Map();
  traverse(root, map);
  const rootSum = map.get(root!)!;
  const stack: TreeNode[] = [];
  let node = root;
  let max = -Infinity;
  while (node || stack.length) {
    while (node) {
      if (node.left && node.right) {
        const leftSum = map.get(node.left)!;
        const remainLeftSum = rootSum - leftSum;
        const leftOptionSum = leftSum * remainLeftSum;
        const rightSum = map.get(node.right)!;
        const remainRightSum = rootSum - rightSum;
        const rightOptionSum = rightSum * remainRightSum;
        const tmpMax = Math.max(leftOptionSum, rightOptionSum);
        if (max < tmpMax) {
          max = tmpMax;
        }
      } else if (node.left) {
        const leftSum = map.get(node.left)!;
        const remainLeftSum = rootSum - leftSum;
        const optionSum = leftSum * remainLeftSum;
        if (optionSum > max) {
          max = optionSum;
        }
      } else if (node.right) {
        const rightSum = map.get(node.right)!;
        const remainRightSum = rootSum - rightSum;
        const optionSum = rightSum * remainRightSum;
        if (optionSum > max) {
          max = optionSum;
        }
      }
      stack.push(node);
      node = node.left;
    }
    if (stack.length) {
      node = stack.pop()!;
      node = node.right;
    }
  }
  return max % (10 ** 9 + 7);
}

function traverse(root: TreeNode | null, map: Map<TreeNode, number>): number {
  if (!root) {
    return 0;
  }
  const leftSubtreeSum = traverse(root.left, map);
  const rightSubtreeSum = traverse(root.right, map);
  const sum = leftSubtreeSum + rightSubtreeSum + root.val;
  map.set(root, sum);
  return sum;
}
