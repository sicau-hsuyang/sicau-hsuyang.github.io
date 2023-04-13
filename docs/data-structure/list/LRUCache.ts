interface DoubleLinkedListNode<K, T> {
  /**
   * 前驱节点
   */
  prev?: DoubleLinkedListNode<K, T> | null;
  /**
   * 后继节点
   */
  next?: DoubleLinkedListNode<K, T> | null;
  /**
   * value
   */
  val: T;
  /**
   * key
   */
  key: K;
}

export class LRUCache {
  capacity: number;

  size = 0;

  mapping: Map<number, DoubleLinkedListNode<number, number>> = new Map();

  head: null | DoubleLinkedListNode<number, number> = null;

  tail: null | DoubleLinkedListNode<number, number> = null;

  constructor(capacity: number) {
    if (capacity <= 0) {
      console.error("the LRUCache capacity must bigger than zero");
    }
    this.capacity = capacity;
  }

  createNode(key: number, val: number): DoubleLinkedListNode<number, number> {
    return {
      prev: null,
      next: null,
      val,
      key,
    };
  }

  get(key: number): number {
    let node = this.mapping.get(key);
    if (!node) {
      return -1;
    }
    // 刷新节点
    this.refresh(node);
    return node.val;
  }

  refresh(node: DoubleLinkedListNode<number, number>): void {
    if (!node) {
      console.warn("failed to refresh cache node");
      return;
    }
    let prevNode = node.prev;
    let nextNode = node.next;
    // 如果不存在前驱节点，说明当前节点就是最近使用过的节点，无需刷新
    if (!prevNode) {
      // this.head = node;
      return;
    }
    // 如果不存在后继节点，说明当前节点就是最后一个节点，直接提到最前面去
    if (!nextNode) {
      prevNode.next = null;
      this.tail = prevNode;
      node.next = this.head;
      this.head!.prev = node;
      this.head = node;
    }
    // 如果同时存在前驱和后继节点
    if (prevNode && nextNode) {
      // 把原来的两个节点接到一起
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      // 然后把当前这个节点提到最前面去
      node.next = this.head;
      this.head!.prev = node;
      node.prev = null;
      this.head = node;
    }
  }

  put(key: number, value: number) {
    let oldNode = this.mapping.get(key);
    // 旧节点不存在
    if (!oldNode) {
      const newNode = this.createNode(key, value);
      // 设置新值
      this.mapping.set(key, newNode);
      if (this.size === 0) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head!.prev = newNode;
        this.head = newNode;
      }
      this.size++;
      if (this.size > this.capacity) {
        let oldKey = this.tail!.key;
        this.mapping.delete(oldKey);
        // 解开最后一个节点
        let preTail = this.tail!.prev;
        preTail!.next = null;
        this.tail!.prev = null;
        this.tail = preTail!;
        this.size--;
      }
    } else {
      oldNode.val = value;
      this.refresh(oldNode);
    }
  }
}
