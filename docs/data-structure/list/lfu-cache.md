<!--
 * @Autor: Zhang Yingying
 * @Date: 2022-08-12 15:11:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-08-12 17:06:05
-->

## 算法介绍

在阅读本文之前，请确保你已经掌握[LRU](/data-structure/list/lru-cache.html)，本文不会赘述前文所阐述过的的内容。

`LFU`缓存算法是在`LRU`算法上的一个改进，对于缓存增加了一个权重的概念。

<div align="center">
  <a href="https://leetcode.cn/problems/lfu-cache/" target="_blank">
    <img :src="$withBase('/list/LFU-desc.png')" alt="LFU" title="单击可跳转至原文" />
  </a>
</div>

## 思路分析

在`LRU`算法的实现中，我们使用了`双向链表`，很明显，`LFU`也是需要使用`双向链表`的。

但是有个问题，如何来管理权重呢？

由于题目已经要求了算法复杂度，因此，这儿要不就是哈希表，要不就得是链表，如果使用哈希表的话，怎么知道各个权重缓存的关系呢，光用哈希表肯定搞不定，如果加上链表呢？

把权重节点用链表串起来，然后链表的节点内存存储缓存内容，联想到曾经提到过的`广义表`的内容，算法实现的基本框架就已经成型了，如下图：

<div align="center">
  <img :src="$withBase('/list/LFU-design.png')" alt="LFU设计" />
</div>

如果能知道到权重的头结点和尾节点，并且能找到任意权重的子链表；如果能获取到对应权重的链表，并且能获取到任意缓存节点，那不就大功告成了吗？

有了这个设计思路，一切都是手到擒来了，接下来，我们将所需要的数据结构定义出来：

```ts
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
```

索引节点，即上图中橙色的节点。

```ts
/**
 * 缓存节点
 */
interface CacheNode {
  /**
   * 缓存节点的Key
   */
  key: string;
  /**
   * 缓存节点的值
   */
  data: string;
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
```

数据节点，即上图中蓝色的节点。

## 算法实现

这个算法实现较为复杂，必须充分的理解面向对象编程的思想，合理的封装，以及职责的划分才能更好的理解这题。（在没有意识到这个问题之前，我不知道被绕晕了多少次）

首先，构造函数的内容，需要定义`缓存容量`以及`当前已缓存的数量`，需要定义两个哈希表，用于以`O(1)`的复杂度在缓存节点中查找，一个用于查找权重，一个用于查找缓存节点。

```js
/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
  /**
   * 缓存的容量
   * @type {number}
   */
  this.capacity = capacity;
  /**
   * 缓存的节点数
   * @type {number}
   */
  this.size = 0;
  /**
   * @type {Map<number, IndexedNode>}
   */
  this.indexedMap = new Map();
  /**
   * @type {Map<number, CacheNode>}
   */
  this.dataMap = new Map();
  /**
   * @type {IndexedNode | null}
   */
  this.startIndexedNode;
  /**
   * @type {IndexedNode | null}
   */
  this.endIndexedNode;
};

/**
 * 获取缓存
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  // 如果数据不存在
  if (this.capacity <= 0 || !this.dataMap.has(key)) {
    return -1;
  }
  let dataNode = this.dataMap.get(key);
  // 刷新数据的权重
  this.refreshDataNodeWeight(dataNode);
  return dataNode.data;
};

/**
 * 设置缓存
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
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
};
```

对于`put`操作来说，新来的节点有两种可能，一种是已经存在，那么它需要执行的操作就非常简单，只需要简单的刷新一下它的权重和更新值即可。

对于一个不存在的节点来说，操作就有点儿复杂了。

首先，肯定得初始化这个缓存节点，这个缓存节点的权重一定是 1(因为是新来的嘛)，那么，对于权重为 1 的权重节点是不一定存在的，我们要将这个缓存节点插入的话，首先得确保这个权重节点存在，所以，不存在的话就需要先创建，封装一个操作，避免每次都要去判断，如下：

```js
/**
 * 获取指定权重的节点，若不存在，则创建
 * @param {number} weight
 */
LFUCache.prototype.getOrCreateIndexedNodeIfNotExist = function (weight) {
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
};
```

创建成功了，我们就可以直接将缓存节点插入到权重节点中了吗？

