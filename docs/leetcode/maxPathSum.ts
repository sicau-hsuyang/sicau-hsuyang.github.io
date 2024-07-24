interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface Struct {
  /**
   * 包含根+左子树的和
   */
  rootWithLeft: number;
  /**
   * 包含根+右子树的和
   */
  rootWithRight: number;
  /**
   * 仅包含根节点的和
   */
  rootOnly: number;
}

export function maxPathSum(root: TreeNode) {
  let maxSum = -Infinity;
  function _maxPathSum(
    root: TreeNode | null,
    map: Map<TreeNode, Struct>
  ): Struct {
    if (!root) {
      return {
        rootOnly: 0,
        rootWithLeft: 0,
        rootWithRight: 0,
      };
    }
    const cache = map.get(root);
    if (cache) {
      return cache;
    }
    let maxLeftVal = 0;
    let maxRightVal = 0;

    if (root.left) {
      const leftRes = _maxPathSum(root.left, map);
      maxLeftVal = Math.max(
        leftRes.rootOnly,
        leftRes.rootWithLeft,
        leftRes.rootWithRight
      );
    }

    if (root.right) {
      const rightRes = _maxPathSum(root.right, map);
      maxRightVal = Math.max(
        rightRes.rootOnly,
        rightRes.rootWithLeft,
        rightRes.rootWithRight
      );
    }
    // 从当前节点，当前节点加上左子树上的路径，或者当前节点加上右子树的路径，或者当前节点加上左右子树的路径
    let tempSum = Math.max(
      root.val,
      root.val + maxLeftVal + maxRightVal,
      root.val + maxLeftVal,
      root.val + maxRightVal
    );
    if (tempSum > maxSum) {
      maxSum = tempSum;
    }
    const result = {
      rootOnly: root.val,
      rootWithLeft: root.val + maxLeftVal,
      rootWithRight: root.val + maxRightVal,
    };
    map.set(root, result);
    return result;
  }

  _maxPathSum(root, new Map());

  return maxSum;
}
