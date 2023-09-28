interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export function minimumOperations(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }
  const queue: TreeNode[][] = [[root]];
  let count = 0;
  while (queue.length) {
    const chunk = queue.shift()!;
    const nextChunk: TreeNode[] = [];
    chunk.forEach((node) => {
      if (node.left) {
        nextChunk.push(node.left);
      }
      if (node.right) {
        nextChunk.push(node.right);
      }
    });
    let levelCount = insertionSort(chunk);
    count += levelCount;
    if (nextChunk.length) {
      queue.push(nextChunk);
    }
  }
  return count;
}

function insertionSort(nodeList: TreeNode[]): number {
  let count = 0;
  for (let i = 1; i < nodeList.length; i++) {
    let idx = i;
    let node = nodeList[idx];
    while (idx > 0 && node.val < nodeList[idx - 1].val) {
      nodeList[idx] = nodeList[idx - 1];
      idx--;
    }
    nodeList[idx] = node;
    // 必须要动过，才算一次次数
    if (idx < i) {
      count++;
    }
  }
  return count;
}
