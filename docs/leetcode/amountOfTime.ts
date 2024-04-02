interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function findStartNode(
  root: TreeNode | null,
  val: number,
  map: Map<TreeNode, TreeNode>
): TreeNode | null {
  if (!root) {
    return null;
  }
  // 找到了
  if (root.val === val) {
    return root;
  }
  if (!root.left && !root.right) {
    return null;
  } else if (root.left && !root.right) {
    map.set(root.left, root);
    return findStartNode(root.left, val, map);
  } else if (root.right && !root.left) {
    map.set(root.right, root);
    return findStartNode(root.right, val, map);
  } else {
    map.set(root.left!, root);
    const targetNode = findStartNode(root.left, val, map);
    if (targetNode) {
      return targetNode;
    }
    map.set(root.right!, root);
    return findStartNode(root.right, val, map);
  }
}

export function amountOfTime(root: TreeNode | null, start: number): number {
  const map: Map<TreeNode, TreeNode> = new Map();
  const startTreeNode = findStartNode(root, start, map);
  if (!startTreeNode) {
    return 0;
  }
  let spent: number = 0;
  const queue: Array<TreeNode[]> = [[startTreeNode]];
  const directionMap: Map<TreeNode, string> = new Map();
  const childSet: Set<TreeNode> = new Set();
  while (queue.length) {
    const chunk = queue.pop()!;
    const nextChunk: TreeNode[] = [];
    chunk.forEach((node) => {
      const parentNode = map.get(node);
      // 从父级节点蔓延，不能是儿子节点来源
      if (parentNode && !childSet.has(node)) {
        if (parentNode.left === node) {
          // 设置蔓延的方向，一会儿不能重复计算
          directionMap.set(parentNode, "left");
        } else {
          directionMap.set(parentNode, "right");
        }
        nextChunk.push(parentNode);
      }
      // 从左右儿子蔓延，并且不能是走过回头路的case
      if (
        node.left &&
        (!directionMap.has(node) || directionMap.get(node) === "right")
      ) {
        childSet.add(node.left);
        nextChunk.push(node.left);
      }
      if (
        node.right &&
        (!directionMap.has(node) || directionMap.get(node) === "left")
      ) {
        childSet.add(node.right);
        nextChunk.push(node.right);
      }
    });
    if (nextChunk.length > 0) {
      console.log(nextChunk.map((v) => v.val));
      spent++;
      queue.push(nextChunk);
    }
  }
  return spent;
}
