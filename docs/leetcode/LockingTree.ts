interface TreeNode {
  /**
   * 值域
   */
  val: number;
  children: TreeNode[];
}

export class LockingTree {
  private lockedMap: Map<number, number> = new Map();

  private refMap: Map<TreeNode, TreeNode> = new Map();

  private tree: TreeNode;

  private arr: TreeNode[] = [];

  constructor(parent: number[]) {
    this.arr = Array.from({
      length: parent.length,
    }).map((_, idx) => {
      return {
        val: idx,
        children: [],
      };
    });
    parent.forEach((num, idx) => {
      // 当前节点
      const node: TreeNode = this.arr[idx];
      // 根节点
      if (num === -1 && idx === 0) {
        this.tree = node;
      } else {
        // 建立子到父的引用
        const parentNode = this.arr[num]!;
        this.refMap.set(node, parentNode);
        // 建立父到子的引用
        parentNode.children.push(node);
      }
    });
  }

  lock(num: number, user: number): boolean {
    const preLockedUser = this.lockedMap.get(num);
    // 别人已经上锁
    if (typeof preLockedUser === "number") {
      return false;
    }
    this.lockedMap.set(num, user);
    return true;
  }

  unlock(num: number, user: number, force?: boolean): boolean {
    const preLockedUser = this.lockedMap.get(num);
    if (!force && user !== preLockedUser) {
      return false;
    }
    this.lockedMap.delete(num);
    return true;
  }

  upgrade(num: number, user: number): boolean {
    const status = this.lockedMap.get(num);
    if (typeof status != "undefined") {
      return false;
    }
    const node = this.arr[num]!;
    const flag = this.checkAncestorHasLockedNode(node);
    // 如果祖先节点有被锁定了的
    if (flag) {
      return false;
    }
    const lockedChildNodes = this.getHasLockedChildrenNode(node.children);
    // 左子树或者右子树没有一个节点被锁定
    if (lockedChildNodes.length === 0) {
      return false;
    }
    // 能升级的话，把子节点解锁
    lockedChildNodes.forEach((num) => {
      // 暴力解锁
      this.unlock(num, user, true);
    });
    // 将当前节点锁定
    this.lock(num, user);
    return true;
  }

  /**
   * 查找祖先节点是否已经有锁定的节点
   */
  private checkAncestorHasLockedNode(node: TreeNode) {
    let parentNode = this.refMap.get(node);
    while (parentNode) {
      const num = parentNode.val;
      const user = this.lockedMap.get(num);
      if (typeof user !== "undefined") {
        return true;
      }
      parentNode = this.refMap.get(parentNode);
    }
    return false;
  }

  /**
   * 查找子节点是否已经存在上锁的节点
   */
  private getHasLockedChildrenNode(nodes: TreeNode[]): number[] {
    if (nodes.length === 0) {
      return [];
    }
    const queue = [...nodes];
    const results: number[] = [];
    while (queue.length) {
      const treeNode = queue.shift()!;
      const user = this.lockedMap.get(treeNode.val);
      if (typeof user === "number") {
        results.push(treeNode.val);
      }
      if (treeNode.children.length) {
        queue.push(...treeNode.children);
      }
    }
    return results;
  }
}

/**
 * Your LockingTree object will be instantiated and called as such:
 * var obj = new LockingTree(parent)
 * var param_1 = obj.lock(num,user)
 * var param_2 = obj.unlock(num,user)
 * var param_3 = obj.upgrade(num,user)
 */
