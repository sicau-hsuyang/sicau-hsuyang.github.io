/**
 * 缓存节点
 */
interface CacheNode {
  /**
   * 缓存节点的Key
   */
  key: number;
  /**
   * 缓存节点的值
   */
  data: number;
  /**
   * 缓存节点的权重，为了知道它所在的权重节点
   */
  weight: number;
  /**
   * 缓存节点的前置节点
   */
  prev: CacheNode | null;
  /**
   * 缓存节点的后继节点
   */
  next: CacheNode | null;
}

/**
 * 索引节点
 */
interface IndexedNode {
  /**
   * 索引节点的数据头节点
   */
  head: CacheNode | null;
  /**
   * 索引节点的数据尾节点
   */
  tail: CacheNode | null;
  /**
   * 索引节点的权重，为的是在删除和扩展的时候知道怎么移除怎么新增新的节点
   */
  weight: number;
  /**
   * 索引节点的前置节点
   */
  prev: IndexedNode | null;
  /**
   * 索引节点的后继节点
   */
  next: IndexedNode | null;
}

export class LFUCache {
  /**
   * 缓存的最大容量
   */
  capacity: number = 0;
  /**
   * 缓存的节点数
   */
  size: number = 0;
  /**
   * 索引哈希
   */
  indexedMap: Map<number, IndexedNode> = new Map();
  /**
   * 数据哈希
   */
  dataMap: Map<number, CacheNode> = new Map();
  /**
   * 索引头结点
   */
  startIndexedNode: IndexedNode | null;
  /**
   * 索引的尾节点
   */
  endIndexedNode: IndexedNode | null;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("the LRUCache capacity must bigger than zero");
    }
    /**
     * 缓存的容量
     * @type {number}
     */
    this.capacity = capacity;
  }

  /**
   * 获取缓存
   * @param key
   */
  get(key: number): number {
    // 如果数据不存在
    if (this.capacity <= 0 || !this.dataMap.has(key)) {
      return -1;
    }
    let dataNode = this.dataMap.get(key);
    // 刷新数据的权重
    this.refreshDataNodeWeight(dataNode!);
    return dataNode!.data;
  }

  /**
   * 设置缓存
   * @param key
   * @param value
   * @return {void}
   */
  put(key: number, value: number): void {
    if (this.capacity === 0) {
      console.warn("exceed the lfu cache capacity");
      return;
    }
    // 尝试获取数据节点
    let dataNode = this.dataMap.get(key);
    // 如果数据节点不存在
    if (!dataNode) {
      // 创建数据节点
      dataNode = {
        key,
        weight: 1,
        data: value,
        prev: null,
        next: null,
      };
      // 如果已经超出了最大的容量的话，删除最久没有使用过的节点
      if (this.size === this.capacity) {
        this.eject();
      } else {
        // 否则直接将数量增加
        this.size++;
      }
      // 获取权重为1的索引节点
      let indexedNode = this.getOrCreateIndexedNodeIfNotExist(1);
      // 确定索引节点已存在，向索引节点插入数据节点
      this.insertIndexedNodeData(indexedNode, dataNode);
    } else {
      dataNode.data = value;
      // 直接更新节点的权重
      this.refreshDataNodeWeight(dataNode);
    }
  }

  /**
   * 删除缓存中权重最小并且最久没有使用过的节点
   */
  eject(): void {
    if (!this.startIndexedNode) {
      console.warn("can not eject node from empty cache list");
      return;
    }
    // 获取到权重最小的尾节点
    let tailNode = this.startIndexedNode.tail;
    // 删除权重最小的尾节点
    this.removeIndexedNodeData(this.startIndexedNode, tailNode!);
  }

  /**
   * 更新节点的权重
   * @param dataNode
   */
  refreshDataNodeWeight(dataNode: CacheNode): void {
    const preKeyOfIndexed = dataNode.weight;
    // 获取到之前的索引节点
    let preIndexedNode = this.indexedMap.get(preKeyOfIndexed);
    // 删除之前索引节点上的数据节点
    this.removeIndexedNodeData(preIndexedNode!, dataNode);
    const nowKeyOfIndexed = ++dataNode.weight;
    // 获取现在的索引节点
    const nowIndexedNode =
      this.getOrCreateIndexedNodeIfNotExist(nowKeyOfIndexed);
    // 确定索引节点存在，插入数据节点
    this.insertIndexedNodeData(nowIndexedNode, dataNode);
  }

  /**
   * 获取指定权重的节点，若不存在，则创建
   * @param weight
   */
  getOrCreateIndexedNodeIfNotExist(weight: number): IndexedNode {
    let indexedNode = this.indexedMap.get(weight);
    // 如果现在的索引节点不存在
    if (!indexedNode) {
      indexedNode = {
        weight,
        head: null,
        tail: null,
        prev: null,
        next: null,
      };
      this.insertIndexedNode(indexedNode);
    }
    return indexedNode;
  }

  /**
   * 删除indexedNode
   * @param indexedNode
   */
  removeIndexedNode(indexedNode: IndexedNode): void {
    const isStart = this.startIndexedNode === indexedNode;
    const isEnd = this.endIndexedNode === indexedNode;
    // 只有一个节点
    if (isStart && isEnd) {
      this.endIndexedNode = this.startIndexedNode = null;
    } else if (isStart) {
      // 2个节点以上。删除头节点
      const afterNode = this.startIndexedNode!.next;
      this.startIndexedNode!.next = null;
      afterNode!.prev = null;
      this.startIndexedNode = afterNode;
    } else if (isEnd) {
      // 2个节点以上，删除尾节点
      const beforeNode = this.endIndexedNode!.prev;
      this.endIndexedNode!.prev = null;
      beforeNode!.next = null;
      this.endIndexedNode = beforeNode;
    } else {
      // 如果即不删除头节点，也不删除尾节点，至少是3个节点以上
      const beforeNode = indexedNode.prev;
      const afterNode = indexedNode.next;
      indexedNode.prev = null;
      indexedNode.next = null;
      beforeNode!.next = afterNode;
      afterNode!.prev = beforeNode;
    }
    const weight = indexedNode.weight;
    this.indexedMap.delete(weight);
  }

  /**
   * 将indexedNode插入在refNode之后
   * @param indexedNode
   * @param refNode
   */
  insertIndexedNode(
    indexedNode: IndexedNode,
    refNode: IndexedNode | null = null
  ): void {
    const weight = indexedNode.weight;
    this.indexedMap.set(weight, indexedNode);
    // 如果当前表为空
    if (!this.startIndexedNode && !this.endIndexedNode) {
      this.startIndexedNode = this.endIndexedNode = indexedNode;
      return;
    }
    // 如果参考节点不存在或者只有一个参考节点，说明当前其实只有一个节点，则直接插入在最后面
    if (!refNode || (!refNode.next && !refNode.prev)) {
      // 如果当前节点的索引比较大
      if (indexedNode.weight < this.startIndexedNode!.weight) {
        indexedNode.next = this.startIndexedNode;
        this.startIndexedNode!.prev = indexedNode;
        this.startIndexedNode = indexedNode;
      } else {
        this.endIndexedNode!.next = indexedNode;
        indexedNode.prev = this.endIndexedNode;
        this.endIndexedNode = indexedNode;
      }
    } else {
      const refNextNode = refNode.next;
      // 说明不是最后一个节点
      if (refNextNode) {
        // 建立前驱节点的关系
        refNode.next = indexedNode;
        indexedNode.prev = refNode;
        // 建立后继节点的关系
        indexedNode.next = refNextNode;
        refNextNode.prev = indexedNode;
      } else {
        // 建立前驱节点的关系
        refNode.next = indexedNode;
        indexedNode.prev = refNode;
        this.endIndexedNode = indexedNode;
      }
    }
  }

  /**
   * 删除indexedNode上的dataNode
   * @param indexedNode
   * @param dataNode
   */
  removeIndexedNodeData(indexedNode: IndexedNode, dataNode: CacheNode): void {
    if (!indexedNode || !dataNode) {
      console.warn("indexed node or data node is null");
      return;
    }
    const isStart = indexedNode.head === dataNode;
    const isEnd = indexedNode.tail === dataNode;
    if (isStart && isEnd) {
      this.removeIndexedNode(indexedNode);
    } else if (isStart) {
      const afterNode = indexedNode!.head!.next;
      indexedNode!.head!.next = null;
      afterNode!.prev = null;
      indexedNode.head = afterNode;
    } else if (isEnd) {
      const beforeNode = indexedNode!.tail!.prev;
      indexedNode!.tail!.prev = null;
      beforeNode!.next = null;
      indexedNode.tail = beforeNode;
    } else {
      const beforeDataNode = dataNode.prev;
      const afterDataNode = dataNode.next;
      dataNode.prev = null;
      dataNode.next = null;
      beforeDataNode!.next = afterDataNode;
      afterDataNode!.prev = beforeDataNode;
    }
    // 删除key上面的内容
    const key = dataNode.key;
    this.dataMap.delete(key);
  }

  /**
   * 向indexedNode上插入dataNode
   * @param indexedNode
   * @param dataNode
   */
  insertIndexedNodeData(indexedNode: IndexedNode, dataNode: CacheNode): void {
    if (!indexedNode || !dataNode) {
      console.warn("num node or data node is null");
      return;
    }
    if (indexedNode.head === null && indexedNode.tail === null) {
      indexedNode.head = dataNode;
      indexedNode.tail = dataNode;
    } else {
      // 将缓存节点插入在当前索引的最前端
      dataNode.next = indexedNode.head;
      indexedNode!.head!.prev = dataNode;
      indexedNode.head = dataNode;
    }
    const key = dataNode.key;
    this.dataMap.set(key, dataNode);
  }
}
