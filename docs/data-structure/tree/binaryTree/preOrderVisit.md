## 描述

假设我们的树节点的定义如下：

```ts
interface TreeNode<T> {
  left: TreeNode | null;
  right: TreeNode | null;
  data: T;
}
```

总是以`根`->`左`->`右`的顺序输出二叉树中的节点

## 二叉树的先序递归遍历

```js
/**
 * 先序递归遍历二叉树
 * @param {TreeNode<number>} tree
 */
function treePreOrderRecursion(tree) {
  // 如果树空，则完成遍历
  if (!tree) {
    console.log("tree empty!");
    return;
  }
  // 打印当前节点的值
  console.log(tree.data);
  // 如果左子树存在，递归遍历左子树
  tree.left && treePreOrderRecursion(tree.left);
  // 如果右子树存在，递归遍历右子树
  tree.right && treePreOrderRecursion(tree.right);
}
```

## 二叉树的非递归先序遍历

```js
/**
 * 先序非递归遍历二叉树
 * @param {TreeNode<number>} tree
 */
function treePreOrder(tree) {
  if (!tree) {
    console.log("empty tree!");
    return;
  }
  // 定义一个栈用于模拟系统提供的堆栈
  let stack = [];
  // 让node指向树的跟节点，准备开始遍历
  let node = tree;
  // 如果树不空，或者栈中还有内容，则应该继续进行遍历
  while (stack.length > 0 || node) {
    // 如果node节点不为空的话，不断的向左压栈，直到为空
    while (node) {
      stack.push(node);
      console.log(node.data);
      node = node.left;
    }
    // 向左走到头了，若当前栈中还有内容，则从栈中取出一个内容，从当前内容的右子树继续遍历
    if (stack.length > 0) {
      node = stack.pop();
      node = node.right;
    }
  }
}
```

## 复杂度分析

不管是非递归遍历还是递归遍历，二叉树遍历的时间复杂度是`O(n)`(不管怎么样，你总得把所有的树节点都看一遍),空间复杂度为`O(h)`，h 为`树的高度`，使用递归遍历是用的系统的堆栈，而非递归遍历需要我们自己用一个栈去模拟系统堆栈的行为。
