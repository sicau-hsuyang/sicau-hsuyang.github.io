/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var _expandBinaryTree = function (
  root,
  parentNode = null,
  isLeftChild = false
) {
  if (!root) {
    return null;
  }
  if (parentNode) {
    const node = {
      val: -1,
    };
    const leftNode = root.left;
    const rightNode = root.right;
    if (isLeftChild) {
      node.left = root;
      parentNode.left = node;
    } else {
      node.right = root;
      parentNode.right = node;
    }
    _expandBinaryTree(leftNode, root, true);
    _expandBinaryTree(rightNode, root, false);
  } else {
    _expandBinaryTree(root.left, root, true);
    _expandBinaryTree(root.right, root, false);
  }
};

var expandBinaryTree = function (root) {
  _expandBinaryTree(root);
  return root;
};

/**
 * LeetCode 数组转二叉树
 * @param {number[]} arr
 */
function arrToTree(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }
  let root = null;
  let offset = 0;
  // 根节点从1开始
  let size = 1;
  let parentNodes = [];
  // 每次提取一层数据进行构建
  let levelChunk = arr.slice(offset, offset + size);
  offset += size;
  while (levelChunk.length) {
    let counter = 0;
    for (let i = 0; i < levelChunk.length; i++) {
      let val = levelChunk[i];
      let treeNode = null;
      if (val !== null) {
        // 计算出每层节点数
        counter++;
        treeNode = {
          val,
          left: null,
          right: null,
        };
      }
      // 根据当前层节点的数据计算出父节点所在的位置
      let parentIdx = Math.floor(i / 2);
      let isLeftChild = i % 2 === 0;
      if (!parentNodes[parentIdx] && root === null) {
        root = treeNode;
      } else if (parentNodes[parentIdx]) {
        // 挂载左右儿子节点
        if (isLeftChild) {
          parentNodes[parentIdx].left = treeNode;
        } else {
          parentNodes[parentIdx].right = treeNode;
        }
      }
      levelChunk[i] = treeNode;
    }
    // 把当前层的空节点过滤掉，重新构建关系
    parentNodes = levelChunk.filter((x) => x !== null);
    // 计算出下一层的节点数
    size = 2 * counter;
    levelChunk = arr.slice(offset, offset + size);
    offset += size;
  }
  return root;
}

// const arr = [7, 5, 6];

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const arr = [3,1,7,3,8,null,4]

const tree = arrToTree(arr);

const t = expandBinaryTree(tree);

console.log(t);
