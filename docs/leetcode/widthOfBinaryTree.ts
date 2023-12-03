export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function widthOfBinaryTree(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  const numMap: Map<TreeNode, number> = new Map();
  const queue: Array<TreeNode[]> = [[root]];
  numMap.set(root, 1);
  let maxWidth = 0;
  while (queue.length) {
    const levelList = queue.shift()!;
    const firstNode = levelList[0];
    const lastNode = levelList[levelList.length - 1];
    const firstNum = numMap.get(firstNode)!;
    const lastNum = numMap.get(lastNode)!;
    const width = lastNum - firstNum + 1;
    if (width > maxWidth) {
      maxWidth = width;
    }
    const nextLevel: TreeNode[] = [];
    levelList.forEach((treeNode) => {
      const num = levelList.length === 1 ? 1 : numMap.get(treeNode)!;
      if (treeNode.left) {
        nextLevel.push(treeNode.left);
        numMap.set(treeNode.left, 2 * num);
      }
      if (treeNode.right) {
        nextLevel.push(treeNode.right);
        numMap.set(treeNode.right, 2 * num + 1);
      }
    });
    if (nextLevel.length) {
      queue.push(nextLevel);
    }
  }
  return maxWidth;
}