不，还不能，因为有容量的限制，假设当前缓存已经超限了的话，那么，得剔除一下权重最小，最远没有使用过的缓存节点。

::: danger 特别注意
一定是要先剔除才能插入，因为**新插入的缓存节点权重一定是 1**，那么如果先插入，再剔除的话，那么一定总是剔除的刚才插入的节点。
:::

接着，来看我们之前所用到的，还没有实现的方法。

首先是剔除，思路非常简单，因为持有权重链表的首尾节点，可以很容易的拿到最小权重的节点，它对应的这个链表，其尾节点一定是最久没有使用过的节点，那么其实现就如下所示了：

```js
/**
 * 删除缓存中权重最小并且最久没有使用过的节点
 */
LFUCache.prototype.eject = function () {
  // 获取到权重最小的尾节点
  let tailNode = this.startIndexedNode.tail;
  // 删除权重最小的尾节点
  this.removeIndexedNodeData(this.startIndexedNode, tailNode);
};
```

接着，来看从权重链表中移除节点和从缓存链表中移除节点方法。

对于权重链表的节点移除需要注意的是，它的删除可能会导致之前持有的权重链表的首尾节点改变，大概能够分为 3 种情况的删除。

- 删除头结点
- 删除尾节点
- 删除中间节点

```js
/**
 * 删除indexedNode
 * @param {IndexedNode} indexedNode
 */
LFUCache.prototype.removeIndexedNode = function (indexedNode) {
  const isStart = this.startIndexedNode === indexedNode;
  const isEnd = this.endIndexedNode === indexedNode;
  // 只有一个节点
  if (isStart && isEnd) {
    this.endIndexedNode = this.startIndexedNode = null;
  } else if (isStart) {
    // 2个节点以上。删除头节点
    const afterNode = this.startIndexedNode.next;
    this.startIndexedNode.next = null;
    afterNode.prev = null;
    this.startIndexedNode = afterNode;
  } else if (isEnd) {
    // 2个节点以上，删除尾节点
    const beforeNode = this.endIndexedNode.prev;
    this.endIndexedNode.prev = null;
    beforeNode.next = null;
    this.endIndexedNode = beforeNode;
  } else {
    // 如果即不删除头节点，也不删除尾节点，至少是3个节点以上
    const beforeNode = indexedNode.prev;
    const afterNode = indexedNode.next;
    indexedNode.prev = null;
    indexedNode.next = null;
    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
  }
  const weight = indexedNode.weight;
  this.indexedMap.delete(weight);
};
```

需要注意点的是，如果头尾节点都是同一个的话，删除之后将头尾节点都必须要指向空。

接着是，删除权重节点关联的缓存链表的节点：

```js
/**
 * 删除indexedNode上的dataNode
 * @param {IndexedNode} indexedNode
 * @param {CacheNode} dataNode
 */
LFUCache.prototype.removeIndexedNodeData = function (indexedNode, dataNode) {
  if (!indexedNode || !dataNode) {
    console.warn("indexed node or data node is null");
    return;
  }
  const isStart = indexedNode.head === dataNode;
  const isEnd = indexedNode.tail === dataNode;
  if (isStart && isEnd) {
    this.removeIndexedNode(indexedNode);
  } else if (isStart) {
    const afterNode = indexedNode.head.next;
    indexedNode.head.next = null;
    afterNode.prev = null;
    indexedNode.head = afterNode;
  } else if (isEnd) {
    const beforeNode = indexedNode.tail.prev;
    indexedNode.tail.prev = null;
    beforeNode.next = null;
    indexedNode.tail = beforeNode;
  } else {
    const beforeDataNode = dataNode.prev;
    const afterDataNode = dataNode.next;
    dataNode.prev = null;
    dataNode.next = null;
    beforeDataNode.next = afterDataNode;
    afterDataNode.prev = beforeDataNode;
  }
  // 删除key上面的内容
  const key = dataNode.key;
  this.dataMap.delete(key);
};
```

需要考虑的情况和删除权重链表的节点操作类似。

有删除，就有插入，分别是插入权重节点和插入权重节点上的缓存节点的操作。

这两个操作是非常容易出错的，需要尤其小心，考虑的边界条件也多的多。

