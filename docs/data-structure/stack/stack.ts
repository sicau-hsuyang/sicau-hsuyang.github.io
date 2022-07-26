// class Stack<T> {
//   private data: T[] = [];

//   get size(): number {
//     return this.data.length;
//   }

//   /**
//    * 压栈
//    * @param ele
//    */
//   push(ele: T) {
//     let length = this.data.length;
//     // 将新加入的元素放在最后面
//     this.data[length] = ele;
//     // 数组长度+1
//     this.data.length++;
//   }

//   /**
//    * 退栈
//    * @returns
//    */
//   pop() {
//     if (this.isEmpty()) {
//       throw new Error("can't pop from an empty stack");
//     }
//     let length = this.data.length;
//     // 取出最后一个元素
//     let ele = this.data[length - 1];
//     // 数组长度-1
//     this.data.length--;
//     return ele;
//   }

//   /**
//    * 判断栈是否为空
//    * @returns
//    */
//   isEmpty() {
//     return this.data.length === 0;
//   }
// }

/**
 * 栈的节点元素定义，必须使用双向链表，便于我们查找前驱和后继元素
 */
interface LinkedListNode<T> {
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;
  data: T;
}

class Stack<T> {
  /**
   * 链表的头结点
   */
  private head: LinkedListNode<T> | null = null;

  private length = 0;

  public get size() {
    return this.length;
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
    // 队列长度增加
    this.length++;
    // 如果一个元素都没有，直接让head和tail都指向这个节点
    if (this.head === null) {
      this.head = newNode;
    } else {
      // 如果存在多个元素，让头指针指向新来的节点
      this.head!.next = newNode;
      // 新来的节点指向头指针
      newNode.prev = this.head;
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
    // 队列中的元素
    let ele = this.head!.data;
    // 解开第一个节点的后继节点
    this.head!.next = null;
    // 解开第一个节点的后继节点的前驱节点
    head!.prev = null;
    // 让队首元素指向新的队首元素
    this.head = head;
    // 栈长度递减
    this.length--;
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
