// typedef struct AVLNode *Position;
// typedef Position AVLTree; /* AVL树类型 */
// struct AVLNode{
//     ElementType Data; /* 结点数据 */
//     AVLTree Left;     /* 指向左子树 */
//     AVLTree Right;    /* 指向右子树 */
//     int Height;       /* 树高 */
// };

// int Max ( int a, int b )
// {
//     return a > b ? a : b;
// }

// AVLTree SingleLeftRotation ( AVLTree A )
// { /* 注意：A必须有一个左子结点B */
//   /* 将A与B做左单旋，更新A与B的高度，返回新的根结点B */

//     AVLTree B = A->Left;
//     A->Left = B->Right;
//     B->Right = A;
//     A->Height = Max( GetHeight(A->Left), GetHeight(A->Right) ) + 1;
//     B->Height = Max( GetHeight(B->Left), A->Height ) + 1;

//     return B;
// }

// AVLTree DoubleLeftRightRotation ( AVLTree A )
// { /* 注意：A必须有一个左子结点B，且B必须有一个右子结点C */
//   /* 将A、B与C做两次单旋，返回新的根结点C */

//     /* 将B与C做右单旋，C被返回 */
//     A->Left = SingleRightRotation(A->Left);
//     /* 将A与C做左单旋，C被返回 */
//     return SingleLeftRotation(A);
// }

// /*************************************/
// /* 对称的右单旋与右-左双旋请自己实现 */
// /*************************************/

// AVLTree Insert( AVLTree T, ElementType X )
// { /* 将X插入AVL树T中，并且返回调整后的AVL树 */
//     if ( !T ) { /* 若插入空树，则新建包含一个结点的树 */
//         T = (AVLTree)malloc(sizeof(struct AVLNode));
//         T->Data = X;
//         T->Height = 0;
//         T->Left = T->Right = NULL;
//     } /* if (插入空树) 结束 */

//     else if ( X < T->Data ) {
//         /* 插入T的左子树 */
//         T->Left = Insert( T->Left, X);
//         /* 如果需要左旋 */
//         if ( GetHeight(T->Left)-GetHeight(T->Right) == 2 )
//             if ( X < T->Left->Data )
//                T = SingleLeftRotation(T);      /* 左单旋 */
//             else
//                T = DoubleLeftRightRotation(T); /* 左-右双旋 */
//     } /* else if (插入左子树) 结束 */

//     else if ( X > T->Data ) {
//         /* 插入T的右子树 */
//         T->Right = Insert( T->Right, X );
//         /* 如果需要右旋 */
//         if ( GetHeight(T->Left)-GetHeight(T->Right) == -2 )
//             if ( X > T->Right->Data )
//                T = SingleRightRotation(T);     /* 右单旋 */
//             else
//                T = DoubleRightLeftRotation(T); /* 右-左双旋 */
//     } /* else if (插入右子树) 结束 */

//     /* else X == T->Data，无须插入 */

//     /* 别忘了更新树高 */
//     T->Height = Max( GetHeight(T->Left), GetHeight(T->Right) ) + 1;

//     return T;
// }

class AVLTree {
  /**
   * 跟节点
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
    // A的右子树，即
    let B = A.right;
    // A的右子树的左子树
    B.left = A;
    A.right = B.left;
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
    A.right = this.singleLeftRotation(A.right);
    return this.singleRightRotation(A);
  }

  /**
   * 插入子节点
   * @param {AVLTreeNode<number>} treeNode
   * @param {number} val
   * @returns {AVLTreeNode<number>}
   */
  insert(val) {
    this.root = this._insert(this.root, val);
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
        data: val,
        height: 0,
        left: null,
        right: null,
      };
    } else if (val < treeNode.data) {
      /* 插入treeNode的左子树 */
      treeNode.left = this._insert(treeNode.left, val);
      /* 如果需要左旋 */
      if (this.getHeight(treeNode.left) - this.getHeight(treeNode.right) == 2) {
        if (val < treeNode.left.data) {
          /* 左单旋 */
          treeNode = this.singleLeftRotation(treeNode);
        } else {
          /* 左-右双旋 */
          treeNode = this.doubleLeftRightRotation(treeNode);
        }
      }
    } else if (val > treeNode.data) {
      /* 插入treeNode的右子树 */
      treeNode.right = this._insert(treeNode.right, val);
      /* 如果需要右旋 */
      if (
        this.getHeight(treeNode.left) - this.getHeight(treeNode.right) ==
        -2
      ) {
        if (val > treeNode.right.data) {
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
