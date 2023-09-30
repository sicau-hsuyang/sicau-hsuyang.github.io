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

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
export var constructMaximumBinaryTree = function (nums) {
  if (nums.length === 0) {
    return null;
  }
  let maxVal = Math.max(...nums);
  let leftSubTreeIdx = nums.findIndex((x) => x === maxVal);
  let leftSubTree = nums.slice(0, leftSubTreeIdx);
  let rightSubTree = nums.slice(leftSubTreeIdx + 1);
  return {
    val: maxVal,
    left: constructMaximumBinaryTree(leftSubTree),
    right: constructMaximumBinaryTree(rightSubTree),
  };
};

export function insertIntoMaxTree(
  root: TreeNode | null,
  val: number
): TreeNode | null {
  const node: TreeNode = {
    left: null,
    right: null,
    val,
  };
  // 空树
  if (!root) {
    root = node;
    return root;
  }
  // 当前节点就是一个最大节点
  else if (val > root.val) {
    node.left = root;
    return node;
  } else if (root.left && !root.right) {
    // 只有左子树
    // 左子树的根节点比当前节点大，沿着左子树下滤
    if (root.left.val > val) {
      root.left = insertIntoMaxTree(root.left, val);
    } else {
      root.right = node;
    }
    return root;
  } else if (root.right && !root.left) {
    // 只有右子树
    // 右子树的根节点比当前节点大，沿着右子树下滤
    if (root.right.val > val) {
      root.right = insertIntoMaxTree(root.right, val);
    } else {
      root.left = node;
    }
    return root;
  } else if (root.left && root.right) {
    // 左右子树都有
    // 比左子节点小
    if (val < root.left.val) {
      root.left = insertIntoMaxTree(root.left, val);
      return root;
    }
    // 介于左子结点和右子节点之间
    else if (val > root.left.val && val < root.right.val) {
      root.right = insertIntoMaxTree(root.right, val);
      return root;
    }
    // 比右子节点大，那就让这个节点成为当前节点的左子树，原来节点的左右子树接到新节点的左右儿子上
    else {
      const rightSub = root.right;
      root.right = node;
      node.left = rightSub;
    }
    return root;
  } else {
    // 没有左右儿子，但是当前节点比根节点小
    root.right = node;
    return root;
  }
}

// [20, 5,19,2,3,null,18, null,null, null,null,9,12 ]
// [20,5,19,2,3,null,18,null,null,null,null,9,12,null,null,null,4]