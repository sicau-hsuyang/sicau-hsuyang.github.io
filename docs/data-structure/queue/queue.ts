/**
 * 队列元素的节点元素定义，必须使用双向链表，便于我们查找前驱和后继元素
 */
interface LinkedListNode<T> {
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;
  data: T;
}

export class Queue<T> {
  /**
   * 链表的头结点
   */
  private head: LinkedListNode<T> | null = null;

  /**
   * 链表的尾节点
   */
  private tail: LinkedListNode<T> | null = null;

  private length = 0;

  public get size() {
    return this.length;
  }

  /**
   * 入队一个元素
   * @param ele
   */
  public enqueue(ele: T) {
    const newNode: LinkedListNode<T> = {
      next: null,
      prev: null,
      data: ele,
    };
    // 队列长度增加
    this.length++;
    // 如果一个元素都没有，直接让head和tail都指向这个节点
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      // 如果存在多个元素，让尾指针指向新来的节点
      this.tail!.next = newNode;
      // 新来的节点指向队尾指针
      newNode.prev = this.tail;
      // 让队尾指针指向新来的节点
      this.tail = newNode;
    }
  }

  /**
   * 出队一个元素
   */
  public dequeue() {
    if (this.isEmpty()) {
      throw new Error("can not dequeue from an empty queue");
    }
    // 获取到头节点的后继节点
    let head = this.head!.next;
    // 队列中的元素
    let ele = this.head!.data;
    // 解开第一个节点的后继节点
    this.head!.next = null;
    // head节点有可能不存在了
    if (head) {
      // 解开第一个节点的后继节点的前驱节点
      head.prev = null;
    }
    // 让队首元素指向新的队首元素
    this.head = head;
    // 队列长度递减
    this.length--;
    // 将链表指针置空，若队列空
    if (this.length == 0) {
      this.head = null;
      this.tail = null;
    }
    return ele;
  }

  /**
   * 队列是否为空
   * @returns
   */
  public isEmpty() {
    return this.length === 0;
  }
}
