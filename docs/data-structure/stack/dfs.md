## 栈的应用之 DFS

在 DFS 中，如果我们不用递归，需要自己用一个栈来模拟系统的堆栈。

### 先序遍历二叉树

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

### DFS 遍历 N-叉树

```JavaScript
/**
 * N叉树非递归深度优先遍历
 * @param { NTreeNode<number>[] } treeNodes
 */
function dfsVisit(treeNodes) {
  if (!Array.isArray(treeNodes) || treeNodes.length === 0) {
    console.warn("treeNodes empty");
    return;
  }
  let stack = [];
  // 用来记住每个节点的下一个兄弟节点
  let nextSiblingMap = new Map();
  // 建立下一个兄弟节点的关系
  for (let i = 0; i < treeNodes.length; i++) {
    const curNode = treeNodes[i];
    const nextNode = treeNodes[i + 1] || null;
    nextSiblingMap.set(curNode, nextNode);
  }
  let treeNode = treeNodes[0];
  while (stack.length || treeNode) {
    // 当节点为空时，说明已经迭代到最叶节点了，退出循环
    while (treeNode) {
      console.log(treeNode.data);
      stack.push(treeNode);
      let subNodes = Array.isArray(treeNode.children) ? treeNode.children : [];
      // 每一层都建立下一个兄弟节点的关系
      for (let k = 0; k < subNodes.length; k++) {
        const curNode = subNodes[k];
        const nextNode = subNodes[k + 1] || null;
        nextSiblingMap.set(curNode, nextNode);
      }
      // 下滤节点
      treeNode = subNodes[0] || null;
    }
    if (stack.length) {
      treeNode = stack.pop();
      // 根据当前节点到map里面找当前节点的下一个兄弟节点
      let nextSiblingNode = nextSiblingMap.get(treeNode);
      if (nextSiblingNode) {
        treeNode = nextSiblingNode;
      } else {
        // 如果没有下一个兄弟节点了，说明需要回退到父亲节点，父亲节点处理完成之后，准备处理父亲节点的下一个兄弟节点
        if (stack.length) {
          treeNode = stack.pop();
          // 继续切换到父节点的兄弟节点
          treeNode = nextSiblingMap.get(treeNode);
        } else {
          // 已经将所有的节点处理完成，可以功成身退
          treeNode = null;
        }
      }
    }
  }
}
```
