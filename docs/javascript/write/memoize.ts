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

class LRUCache<P, V> {
  static EMPTY_SENTINEL = new Error("empty node");

  capacity: number;

  size = 0;

  mapping: Map<P, DoubleLinkedListNode<P, V>> = new Map();

  head: null | DoubleLinkedListNode<P, V> = null;

  tail: null | DoubleLinkedListNode<P, V> = null;

  constructor(capacity: number) {
    if (capacity <= 0) {
      console.error("the LRUCache capacity must bigger than zero");
    }
    this.capacity = capacity;
  }

  public setCapacity(maxCapacity: number) {
    this.capacity = maxCapacity;
  }

  private createNode(key: P, val: V): DoubleLinkedListNode<P, V> {
    return {
      prev: null,
      next: null,
      val,
      key,
    };
  }

  public has(key: P): boolean {
    return this.mapping.has(key);
  }

  public get(key: P): V | typeof LRUCache.EMPTY_SENTINEL {
    let node = this.mapping.get(key);
    if (!node) {
      return LRUCache.EMPTY_SENTINEL;
    }
    // 刷新节点
    this.refresh(node);
    return node.val;
  }

  private refresh(node: DoubleLinkedListNode<P, V>): void {
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

  public set(key: P, value: V) {
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

type Func<T extends any[], R> = (...args: T) => R;

export function memoize<T extends any[], R>(
  func: Func<T, R>,
  resolver?: ((...args: any[]) => PropertyKey) | PropertyKey,
  maxSize?: number
): Func<T, R> {
  if (typeof func != "function") {
    throw new TypeError("Expected a function");
  }
  const memoizeCache = new LRUCache<PropertyKey, T>(maxSize || 10);
  const memoized = function () {
    const args = arguments,
      // resolver作为一个可选参数，如果用户不提供，函数以第一个参数作为缓存的key，若用户提供，则以用户提供的缓存key存储
      key =
        typeof resolver === "function"
          ? resolver.apply(this, args)
          : resolver || args[0],
      cache = memoizeCache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    memoizeCache.set(key, result);
    return result;
  };
  return memoized;
}
