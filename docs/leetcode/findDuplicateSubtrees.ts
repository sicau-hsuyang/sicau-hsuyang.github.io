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

export function findDuplicateSubtrees(
  root: TreeNode | null
): Array<TreeNode | null> {
  const seqToNodeMap: Map<string, TreeNode> = new Map();
  const resultMap: Map<string, TreeNode> = new Map();
  preTravelTree(root, seqToNodeMap, resultMap);
  return [...resultMap.values()];
}

function preTravelTree(
  root: TreeNode | null,
  seqToNodeMap: Map<string, TreeNode>,
  resultMap: Map<string, TreeNode>
): string {
  if (!root) {
    return "_";
  }
  let leftStr = preTravelTree(root.left, seqToNodeMap, resultMap),
    rightStr = preTravelTree(root.right, seqToNodeMap, resultMap);
  const str = root.val + "|" + rightStr + "|" + leftStr;
  const targetNode = seqToNodeMap.get(str);
  // 如果目标节点存在，说明有一个跟它完全一样的子树
  if (targetNode) {
    if (!resultMap.has(str)) {
      resultMap.set(str, targetNode!);
    }
  } else {
    seqToNodeMap.set(str, root);
  }
  return str;
}
