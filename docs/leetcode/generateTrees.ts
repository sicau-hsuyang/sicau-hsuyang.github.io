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

export function generateTrees(n: number): Array<TreeNode | null> {
  let results: TreeNode[] = [];
  for (let i = 1; i <= n; i++) {
    // 已i为根节点，节点范围开始是1，结束是n
    results = results.concat(buildTree(i, 1, n));
  }
  return results;
}

/**
 * 构建以root数字为根节点，下限为low数字，上限为high的所有二叉搜索树
 * @param root 根节点的数字
 * @param low 下限数字
 * @param high 上限数字
 * @returns
 */
function buildTree(root: number, low: number, high: number): Array<TreeNode> {
  // 只有一个节点
  if (root === low && root === high) {
    return [
      {
        val: root,
        left: null,
        right: null,
      },
    ];
  }
  // 没有右子树
  else if (root === high) {
    const results: TreeNode[] = [];
    for (let i = low; i < root; i++) {
      const nextRootNum = i;
      const subTrees = buildTree(nextRootNum, low, root - 1);
      for (let k = 0; k < subTrees.length; k++) {
        const leftTree = subTrees[k];
        const rootNode = {
          val: root,
          left: leftTree,
          right: null,
        };
        results.push(rootNode);
      }
    }
    return results;
  }
  // 没有左子树
  else if (root === low) {
    const results: TreeNode[] = [];
    for (let i = root + 1; i <= high; i++) {
      const nextRootNum = i;
      const subTrees = buildTree(nextRootNum, root + 1, high);
      for (let k = 0; k < subTrees.length; k++) {
        const rightNode = subTrees[k];
        const rootNode = {
          val: root,
          left: null,
          right: rightNode,
        };
        results.push(rootNode);
      }
    }
    return results;
  }
  // 有左右子树
  else {
    const results: TreeNode[] = [];
    let subLeftTrees: TreeNode[] = [];
    for (let i = low; i < root; i++) {
      const nextRootNum = i;
      subLeftTrees = subLeftTrees.concat(buildTree(nextRootNum, low, root - 1));
    }
    let subRightTrees: TreeNode[] = [];
    for (let i = root + 1; i <= high; i++) {
      const nextRootNum = i;
      subRightTrees = subRightTrees.concat(
        buildTree(nextRootNum, root + 1, high)
      );
    }
    subLeftTrees.forEach((leftNode) => {
      subRightTrees.forEach((rightNode) => {
        results.push({
          left: leftNode,
          val: root,
          right: rightNode,
        });
      });
    });
    return results;
  }
}
