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

/**
 

需要考虑删完的case
 
 
 */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function sufficientSubset(
  root: TreeNode | null,
  limit: number
): TreeNode | null {
  if (!root) {
    return null;
  }
  const queue: Array<TreeNode[]> = [[root]];
  const refMap: Map<TreeNode, TreeNode> = new Map();
  const leavesLayer: TreeNode[] = [];
  const sumRef: Map<TreeNode, number> = new Map();
  sumRef.set(root, root.val);
  while (queue.length) {
    const chunk = queue.pop()!;
    const nextChunk: TreeNode[] = [];
    chunk.forEach((node) => {
      const pNode = refMap.get(node);
      if (pNode) {
        const pSum = sumRef.get(pNode) || 0;
        const total = pSum + node.val;
        sumRef.set(node, total);
      }
      if (node.left) {
        refMap.set(node.left, node);
        nextChunk.push(node.left);
      }
      if (node.right) {
        refMap.set(node.right, node);
        nextChunk.push(node.right);
      }
      if (!node.left && !node.right) {
        leavesLayer.push(node);
      }
    });
    if (nextChunk.length) {
      queue.push(nextChunk);
    }
  }
  leavesLayer.forEach((node) => {
    let startSum = sumRef.get(node) || 0;
    // 开始删除节点
    if (startSum < limit) {
      let subNode = node;
      let parentNode = refMap.get(subNode);
      while (true) {
        if (!parentNode) {
          if (subNode === root && !subNode.left && !subNode.right) {
            root = null;
          }
          break;
        }
        if (parentNode.left === subNode) {
          parentNode.left = null;
          if (parentNode.right) {
            break;
          }
        } else {
          parentNode.right = null;
          if (parentNode.left) {
            break;
          }
        }
        subNode = parentNode;
        parentNode = refMap.get(subNode);
      }
    }
  });
  return root;
}
