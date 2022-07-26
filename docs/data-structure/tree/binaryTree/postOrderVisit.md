## 描述
假设我们的树节点的定义如下：

```ts
interface TreeNode<T> {
  left: TreeNode | null;
  right: TreeNode | null;
  data: T;
}
```
总是以`左`->`右`->`根`的顺序输出二叉树中的节点

## 二叉树的后序递归遍历

```js
/**
 * 后序递归遍历二叉树
 * @param {TreeNode} tree 树的根节点
 */
function treePostTraverseRecursion(tree) {
  if (!tree) {
    console.log("empty tree");
    return;
  }
  // 和先序递归遍历区别仅体现在输出的时机不同，因为代码的顺序会导致调用堆栈的循序的改变，因此可以完成后序遍历
  tree.left && treePostTraverseRecursion(tree.left);
  tree.right && treePostTraverseRecursion(tree.right);
  console.log(tree.data);
}
```

## 二叉树的后序非递归遍历

```js
/**
 * 二叉树非递归后序遍历
 * @param {TreeNode} tree 树的根节点
 */
function treePostTraverse(tree) {
  if (!tree) {
    console.log("empty tree");
    return;
  }
  // 栈1用于遍历
  let stack1 = [];
  // 栈2用于保持输出顺序
  let stack2 = [];
  let node = tree;
  stack1.push(node);
  while (stack1.length > 0) {
    node = stack1.pop();
    // 将根节点加入栈2，先加入的后输出
    stack2.push(node);
    // 如果左子树存在，将左子树节点加入到栈1中
    if (node.left != null) {
      stack1.push(node.left);
    }
    // 如果右子树存在，将右子树节点加入到栈1中
    if (node.right != null) {
      stack1.push(node.right);
    }
    /**
     * 因为先加入栈1的节点，会后输出，但是再加入栈2，又会先输出，所以这儿要先处理左子树，才能处理右子树
     */
  }
  while (stack2.length > 0) {
    let tempNode = stack2.pop();
    console.log(tempNode.data);
  }
}
```

## 复杂度分析

时间复杂度`O(n)`；空间复杂度`O(h)`;
