## 算法介绍

`LRU`是 Least Recently Used 的缩写，即最近最少使用，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 t 值最大的，即最近最少使用的页面予以淘汰。（copy 自百度百科）

听君一席话，如听君一席话，上述描述理解起来还挺费劲儿，我觉得简单点儿就是，**每次访问缓存，都把当前访问节点的权重更新，如果新增内容且超出了容量，则删除权重最低的即可**。

## 思路分析

由于缓存都是有频繁的访问（如果不频繁访问，那缓存就没有意义了）的，如何提高效率是一个值得商榷的事情。最好让我们的`get`和`set`都是`O(1)`，那是最好不过的了。

可能做到吗？先思考一下拥有`O(1)`访问效率的数据结构有哪些：

哈希表或数组在获取内容的时候访问效率为 `O(1)`;链表在插入或删除时，如无前置查找，效率为`O(1)`。

那我们即可构建一个链表，用一个哈希表记住链表上的每个节点，如果获取到节点，需要将缓存更新，则将其提到链表的最前面，如果新增内容超出了缓存的最大容量，只需要删除最后一个节点即可，并且把新来的节点插入到链表头部。

考虑到在获取到链表中部的节点时，为了方便找前驱节点和后继节点，那么，我们得考虑使用双向链表。通过这样设计的话，我们`get`和`set`的效率都为`O(1)`。

## 算法实现

```JavaScript
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  if (capacity <= 0) {
    console.error("the LRUCache capacity must bigger than zero");
  }
  this.capacity = capacity;
  this.size = 0;
  /**
   * @type { Map<any, DoubleLinkedListNode> }
   */
  this.mapping = new Map();
  /**
   * @type { DoubleLinkedListNode | null }
   */
  this.head = null;
  /**
   * @type { DoubleLinkedListNode | null }
   */
  this.tail = null;
};

/**
 * 刷新链表节点
 * @param {DoubleLinkedListNode} node
 * @returns
 */
LRUCache.prototype.refresh = function (node) {
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
    this.head.prev = node;
    this.head = node;
  }
  // 如果同时存在前驱和后继节点
  if (prevNode && nextNode) {
    // 把原来的两个节点接到一起
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    // 然后把当前这个节点提到最前面去
    node.next = this.head;
    this.head.prev = node;
    node.prev = null;
    this.head = node;
  }
};

/**
 * @param {any} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let node = this.mapping.get(key);
  if (!node) {
    return -1;
  }
  // 刷新节点
  this.refresh(node);
  return node.val;
};

/**
 * @param {any} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
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
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
    if (this.size > this.capacity) {
      let oldKey = this.tail.key;
      this.mapping.delete(oldKey);
      // 解开最后一个节点
      let preTail = this.tail.prev;
      preTail.next = null;
      this.tail.prev = null;
      this.tail = preTail;
      this.size--;
    }
  } else {
    oldNode.val = value;
    this.refresh(oldNode);
  }
};

/**
 * 创建一个链表节点
 * @param {number} val
 * @returns {Node}
 */
LRUCache.prototype.createNode = function (key, val) {
  return {
    prev: null,
    next: null,
    val,
    key,
  };
};
```

## 应用场景

在 vue 中[KeepAlive](https://cn.vuejs.org/v2/api/#keep-alive)组件对于缓存实例数的控制就是用的 LRUCache;

在 Vvu 使用`SSR`时，[页面缓存](https://v2.ssr.vuejs.org/zh/guide/caching.html#%E7%BB%84%E4%BB%B6%E7%BA%A7%E5%88%AB%E7%BC%93%E5%AD%98-component-level-caching)也可以使用 LRUCache 算法；

对于实际开发中，我们可以使用更成熟的第三方库，如`lru-cache`库，[仓库地址](https://github.com/isaacs/node-lru-cache)。