```js
/**
 * 将indexedNode插入在refNode之后
 * @param {IndexedNode} indexedNode
 * @param {IndexedNode | null} refNode
 */
LFUCache.prototype.insertIndexedNode = function (indexedNode, refNode = null) {
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
    if (indexedNode.weight < this.startIndexedNode.weight) {
      indexedNode.next = this.startIndexedNode;
      this.startIndexedNode.prev = indexedNode;
      this.startIndexedNode = indexedNode;
    } else {
      this.endIndexedNode.next = indexedNode;
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
};
```

如果插入权重节点，之前一个都没有的话，那么直接插入就好。

但问题就是如果之前有的话，你就要指定新来的权重节点插入的位置了，因此，我们引入一个参数叫做`refNode`。我们规定如果存在`refNode`的话，都将节点插入在这个节点之后。

这儿有一个极其边界的条件，本来，只有一个权重节点，那么，新插入的节点就不能简单的只考虑直接插入在`refNode`的后面了，此时需要比较一下新插入的权重节点的权重，决定插入在其前还是后。

在已知权重节点上插入新的缓存节点这个操作非常简单，因为我们之前已经学过了`LRU`，只需要将新来的节点都插在表头即可。

```js
/**
 * 向indexedNode上插入dataNode
 * @param {IndexedNode} indexedNode
 * @param {CacheNode} dataNode
 */
LFUCache.prototype.insertIndexedNodeData = function (indexedNode, dataNode) {
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
    indexedNode.head.prev = dataNode;
    indexedNode.head = dataNode;
  }
  const key = dataNode.key;
  this.dataMap.set(key, dataNode);
};
```

需要注意的就是，如果当前权重节点没有缓存节点都话，那么，头尾节点都必须指向新插入的缓存节点才行。

到这儿，我们已经完成了万里长征的绝大部分了，最后来看一下更新操作。

每次访问了缓存，都需要更新这个缓存的权重，这个操作非常容易理解，将当前缓存节点从原来的权重节点上拿掉，权重增加 1，在新的权重节点上加入。

同样需要注意的问题就是新插入的权重节点是不一定存在的，因此需要确保存在才行，这就是为什么我们之前要封装获取指定权重节点的方法的理由。

```js
/**
 * 更新节点的权重
 * @param {CacheNode} dataNode
 */
LFUCache.prototype.refreshDataNodeWeight = function (dataNode) {
  const preKeyOfIndexed = dataNode.weight;
  // 获取到之前的索引节点
  let preIndexedNode = this.indexedMap.get(preKeyOfIndexed);
  // 删除之前索引节点上的数据节点
  this.removeIndexedNodeData(preIndexedNode, dataNode);
  const nowKeyOfIndexed = ++dataNode.weight;
  // 获取现在的索引节点
  const nowIndexedNode = this.getOrCreateIndexedNodeIfNotExist(nowKeyOfIndexed);
  // 确定索引节点存在，插入数据节点
  this.insertIndexedNodeData(nowIndexedNode, dataNode);
};
```

以上就是`LFU`缓存的实现全过程，请各位朋友注意区别`LRU`。

完整代码如下：

