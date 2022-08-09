## 层序遍历

假设我们的树节点的定义如下：

```ts
interface TreeNode<T> {
  left: TreeNode | null;
  right: TreeNode | null;
  data: T;
}
```

:::tip
总是按每层从左到右的顺序输出二叉树中的节点
:::

算法实现：

```js
/**
 * 二叉树的层序遍历
 * @param {TreeNode} tree 树的根节点
 */
function treeLevelTraverse(tree) {
  if (!tree) {
    console.log("empty tree");
    return;
  }
  let node = tree;
  let list = [];
  // 将跟节点入队
  list.push(node);
  // 如果队列不为空，则进行遍历
  while (list.length > 0) {
    // 从队首取出一个元素用以处理
    const curNode = list.shift();
    console.log(curNode.data);
    // 如果存在左子树，将左子树入队
    if (curNode.left) {
      list.push(curNode.left);
    }
    // 如果存在右子树，将右子树入队
    if (curNode.right) {
      list.push(curNode.right);
    }
  }
  /**
   * 因为队列先入先出的特性，所以最后的打印顺序总是按层从上至下，每层从左到右的顺序输出
   */
}
```

## 复杂度分析

时间复杂度`O(n)`；空间复杂度`O(w)`，为二叉树的最大宽度;
