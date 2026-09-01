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
  value: T;
  /**
   * key
   */
  key: K;
}

// export class LRUCache {
//   capacity: number;

//   size = 0;

//   mapping: Map<number, DoubleLinkedListNode<number, number>> = new Map();

//   head: null | DoubleLinkedListNode<number, number> = null;

//   tail: null | DoubleLinkedListNode<number, number> = null;

//   constructor(capacity: number) {
//     if (capacity <= 0) {
//       console.error("the LRUCache capacity must bigger than zero");
//     }
//     this.capacity = capacity;
//   }

//   createNode(key: number, val: number): DoubleLinkedListNode<number, number> {
//     return {
//       prev: null,
//       next: null,
//       val,
//       key,
//     };
//   }

//   get(key: number): number {
//     let node = this.mapping.get(key);
//     if (!node) {
//       return -1;
//     }
//     // 刷新节点
//     this.refresh(node);
//     return node.val;
//   }

//   refresh(node: DoubleLinkedListNode<number, number>): void {
//     if (!node) {
//       console.warn("failed to refresh cache node");
//       return;
//     }
//     let prevNode = node.prev;
//     let nextNode = node.next;
//     // 如果不存在前驱节点，说明当前节点就是最近使用过的节点，无需刷新
//     if (!prevNode) {
//       // this.head = node;
//       return;
//     }
//     // 如果不存在后继节点，说明当前节点就是最后一个节点，直接提到最前面去
//     if (!nextNode) {
//       prevNode.next = null;
//       this.tail = prevNode;
//       node.next = this.head;
//       this.head!.prev = node;
//       this.head = node;
//     }
//     // 如果同时存在前驱和后继节点
//     if (prevNode && nextNode) {
//       // 把原来的两个节点接到一起
//       prevNode.next = nextNode;
//       nextNode.prev = prevNode;
//       // 然后把当前这个节点提到最前面去
//       node.next = this.head;
//       this.head!.prev = node;
//       node.prev = null;
//       this.head = node;
//     }
//   }

//   put(key: number, value: number) {
//     let oldNode = this.mapping.get(key);
//     // 旧节点不存在
//     if (!oldNode) {
//       const newNode = this.createNode(key, value);
//       // 设置新值
//       this.mapping.set(key, newNode);
//       if (this.size === 0) {
//         this.head = newNode;
//         this.tail = newNode;
//       } else {
//         newNode.next = this.head;
//         this.head!.prev = newNode;
//         this.head = newNode;
//       }
//       this.size++;
//       if (this.size > this.capacity) {
//         let oldKey = this.tail!.key;
//         this.mapping.delete(oldKey);
//         // 解开最后一个节点
//         let preTail = this.tail!.prev;
//         preTail!.next = null;
//         this.tail!.prev = null;
//         this.tail = preTail!;
//         this.size--;
//       }
//     } else {
//       oldNode.val = value;
//       this.refresh(oldNode);
//     }
//   }
// }

export class LRUCache {
  private capacity = 0;

  private count = 0;

  private map: Map<number, DoubleLinkedListNode<number, number>> = new Map();

  private tail: DoubleLinkedListNode<number, number> | null = null;

  private head: DoubleLinkedListNode<number, number> | null = null;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  private move(node: DoubleLinkedListNode<number, number>) {
    // 只有一个节点，或者本来就是头节点了，什么都不需要动
    if (node === this.head) {
      return;
    }

    // 是最后一个节点
    if (node === this.tail) {
      // 移除最后一个节点
      const prev = this.tail.prev as DoubleLinkedListNode<number, number>;
      prev.next = null;
      this.tail.prev = null;
      this.tail = prev;
    }
    // 是中间节点
    else {
      const nextNode = node.next;
      const prevNode = node.prev;
      prevNode!.next = nextNode;
      nextNode!.prev = prevNode;
    }
    // 添加到最前面去
    node.next = this.head;
    this.head!.prev = node;
    this.head = node;
  }

  private removeNode() {
    // 没有超限
    if (this.count <= this.capacity) {
      return;
    }
    if (!this.tail) {
      return;
    }
    // 只有一个节点
    if (this.tail === this.head) {
      this.map.delete(this.tail.key);
      this.tail = this.head = null;
    }
    // 大于一个节点
    else {
      this.map.delete(this.tail.key);
      const prevNode = this.tail.prev;
      prevNode!.next = null;
      this.tail.prev = null;
      this.tail = prevNode as DoubleLinkedListNode<number, number>;
    }
    this.count--;
  }

  private insertNode(node: DoubleLinkedListNode<number, number>) {
    this.count++;
    // 空表
    if (this.head === this.tail && this.head === null) {
      this.head = this.tail = node;
    } else {
      // 头插法
      node.next = this.head;
      this.head!.prev = node;
      this.head = node;
    }
  }

  get(key: number): number {
    // 不存在节点
    if (!this.map.has(key)) {
      return -1;
    }
    const targetNode = this.map.get(key)!;
    const val = targetNode.value;
    this.move(targetNode);
    return val;
  }

  put(key: number, value: number): void {
    const node: DoubleLinkedListNode<number, number> = {
      key,
      value,
      prev: null,
      next: null,
    };
    // 如果存在，则更新，不存在则插入
    if (this.map.has(key)) {
      const targetNode = this.map.get(key)!;
      targetNode!.value = value;
      this.move(targetNode);
    } else {
      // 设置映射
      this.map.set(key, node);
      // 插入新的节点
      this.insertNode(node);
      // 移除最老的节点
      this.removeNode();
    }
  }
}
