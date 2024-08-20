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

interface Struct {
  /**
   * 包含根节点的值
   */
  withRoot: number;
  /**
   * 不包含根节点的值
   */
  withoutRoot: number;
}

function tryNode(root: TreeNode | null, map: Map<TreeNode, Struct>): Struct {
  if (root && map.get(root)) {
    return map.get(root);
  }
  let res: Struct;
  if (!root) {
    return {
      withRoot: 0,
      withoutRoot: 0,
    };
  } else if (root.left && root.right) {
    const leftRes = tryNode(root.left, map);
    const rightRes = tryNode(root.right, map);
    res = {
      withRoot: root.val + leftRes.withoutRoot + rightRes.withoutRoot,
      withoutRoot: Math.max(
        leftRes.withRoot + rightRes.withRoot,
        leftRes.withRoot + rightRes.withoutRoot,
        leftRes.withoutRoot + rightRes.withRoot,
        leftRes.withoutRoot + rightRes.withoutRoot
      ),
    };
  } else if (root.left) {
    const leftRes = tryNode(root.left, map);
    res = {
      withRoot: root.val + leftRes.withoutRoot,
      withoutRoot: Math.max(leftRes.withRoot, leftRes.withoutRoot),
    };
  } else if (root.right) {
    const rightRes = tryNode(root.right, map);
    res = {
      withRoot: root.val + rightRes.withoutRoot,
      withoutRoot: Math.max(rightRes.withRoot, rightRes.withoutRoot),
    };
  } else {
    res = {
      withRoot: root.val,
      withoutRoot: 0,
    };
  }
  map.set(root, res);
  return res;
}

export function rob(root: TreeNode | null): number {
  const map: Map<TreeNode, Struct> = new Map();
  const res = tryNode(root, map);
  return Math.max(res.withRoot, res.withoutRoot);
}
