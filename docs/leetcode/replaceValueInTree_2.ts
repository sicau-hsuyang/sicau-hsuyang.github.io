interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

type TempNode = { node: TreeNode; parent: TreeNode | null };

function traverseTree(
  root: TreeNode | null,
  refMap: Map<TreeNode, TreeNode | null>,
  realValMap: Map<TreeNode, number>,
  nextSiblingMap: Map<TreeNode, TreeNode>,
  prevSiblingMap: Map<TreeNode, TreeNode>
) {
  if (!root) {
    return;
  }
  const queue: Array<Array<TempNode>> = [[{ node: root, parent: null }]];
  while (queue.length) {
    const chunk = queue.shift()!;
    const nextChunk: Array<TempNode> = [];
    chunk.forEach(({ node, parent }) => {
      realValMap.set(node, node.val);
      refMap.set(node, parent);
      if (node.left) {
        nextChunk.push({
          node: node.left,
          parent: node,
        });
      }
      if (node.right) {
        nextChunk.push({
          node: node.right,
          parent: node,
        });
      }
    });
    if (nextChunk.length) {
      for (let i = 0; i < nextChunk.length - 1; i++) {
        const curNode = nextChunk[i];
        const nextNode = nextChunk[i + 1];
        // 建立从左向右的关系
        nextSiblingMap.set(curNode.node, nextNode.node);
        // 建立从右至左的关系
        prevSiblingMap.set(nextNode.node, curNode.node);
      }
      queue.push(nextChunk);
    }
  }
}

function getGrandSonChildSum(
  node: TreeNode,
  realValMap: Map<TreeNode, number>
) {
  if (!node) {
    return 0;
  }
  let sum = 0;
  if (node.left) {
    sum += realValMap.get(node.left.left as TreeNode) || 0;
    sum += realValMap.get(node.left.right as TreeNode) || 0;
  }
  if (node.right) {
    sum += realValMap.get(node.right.left as TreeNode) || 0;
    sum += realValMap.get(node.right.right as TreeNode) || 0;
  }
  return sum;
}

function getSiblingNodesSum(
  node: TreeNode,
  refMap: Map<TreeNode, TreeNode | null>,
  realValMap: Map<TreeNode, number>,
  nextSiblingMap: Map<TreeNode, TreeNode>,
  prevSiblingMap: Map<TreeNode, TreeNode>
) {
  // 节点不存在
  if (!node) {
    return 0;
  }
  // 父节点
  const parentNode = refMap.get(node);
  if (!parentNode) {
    return 0;
  }
  // 祖父节点
  const grandParentNode = refMap.get(parentNode);
  if (!grandParentNode) {
    return 0;
  }
  // 找到自己的叔叔节点
  let uncleNode: TreeNode | null = null;
  if (grandParentNode.left && grandParentNode.left === parentNode) {
    uncleNode = grandParentNode.right;
  } else if (grandParentNode.right && grandParentNode.right === parentNode) {
    uncleNode = grandParentNode.left;
  }
  let otherSum = 0;
  // 祖父节点的兄弟节点求和，从左往右
  let nextGrandParentNode = nextSiblingMap.get(grandParentNode);
  while (nextGrandParentNode) {
    otherSum += getGrandSonChildSum(nextGrandParentNode, realValMap);
    nextGrandParentNode = nextSiblingMap.get(nextGrandParentNode);
  }
  // 祖父节点兄弟节点求和，从右往左
  let prevGrandParentNode = prevSiblingMap.get(grandParentNode);
  while (prevGrandParentNode) {
    otherSum += getGrandSonChildSum(prevGrandParentNode, realValMap);
    prevGrandParentNode = prevSiblingMap.get(prevGrandParentNode);
  }
  // 爸爸没有兄弟，自己就不可能有堂兄弟
  if (!uncleNode) {
    return otherSum;
  }
  // 叔叔没有儿子
  let sum = 0;
  if (uncleNode.left) {
    sum += realValMap.get(uncleNode.left) || 0;
  }
  if (uncleNode.right) {
    sum += realValMap.get(uncleNode.right) || 0;
  }
  return sum + otherSum;
}

function replace(
  root: TreeNode | null,
  refMap: Map<TreeNode, TreeNode | null>,
  realValMap: Map<TreeNode, number>,
  nextSiblingMap: Map<TreeNode, TreeNode>,
  prevSiblingMap: Map<TreeNode, TreeNode>
) {
  if (!root) {
    return;
  }
  getSiblingNodesSum(root, refMap, realValMap, nextSiblingMap, prevSiblingMap);
  // root.val = getSiblingNodesSum(root, refMap, realValMap, siblingMap);
  replace(root.left, refMap, realValMap, nextSiblingMap, prevSiblingMap);
  replace(root.right, refMap, realValMap, nextSiblingMap, prevSiblingMap);
}

export function replaceValueInTree(root: TreeNode | null): TreeNode | null {
  const refMap: Map<TreeNode, TreeNode | null> = new Map();
  const realValMap: Map<TreeNode, number> = new Map();
  const nextSiblingMap: Map<TreeNode, TreeNode> = new Map();
  const prevSiblingMap: Map<TreeNode, TreeNode> = new Map();
  traverseTree(root, refMap, realValMap, nextSiblingMap, prevSiblingMap);
  replace(root, refMap, realValMap, nextSiblingMap, prevSiblingMap);
  return root;
}
