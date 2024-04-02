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

function findStartNode(
  node: TreeNode | null,
  value: number,
  map: Map<TreeNode, TreeNode>
) {
  if (!node) {
    return;
  }
  if (node.val === value) {
    return node;
  }
  let result: TreeNode | null = null;
  // 从左子树中找
  if (node.left) {
    map.set(node.left, node);
    result = findStartNode(node.left, value, map);
  }
  // 如果找到了的话
  if (result) {
    return result;
  }
  // 找不到就从右子树上找
  if (node.right) {
    map.set(node.right, node);
    result = findStartNode(node.right, value, map);
  }
  return result;
}

function findSubtree(
  result: { stepPath: string; isFound: boolean },
  root: TreeNode | null,
  targetValue: number,
  path: string
) {
  if (!root || result.isFound) {
    return;
  }
  if (root.val === targetValue) {
    result.stepPath = path;
    result.isFound = true;
    return;
  }
  if (root.left) {
    findSubtree(result, root.left, targetValue, path + "L");
  }
  if (root.right) {
    findSubtree(result, root.right, targetValue, path + "R");
  }
}

function findFromParentNode(
  result: { stepPath: string; isFound: boolean },
  childNode: TreeNode,
  node: TreeNode | null,
  targetVal: number,
  path: string,
  map: Map<TreeNode, TreeNode>
) {
  if (!node || result.isFound) {
    return;
  }

  if (node.val === targetVal) {
    result.isFound = true;
    result.stepPath = path;
  }
  const parentNode = map.get(node) || null;
  findFromParentNode(result, node, parentNode, targetVal, path + "U", map);
  // 如果来源是左子节点 并且右子节点存在 从右子树继续找
  if (node.right && node.left === childNode) {
    findSubtree(result, node.right, targetVal, path + "R");
  }
  // 反之
  else if (node.left && node.right === childNode) {
    findSubtree(result, node.left, targetVal, path + "L");
  }
}

export function getDirections(
  root: TreeNode | null,
  startValue: number,
  destValue: number
): string {
  const map: Map<TreeNode, TreeNode> = new Map();
  const startNode = findStartNode(root, startValue, map);
  let foundSignal = {
    stepPath: "",
    isFound: false,
  };
  // 左子树上找
  findSubtree(foundSignal, startNode!.left, destValue, "L");
  if (foundSignal.isFound) {
    return foundSignal.stepPath;
  }
  foundSignal = {
    stepPath: "",
    isFound: false,
  };
  // 右子树上找
  findSubtree(foundSignal, startNode!.right, destValue, "R");
  if (foundSignal.isFound) {
    return foundSignal.stepPath;
  }
  foundSignal = {
    stepPath: "",
    isFound: false,
  };
  const parentNode = map.get(startNode!);
  // 向上找
  findFromParentNode(foundSignal, startNode!, parentNode!, destValue, "U", map);
  return foundSignal.stepPath;
}
