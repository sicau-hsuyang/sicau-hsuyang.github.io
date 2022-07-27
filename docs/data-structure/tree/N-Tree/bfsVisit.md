## 描述

假设我们的树节点的定义如下：

```ts
interface NTreeNode<T> {
  left: TreeNode | null;
  right: TreeNode | null;
  children: T[] | undefined;
  data: T;
}
```

在二叉树的层序遍历时，我们即已掌握广度优先遍历，但是只是没有这样提而已。对于`图`这类复杂的数据结构，我们总是从当前节点出发，每次遍历当前节点的所有邻接节点（遍历一层），直至遍历完整个结构的遍历方法(即`广度优先遍历（BFS: breadth-first-search）`)

## N-叉树的 BFS

```javascript
/**
 * N叉树广度优先遍历
 * @param {NTreeNode<number>[]} treeNodes
 */
function bfs(treeNodes) {
  if (!Array.isArray(treeNodes) || treeNodes.length === 0) {
    console.log("treeNodes empty");
    return;
  }
  const queue = [];
  treeNodes.forEach((treeNode) => {
    queue.push(treeNode);
  });
  while (queue.length) {
    const treeNode = queue.shift();
    console.log(treeNode.data);
    if (Array.isArray(treeNode.children)) {
      queue.push(...treeNode.children);
    }
  }
}
```

## 复杂度分析

时间复杂度`O(n)`；平均空间复杂度`O(m*w)`，为 `N-叉树`的最大宽度,`m`为`N-叉树`的子节点个数;

## 应用场景

电脑中的文件目录；

权限管理中的权限列表；

设备管理中的设备树；

前端的路由表等；
