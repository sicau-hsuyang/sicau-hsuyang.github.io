/**
 * 平衡二叉树的实现
 */
class AVLTree {
  /**
   * 根节点
   * @type {AVLTreeNode<number> | null}
   */
  root = null;

  /**
   * 获取以treeNode为根节点的树高
   * @param {AVLTreeNode<number>} treeNode
   */
  getHeight(treeNode) {
    return treeNode ? treeNode.height : 0;
  }

  /**
   * 左单旋
   * @param {AVLTreeNode<number>} A
   * @returns {AVLTreeNode<number>}
   */
  singleLeftRotation(A) {
    /* 注意：A必须有一个左子结点B */
    /* 将A与B做左单旋，更新A与B的高度，返回新的根结点B */
    // 当前树节点的左子树
    let B = A.left;
    // 注意： 一定要先把B的右子树挂在A的左边
    A.left = B.right;
    B.right = A;
    A.height = Math.max(this.getHeight(A.left), this.getHeight(A.right)) + 1;
    B.height = Math.max(this.getHeight(B.left), this.getHeight(A)) + 1;
    return B;
  }

  /**
   * 右单旋
   * @param {AVLTreeNode<number>} A
   */
  singleRightRotation(A) {
    /* 注意：A必须有一个左子结点B */
    /* 将A与B做左单旋，更新A与B的高度，返回新的根结点B */
    let B = A.right;
    // 注意： 一定要先把B的左子树挂在A的右边
    A.right = B.left;
    // A的右子树的左子树
    B.left = A;
    A.height = Math.max(this.getHeight(A.left), this.getHeight(A.right)) + 1;
    B.height = Math.max(this.getHeight(B.right), this.getHeight(A)) + 1;
    return B;
  }

  /**
   * 左右旋转
   * @param {AVLTreeNode<number>} A
   * @returns {AVLTreeNode<number>}
   */
  doubleLeftRightRotation(A) {
    /* 注意：A必须有一个左子结点B，且B必须有一个右子结点C */
    /* 将A、B与C做两次单旋，返回新的根结点C */
    /* 将B与C做右单旋，C被返回 */
    A.left = this.singleRightRotation(A.left);
    /* 将A与C做左单旋，C被返回 */
    return this.singleLeftRotation(A);
  }

  /**
   * 右左旋转
   * @param {AVLTreeNode<number>} A
   * @returns {AVLTreeNode<number>}
   */
  doubleRightLeftRotation(A) {
    /* 注意：A必须有一个右子结点B，且B必须有一个左子结点C */
    /* 将A、B与C做两次单旋，返回新的根结点C */
    /* 将B与C做左单旋，C被返回 */
    A.right = this.singleLeftRotation(A.right);
    /* 将A与C做右单旋，C被返回 */
    return this.singleRightRotation(A);
  }

  /**
   * 在AVL树中查找最小值
   * @param {AVLTreeNode<number>} treeNode
   * @returns
   */
  findMin(treeNode) {
    let minTreeNode = null;
    while (treeNode) {
      minTreeNode = treeNode;
      treeNode = treeNode.left;
    }
    return minTreeNode;
  }

  /**
   * 插入子节点
   * @param {number} val
   */
  insert(val) {
    this.root = this._insert(this.root, val);
  }

  /**
   * 删除子节点
   * @param {number} val
   */
  delete(val) {
    this.root = this._delete(this.root, val);
  }

