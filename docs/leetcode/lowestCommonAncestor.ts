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

export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (!root) {
    return null;
  }
  const ref: Map<TreeNode, TreeNode | null> = new Map();
  const stack: TreeNode[] = [];
  let node: TreeNode | null = root;
  ref.set(node, null);
  while (stack.length || node) {
    while (node) {
      // 当前节点是p节点,找得到，说明当前节点就是他们的共同父节点
      if (node.val === p!.val && findNode(node, q!.val)) {
        return p;
      }
      // 当前节点是q节点  找得到，说明当前节点就是他们的共同父节点
      if (node.val === q!.val && findNode(node, p!.val)) {
        return q;
      }
      stack.push(node);
      if (node.left) {
        ref.set(node.left, node);
      }
      if (node.right) {
        ref.set(node.right, node);
      }
      node = node.left;
    }
    if (stack.length) {
      const tmpNode = stack.pop()!;
      node = tmpNode.right;
    }
  }
  const nodeTrace: Set<TreeNode> = new Set();
  let leftPNode = ref.get(p!);
  while (leftPNode) {
    nodeTrace.add(leftPNode);
    leftPNode = ref.get(leftPNode);
  }
  let rightPNode = ref.get(q!);
  while (rightPNode) {
    if (nodeTrace.has(rightPNode)) {
      return rightPNode;
    }
    rightPNode = ref.get(rightPNode);
  }
  return null;
}

// function findNode(node: TreeNode | null, num: number): boolean {
//   if (!node) {
//     return false;
//   }
//   let t: TreeNode | null = node;
//   while (t) {
//     if (t.val === num) {
//       return true;
//     } else if (t.val > num) {
//       t = t.left;
//     } else if (t.val < num) {
//       t = t.right;
//     }
//   }
//   return false;
// }

function findNode(node: TreeNode | null, num: number): boolean {
  if (!node) {
    return false;
  }
  if (node.val === num) {
    return true;
  } else {
    return findNode(node.left, num) || findNode(node.right, num);
  }
}
