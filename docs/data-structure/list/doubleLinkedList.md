## 双向链表

由于单向链表只知道后继节点，当我们需要向前查找的时候，是及其不便的，而双向链表相对于链表来说，多了一个`前驱域`，我们在操作的过程中就可以快速的找到当前节点的前驱节点。因为多了一个指针域的关系，所以双向链表的内存占用会稍稍的多一些。

## 双向链表的一般数据结构定义

```TypeScript
interface DoubleLinkedListNode<T> {
  /**
   * 链表的数据域
   */
  data: T;
  /**
   * 链表的后继节点域
   */
  next: DoubleLinkedListNode<T> | null;
  /**
   * 链表的前驱节点域
   */
  prev: DoubleLinkedListNode<T> | null;
}
```

## 应用场景

[实现自动扩容队列](/data-structure/queue/desc.md)；

[实现自动扩容的栈](/data-structure/stack/desc.md)；

`LRU-Cache`等；

:::tip 编程技巧
在任何想频繁的操作前驱节点时，都应该考虑使用双向链表；
:::
