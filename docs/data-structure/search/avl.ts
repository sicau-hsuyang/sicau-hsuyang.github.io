interface AVLTreeNode<T> {
  /**
   * 节点数据
   */
  data: T;
  /**
   * 左子树节点
   */
  left: AVLTreeNode<T> | null;
  /**
   * 右子树节点
   */
  right: AVLTreeNode<T> | null;
  /**
   * 树高
   */
  height: number;
}
