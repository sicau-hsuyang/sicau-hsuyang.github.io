export interface TreeNode<T> {
  left?: TreeNode<T>;
  right?: TreeNode<T>;
  data: T;
}

/**
 * 先序递归遍历二叉树
 * @param tree
 */
export function treePreOrderRecursion(tree?: TreeNode<number>): number[] {
  // 如果树空，则完成遍历
  if (!tree) {
    console.log("tree empty!");
    return [];
  }
  const results: number[] = [];
  // 如果左子树存在，递归遍历左子树
  const leftSubTree = tree.left ? treePreOrderRecursion(tree.left) : [];
  // 如果右子树存在，递归遍历右子树
  const rightSubTree = tree.right ? treePreOrderRecursion(tree.right) : [];
  return results.concat([tree.data, ...leftSubTree, ...rightSubTree]);
}

/**
 * 先序非递归遍历二叉树
 * @param tree
 */
export function treePreOrder(tree?: TreeNode<number>): number[] {
  if (!tree) {
    console.log("empty tree!");
    return [];
  }
  const results: number[] = [];
  // 定义一个栈用于模拟系统提供的堆栈
  let stack: TreeNode<number>[] = [];
  // 让node指向树的跟节点，准备开始遍历
  let node = tree;
  // 如果树不空，或者栈中还有内容，则应该继续进行遍历
  while (stack.length > 0 || node) {
    // 如果node节点不为空的话，不断的向左压栈，直到为空
    while (node) {
      stack.push(node);
      results.push(node.data);
      node = node.left as TreeNode<number>;
    }
    // 向左走到头了，若当前栈中还有内容，则从栈中取出一个内容，从当前内容的右子树继续遍历
    if (stack.length > 0) {
      node = stack.pop() as TreeNode<number>;
      node = node.right as TreeNode<number>;
    }
  }
  return results;
}
