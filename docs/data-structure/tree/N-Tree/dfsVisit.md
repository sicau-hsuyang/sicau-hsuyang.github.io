## 描述

假设我们的树节点的定义如下：

```ts
interface NTreeNode<T> {
  left: TreeNode | null;
  right: TreeNode | null;
  children: T[];
}
```

对于 `N-叉树`则不存在`先序`、`中序`、`后序`的提法，但是我们可以在每次遍历的时候，总是先遍历当前节点的最左边的至树的叶节点，然后再向上回溯，再遍历后续的节点，直到完成所有节点的遍历(即`深度优先遍历（DFS: deep-first-search）`)

## N-叉树的 DFS 递归实现

```JavaScript
/**
 * N叉树深度优先递归遍历
 * @param {NTreeNode<number>[]} treeNodes
 */
function dfsVisitRecursion(treeNodes) {
  if (!Array.isArray(treeNodes) || treeNodes.length === 0) {
    console.log("treeNodes empty");
    return;
  }

  treeNodes.forEach((treeNode) => {
    if (Array.isArray(treeNode.children)) {
      dfsVisitRecursion(treeNode.children);
    }
    console.log(treeNode.data);
  });
}
```

## N-叉树的 DFS 非递归实现

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

## 复杂度分析

时间复杂度`O(n)`；平均空间复杂度`O(m*h)`，为 `N-叉树`的最大高度,`m`为`N-叉树`的子节点个数;
