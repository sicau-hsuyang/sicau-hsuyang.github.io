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

export function pseudoPalindromicPaths(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  return traverse(root, {});
}

/**
 * 复制路径
 * @param path
 * @returns
 */
function copy(path: Record<number, number>) {
  const copied = {};
  for (const prop in path) {
    copied[prop] = path[prop];
  }
  return copied;
}

/**
 * 遍历树节点
 * @param node
 */
function traverse(node: TreeNode | null, path: Record<number, number>) {
  if (!node) {
    return 0;
  }
  // 叶节点
  if (!node.left && !node.right) {
    let hasOdd = false;
    if (path[node.val]) {
      path[node.val]++;
    } else {
      path[node.val] = 1;
    }
    for (let prop in path) {
      if (path[prop] % 2 !== 0 && !hasOdd) {
        hasOdd = true;
      } else if (path[prop] % 2 !== 0 && hasOdd) {
        return 0;
      }
    }
    return 1;
  }
  // 有左子结点
  else if (node.left && !node.right) {
    const copiedLeftPath = copy(path);
    if (copiedLeftPath[node.val]) {
      copiedLeftPath[node.val]++;
    } else {
      copiedLeftPath[node.val] = 1;
    }
    return traverse(node.left, copiedLeftPath);
  }
  // 有右子节点
  else if (!node.left && node.right) {
    const copiedRightPath = copy(path);
    if (copiedRightPath[node.val]) {
      copiedRightPath[node.val]++;
    } else {
      copiedRightPath[node.val] = 1;
    }
    return traverse(node.right, copiedRightPath);
  }
  // 有左右子节点
  else {
    const copiedLeftPath = copy(path);
    if (copiedLeftPath[node.val]) {
      copiedLeftPath[node.val]++;
    } else {
      copiedLeftPath[node.val] = 1;
    }
    let leftSize = traverse(node.left, copiedLeftPath);
    const copiedRightPath = copy(path);
    if (copiedRightPath[node.val]) {
      copiedRightPath[node.val]++;
    } else {
      copiedRightPath[node.val] = 1;
    }
    let rightSize = traverse(node.right, copiedRightPath);
    return leftSize + rightSize;
  }
}