  /**
   * 辅助函数：删除子节点
   * @param {AVLTreeNode<number>} treeNode
   * @param {*} delVal
   * @returns
   */
  _delete(treeNode, delVal) {
    if (treeNode === null) {
      // 空树，无法删除
      return null;
    } else if (delVal < treeNode.val) {
      // val 位于左子树，其实就是相当于右子树的插入，所以在调整的时候，执行右旋
      treeNode.left = this._delete(treeNode.left, delVal);
      // 更新树高
      treeNode.height =
        Math.max(
          this.getHeight(treeNode.left),
          this.getHeight(treeNode.right)
        ) + 1;
      if (
        Math.abs(
          this.getHeight(treeNode.right) - this.getHeight(treeNode.left)
        ) === 2
      ) {
        if (
          this.getHeight(treeNode.right.right) >=
          this.getHeight(treeNode.right.left)
        ) {
          treeNode = this.singleRightRotation(treeNode);
        } else {
          treeNode = this.doubleLeftRightRotation(treeNode);
        }
      }
    } else if (delVal > treeNode.val) {
      // x 位于右子树删除，其实就是相当于是左子树插入
      treeNode.right = this._delete(treeNode.right, delVal);
      // 更新树高
      treeNode.height =
        Math.max(
          this.getHeight(treeNode.left),
          this.getHeight(treeNode.right)
        ) + 1;
      if (
        Math.abs(
          this.getHeight(treeNode.left) - this.getHeight(treeNode.right)
        ) === 2
      ) {
        if (
          this.getHeight(treeNode.left.left) >=
          this.getHeight(treeNode.left.right)
        ) {
          treeNode = this.singleLeftRotation(treeNode);
        } else {
          treeNode = this.doubleLeftRightRotation(treeNode);
        }
      }
    } else if (treeNode.left && treeNode.right) {
      /* 如果待删除节点同时存在左右儿子节点 */
      // 找到右子树的最小节点
      let rightSubTreeMinNode = this.findMin(treeNode.right);
      // 用右子树上的最小节点替换当前值，然后再从当前右子树触发，递归的删除右子树上的最小值。
      treeNode.val = rightSubTreeMinNode.val;
      treeNode.right = this._delete(treeNode.right, treeNode.val);
    } else {
      /* 如果待删除节点只有左儿子节点，那么把它的左儿子直接赋值给它自己，相当于移除了待删除节点 */
      if (treeNode.right === null) {
        treeNode = treeNode.left;
      } else if (treeNode.left === null) {
        /* 如果待删除节点只有右儿子节点，那么把它的右儿子直接赋值给它自己，相当于移除了待删除节点 */
        treeNode = treeNode.right;
      } else {
        /* 如果待删除节点没有左右儿子节点，直接赋值为空，相当于移除了待删除节点 */
        treeNode = null;
      }
    }
    return treeNode;
  }

  /**
   * 辅助函数：插入子节点
   * @param {AVLTreeNode<number>} treeNode
   * @param {number} val
   * @returns {AVLTreeNode<number>}
   */
  _insert(treeNode, val) {
    /* 将X插入AVL树treeNode中，并且返回调整后的AVL树 */
    if (!treeNode) {
      /* 若插入空树，则新建包含一个结点的树 */
      treeNode = {
        val: val,
        height: 0,
        left: null,
        right: null,
      };
    } else if (val < treeNode.val) {
      /* 插入treeNode的左子树 */
      treeNode.left = this._insert(treeNode.left, val);
      /* 如果需要左旋 */
      if (
        Math.abs(
          this.getHeight(treeNode.left) - this.getHeight(treeNode.right)
        ) === 2
      ) {
        if (val < treeNode.left.val) {
          /* 左单旋 */
          treeNode = this.singleLeftRotation(treeNode);
        } else {
          /* 左-右双旋 */
          treeNode = this.doubleLeftRightRotation(treeNode);
        }
      }
    } else if (val > treeNode.val) {
      /* 插入treeNode的右子树 */
      treeNode.right = this._insert(treeNode.right, val);
      /* 如果需要右旋 */
      if (
        Math.abs(
          this.getHeight(treeNode.left) - this.getHeight(treeNode.right)
        ) === 2
      ) {
        if (val > treeNode.right.val) {
          /* 右单旋 */
          treeNode = this.singleRightRotation(treeNode);
        } else {
          /* 右-左双旋 */
          treeNode = this.doubleRightLeftRotation(treeNode);
        }
      }
    }
    /* 更新树高 */
    treeNode.height =
      Math.max(this.getHeight(treeNode.left), this.getHeight(treeNode.right)) +
      1;
    return treeNode;
  }
}

let avlTree = new AVLTree();

avlTree.insert(1);
avlTree.insert(2);
avlTree.insert(3);
avlTree.insert(4);
avlTree.insert(5);
avlTree.insert(6);

console.log(avlTree);

avlTree.delete(4);
console.log(avlTree);
avlTree.delete(2);
console.log(avlTree);
avlTree.delete(1);
console.log(avlTree);
avlTree.delete(3);
console.log(avlTree);
avlTree.delete(5);
console.log(avlTree);
avlTree.delete(6);
console.log(avlTree);