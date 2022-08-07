class ListNode {
  val: number = -1;
  next: ListNode[] = [];
  constructor(val: number) {
    this.val = val;
  }
}

class SkipList {
  /**
   * 最大层数
   */
  level = 8;

  /**
   * 头结点
   */
  head!: ListNode;

  constructor() {
    this.head = new ListNode(-1);
  }

  find(target) {
    let pre = new Array(this.level);
    let p = this.head; // 从头节点开始遍历每一层
    for (let i = this.level - 1; i >= 0; i--) {
      // 从上层往下层找
      while (p.next[i] && p.next[i].val < target) {
        // 如果当前层 i 的 next 不为空，且它的值小于 target，则 p 往后走指向这一层 p 的 next
        p = p.next[i];
      }
      // 退出 while 时说明找到了第 i 层小于 target 的最大节点就是 p
      pre[i] = p;
    }
    return pre;
  }

  search(target: number) {
    // 先找到每一层 i 小于目标值 target 的最大节点 pre[i]
    let pre = this.find(target);
    // 因为最下层【0】的节点是全的，所以只需要判断 target 是否在第 0 层即可，而 pre[0] 正好就是小于 target 的最大节点，如果 pre[0]->next[0] 的值不是 target 说明没有这个元素
    let p = pre[0].next[0];
    return p && p.val == target;
  }

  // 向跳表中插入元素 num
  add(num: number) {
    // 先找到每一层 i 小于目标值 target 的最大节点 pre[i]
    let pre = this.find(num);
    // 创建要插入的新节点
    let p = new ListNode(num);
    for (let i = 0; i < this.level; i++) {
      // 遍历每一层，从下往上插入新节点
      // 这两步就是单链表的插入
      p.next[i] = pre[i].next[i];
      pre[i].next[i] = p;
      if (Math.random() > 0.5) {
        break; // 每一层有 50% 的概率不插入新节点
      }
    }
  }

  // 从跳表中删除 num
  remove(num: number) {
    // 先找到每一层 i 小于目标值 target 的最大节点 pre[i]
    let pre = this.find(num);
    // 先判断 num 是否存在，不存在直接返回 false
    // 第 0 层存储的是全部节点，所以只需要判断 pre[0]->next[0]（第 0 层小于 num 的最大节点的在第 0 层的 next） 是不是 num 即可
    let p = pre[0].next[0];
    if (!p || p.val != num) {
      console.warn("要删除的值不存在!");
      return false;
    }
    // 否则删除每一层的 num，如果 pre[i]->next[i] == p 说明第 i 层存在 p
    for (let i = 0; i < this.level && pre[i].next[i] == p; i++) {
      // 单链表删除
      pre[i].next[i] = p.next[i];
    }
    p = null; // 删除节点 p，防止内存泄漏
    return true;
  }
}