```js
/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
  /**
   * 缓存的容量
   * @type {number}
   */
  this.capacity = capacity;
  /**
   * 缓存的节点数
   * @type {number}
   */
  this.size = 0;
  /**
   * @type {Map<number, IndexedNode>}
   */
  this.indexedMap = new Map();
  /**
   * @type {Map<number, CacheNode>}
   */
  this.dataMap = new Map();
  /**
   * @type {IndexedNode | null}
   */
  this.startIndexedNode;
  /**
   * @type {IndexedNode | null}
   */
  this.endIndexedNode;
};

/**
 * 获取缓存
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  // 如果数据不存在
  if (this.capacity <= 0 || !this.dataMap.has(key)) {
    return -1;
  }
  let dataNode = this.dataMap.get(key);
  // 刷新数据的权重
  this.refreshDataNodeWeight(dataNode);
  return dataNode.data;
};

/**
 * 设置缓存
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
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
};

/**
 * 删除缓存中权重最小并且最久没有使用过的节点
 */
LFUCache.prototype.eject = function () {
  // 获取到权重最小的尾节点
  let tailNode = this.startIndexedNode.tail;
  // 删除权重最小的尾节点
  this.removeIndexedNodeData(this.startIndexedNode, tailNode);
};

/**
 * 更新节点的权重
 * @param {CacheNode} dataNode
 */
LFUCache.prototype.refreshDataNodeWeight = function (dataNode) {
  const preKeyOfIndexed = dataNode.weight;
  // 获取到之前的索引节点
  let preIndexedNode = this.indexedMap.get(preKeyOfIndexed);
  // 删除之前索引节点上的数据节点
  this.removeIndexedNodeData(preIndexedNode, dataNode);
  const nowKeyOfIndexed = ++dataNode.weight;
  // 获取现在的索引节点
  const nowIndexedNode = this.getOrCreateIndexedNodeIfNotExist(nowKeyOfIndexed);
  // 确定索引节点存在，插入数据节点
  this.insertIndexedNodeData(nowIndexedNode, dataNode);
};

/**
 * 获取指定权重的节点，若不存在，则创建
 * @param {number} weight
 */
LFUCache.prototype.getOrCreateIndexedNodeIfNotExist = function (weight) {
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
};

/**
 * 删除indexedNode
 * @param {IndexedNode} indexedNode
 */
LFUCache.prototype.removeIndexedNode = function (indexedNode) {
  const isStart = this.startIndexedNode === indexedNode;
  const isEnd = this.endIndexedNode === indexedNode;
  // 只有一个节点
  if (isStart && isEnd) {
    this.endIndexedNode = this.startIndexedNode = null;
  } else if (isStart) {
    // 2个节点以上。删除头节点
    const afterNode = this.startIndexedNode.next;
    this.startIndexedNode.next = null;
    afterNode.prev = null;
    this.startIndexedNode = afterNode;
  } else if (isEnd) {
    // 2个节点以上，删除尾节点
    const beforeNode = this.endIndexedNode.prev;
    this.endIndexedNode.prev = null;
    beforeNode.next = null;
    this.endIndexedNode = beforeNode;
  } else {
    // 如果即不删除头节点，也不删除尾节点，至少是3个节点以上
    const beforeNode = indexedNode.prev;
    const afterNode = indexedNode.next;
    indexedNode.prev = null;
    indexedNode.next = null;
    beforeNode.next = afterNode;
    afterNode.prev = beforeNode;
  }
  const weight = indexedNode.weight;
  this.indexedMap.delete(weight);
};

/**
 * 将indexedNode插入在refNode之后
 * @param {IndexedNode} indexedNode
 * @param {IndexedNode | null} refNode
 */
LFUCache.prototype.insertIndexedNode = function (indexedNode, refNode = null) {
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
    if (indexedNode.weight < this.startIndexedNode.weight) {
      indexedNode.next = this.startIndexedNode;
      this.startIndexedNode.prev = indexedNode;
      this.startIndexedNode = indexedNode;
    } else {
      this.endIndexedNode.next = indexedNode;
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
};

/**
 * 删除indexedNode上的dataNode
 * @param {IndexedNode} indexedNode
 * @param {CacheNode} dataNode
 */
LFUCache.prototype.removeIndexedNodeData = function (indexedNode, dataNode) {
  if (!indexedNode || !dataNode) {
    console.warn("indexed node or data node is null");
    return;
  }
  const isStart = indexedNode.head === dataNode;
  const isEnd = indexedNode.tail === dataNode;
  if (isStart && isEnd) {
    this.removeIndexedNode(indexedNode);
  } else if (isStart) {
    const afterNode = indexedNode.head.next;
    indexedNode.head.next = null;
    afterNode.prev = null;
    indexedNode.head = afterNode;
  } else if (isEnd) {
    const beforeNode = indexedNode.tail.prev;
    indexedNode.tail.prev = null;
    beforeNode.next = null;
    indexedNode.tail = beforeNode;
  } else {
    const beforeDataNode = dataNode.prev;
    const afterDataNode = dataNode.next;
    dataNode.prev = null;
    dataNode.next = null;
    beforeDataNode.next = afterDataNode;
    afterDataNode.prev = beforeDataNode;
  }
  // 删除key上面的内容
  const key = dataNode.key;
  this.dataMap.delete(key);
};

/**
 * 向indexedNode上插入dataNode
 * @param {IndexedNode} indexedNode
 * @param {CacheNode} dataNode
 */
LFUCache.prototype.insertIndexedNodeData = function (indexedNode, dataNode) {
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
    indexedNode.head.prev = dataNode;
    indexedNode.head = dataNode;
  }
  const key = dataNode.key;
  this.dataMap.set(key, dataNode);
};
```
