/**
 * 栈的节点元素定义，必须使用双向链表，便于我们查找前驱和后继元素
 */
interface LinkedListNode<T> {
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;
  data: T;
}

export class Stack<T> {
  /**
   * 链表的头结点
   */
  private head: LinkedListNode<T> | null = null;

  private length = 0;

  public get size() {
    return this.length;
  }
  /* 获取栈顶元素 */
  public get top(): T | null {
    return this.isEmpty() ? null : this.head!.data;
  }

  /**
   * 压栈
   * @param ele
   */
  public push(ele: T) {
    const newNode: LinkedListNode<T> = {
      next: null,
      prev: null,
      data: ele,
    };
    // 栈长度增加
    this.length++;
    // 如果一个元素都没有，直接让head指向这个节点
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      // 让原本的头指针指向新来的节点
      this.head = newNode;
    }
  }
  /**
   * 退栈
   */
  public pop() {
    if (this.isEmpty()) {
      throw new Error("can not pop from an empty stack");
    }
    // 获取到头节点的后继节点
    let head = this.head!.next;
    // 栈中的元素
    let ele = this.head!.data;
    if (head) {
      // 解开第一个节点的后继节点
      this.head!.next = null;
      // 解开第一个节点的后继节点的前驱节点
      head.prev = null;
      // 让栈首元素指向新的栈首元素
      this.head = head;
    } else {
      this.head = null;
    }
    // 栈长度递减
    this.length--;
    return ele;
  }

  /**
   * 栈是否为空
   * @returns
   */
  public isEmpty() {
    return this.length === 0;
  }
}
