## 中序遍历

假设我们的树节点的定义如下：

```ts
interface TreeNode<T> {
  left: TreeNode | null;
  right: TreeNode | null;
  data: T;
}
```

:::tip
总是以`左`->`根`->`右`的顺序输出二叉树中的节点
:::

## 递归遍历

```js
/**
 * 中序递归遍历二叉树
 * @param {TreeNode<number>} tree 树的根节点
 */
function treeInOrderTraverseRecursion(tree) {
  if (!tree) {
    console.log("empty tree");
    return;
  }
  // 和先序递归遍历区别仅体现在输出的时机不同，因为代码的顺序会导致调用堆栈的循序的改变，因此可以完成中序遍历
  tree.left && treeInOrderTraverseRecursion(tree.left);
  console.log(tree.data);
  tree.right && treeInOrderTraverseRecursion(tree.right);
}
```

## 非递归遍历

```js
/**
 * 二叉树非递归中序遍历
 * @param {TreeNode<number>} tree 树的根节点
 */
function treeInOrderTraverse(tree) {
  if (!tree) {
    console.log("empty tree");
    return;
  }
  let stack = [];
  let node = tree;
  while (stack.length > 0 || node) {
    // 压栈的时候不能立即输出节点
    while (node) {
      stack.push(node);
      node = node.left;
    }
    if (stack.length > 0) {
      // 当从栈中取出节点时，方可以输出节点，接着再从当前节点的右子树进行遍历
      node = stack.pop();
      console.log(node.data);
      node = node.right;
    }
  }
}
```

## 复杂度分析

时间复杂度`O(n)`；空间复杂度`O(h)`;
