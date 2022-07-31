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
   * 获取树节点的树高
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
   * 插入子节点
   * @param {number} val
   */
  insert(val) {
    this.root = this._insert(this.root, val);
  }

  /**
   * 删除子节点
   */
  delete(val) {
    this.root = this._delete(this.root, val);
  }

  /**
   * 删除子节点辅助函数
   * @param {AVLTreeNode<number>} treeNode
   * @param {number} val
   * @returns {AVLTreeNode<number>}
   */
  _delete(treeNode, val) {
    if (treeNode.val === val) {
      return null;
    }
  }

  /**
   * 插入子节点
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
        this.getHeight(treeNode.left) - this.getHeight(treeNode.right) ===
        2
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
        this.getHeight(treeNode.left) - this.getHeight(treeNode.right) ===
        -2
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
