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

function getDistanceFromNodePair(
  node1: TreeNode,
  node2: TreeNode,
  map: Map<TreeNode, TreeNode>,
  distanceMap: Map<TreeNode, Map<TreeNode, number>>
): number {
  let distance = 0;
  let parent1 = map.get(node1);
  while (parent1) {
    let leftD: number;
    const targetMap = distanceMap.get(parent1);
    if (targetMap && targetMap.has(node1)) {
      leftD = targetMap.get(node1)!;
    } else {
      leftD = findNode(parent1, node1, 0);
      if (!distanceMap.has(parent1)) {
        const tmpMap: Map<TreeNode, number> = new Map();
        distanceMap.set(parent1, tmpMap);
        tmpMap.set(node1, leftD);
      } else {
        distanceMap.get(parent1)!.set(node1, leftD);
      }
    }
    let rightD: number;
    if (targetMap && targetMap.has(node2)) {
      rightD = targetMap.get(node2)!;
    } else {
      rightD = findNode(parent1, node2, 0);
      // const tmpMap: Map<TreeNode, number> = new Map();
      // distanceMap.set(parent1, tmpMap);
      // tmpMap.set(node2, rightD);
      if (!distanceMap.has(parent1)) {
        const tmpMap: Map<TreeNode, number> = new Map();
        distanceMap.set(parent1, tmpMap);
        tmpMap.set(node2, rightD);
      } else {
        distanceMap.get(parent1)!.set(node2, rightD);
      }
    }
    if (leftD != -1 && rightD != -1) {
      distance = leftD + rightD;
      break;
    } else {
      parent1 = map.get(parent1);
    }
  }
  return distance;
}

function findNode(root: TreeNode, node: TreeNode, step: number): number {
  if (!root) {
    return -1;
  }
  if (root.left && root.right) {
    const leftStep = findNode(root.left, node, step + 1);
    if (leftStep != -1) {
      return leftStep;
    }
    const rightStep = findNode(root.right, node, step + 1);
    return rightStep;
  } else if (root.left) {
    return findNode(root.left, node, step + 1);
  } else if (root.right) {
    return findNode(root.right, node, step + 1);
  } else {
    return root === node ? step : -1;
  }
}

export function countPairs(root: TreeNode | null, distance: number): number {
  if (!root) {
    return 0;
  }
  const leafNodes: TreeNode[] = [];
  const queue: TreeNode[] = [root];
  const map: Map<TreeNode, TreeNode> = new Map();
  const distanceMap: Map<TreeNode, Map<TreeNode, number>> = new Map();
  while (queue.length) {
    const node = queue.shift()!;
    if (node.left) {
      map.set(node.left, node);
      queue.push(node.left);
    }
    if (node.right) {
      map.set(node.right, node);
      queue.push(node.right);
    }
    if (!node.left && !node.right) {
      leafNodes.push(node);
    }
  }
  let counter = 0;
  for (let i = 0; i < leafNodes.length; i++) {
    for (let j = i + 1; j < leafNodes.length; j++) {
      const tempD = getDistanceFromNodePair(
        leafNodes[i],
        leafNodes[j],
        map,
        distanceMap
      );
      if (tempD <= distance) {
        counter++;
      }
    }
  }
  return counter;
}
