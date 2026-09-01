interface LinkedNode {
  val: number;
  next: LinkedNode | null;
  prev: LinkedNode | null;
}

class MinStack {
  head: LinkedNode | null = null;

  tail: LinkedNode | null = null;

  stack: number[] = [];

  constructor() {}

  private insertLinkedList(val: number) {
    // 只有一个节点
    if (!this.head) {
      this.head = this.tail = {
        val,
        next: null,
        prev: null,
      };
    } else {
      let node = this.tail;
      while (node && node.val > val) {
        node = node.prev;
      }
      if (node) {
        let nextNode = node.next;
        let newNode = {
          val,
          next: nextNode,
          prev: node,
        };
        node.next = newNode;
        newNode.prev = node;
        // 插入的是中间的节点
        if (nextNode) {
          nextNode.prev = newNode;
        } else {
          // 插入的是最大的节点
          this.tail = newNode;
        }
      } else {
        const nextNode = this.head.next;
        this.head = {
          val,
          next: nextNode,
          prev: node,
        };
        nextNode!.prev = this.head;
      }
    }
  }

  private removeLinkedList(val: number) {
    if (!this.tail) {
      throw new Error("can not remove element from empty stack");
    }
    let node: LinkedNode | null = this.tail;
    while (node && node.val > val) {
      node = node.prev;
    }
    if (!node || node.val !== val) {
      throw new Error("can not remove element not exist in stack");
    }
    if (node === this.head && node === this.tail) {
      this.head = this.tail = null;
    }
    // 删除的是尾节点
    else if (node === this.tail) {
      const prevNode = this.tail.prev;
      prevNode!.next = null;
      this.tail.prev = null;
      this.tail = prevNode;
    }
    // 删除的是头结点
    else if (node === this.head) {
      const nextNode = this.head.next;
      nextNode!.prev = null;
      this.head.next = null;
      this.head = null;
    }
    // 删除的是中间节点
    else {
      
    }
  }

  push(val: number): void {
    this.insertLinkedList(val);
    this.stack.push(val);
  }

  pop(): void {
    const val = this.stack.pop()!;
    this.removeLinkedList(val);
  }

  top(): number {
    if (!this.stack.length) {
      throw new Error("empty stack");
    }
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    if (!this.head) {
      throw new Error("empty stack");
    }
    return this.head.val;
  }
}
