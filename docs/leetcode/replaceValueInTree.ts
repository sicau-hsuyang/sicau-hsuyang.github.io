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
 * 统计每层的节点和
 * @param root
 */
function statisticLevelSum(root: TreeNode, parentNode: TreeNode | null) {
  const refMap: Map<TreeNode, TreeNode | null> = new Map();
  refMap.set(root, parentNode);
  const queue: TreeNode[][] = [[root]];
  while (queue.length) {
    const chunk = queue.shift()!;
    const nextChunk: TreeNode[] = [];
    chunk.forEach((nextNode) => {
      if (nextNode.left) {
        refMap.set(nextNode.left, nextNode);
        nextChunk.push(nextNode.left);
      }
      if (nextNode.right) {
        refMap.set(nextNode.right, nextNode);
        nextChunk.push(nextNode.right);
      }
    });
    if (nextChunk.length) {
      queue.push(nextChunk);
    }
  }
  return refMap
}

function replaceValueInTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return root;
  }
}
