## 队列

队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。（copy 自百度百科）

由于每次我们要么从队尾插入元素，要么从队首删除元素，因此，队列具备一个重要的性质：

`先入先出`。

## 队列的通用数组实现

```ts
/**
 * 队列类
 */
class Queue<T> {
  private data: T[] = [];

  get size(): number {
    return this.data.length;
  }

  /**
   * 入队一个元素
   * @param ele
   */
  public enqueue(ele: T) {
    // 我们把数组的尾作为队首，数组的头作为队尾
    this.data.length++;
    for (let i = this.data.length - 1; i >= 1; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[0] = ele;
  }

  /**
   * 出队一个元素
   */
  public dequeue() {
    if (this.isEmpty()) {
      throw new Error("can not dequeue from an empty queue");
    }
    let len = this.size;
    // 获取数组中最后一个元素
    let ele = this.data[len - 1];
    // 将数组的长度递减
    this.data.length--;
    return ele;
  }

  /**
   * 队列是否为空
   * @returns
   */
  public isEmpty() {
    return this.data.length === 0;
  }
}
```

## 队列的通用链表实现

```TypeScript
/**
 * 队列元素的节点元素定义，必须使用双向链表，便于我们查找前驱和后继元素
 */
interface LinkedListNode<T> {
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;
  data: T;
}

class Queue<T> {
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
    if(head) {
      // 解开第一个节点的后继节点的前驱节点
      head.prev = null;
    }
    // 让队首元素指向新的队首元素
    this.head = head;
    // 队列长度递减
    this.length--;
    // 将链表指针置空，若队列空
    if(this.length == 0) {
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
```

## 在 JavaScript 中使用队列

JS 的数组同时具备栈和队列的特性，假设我们每次仅使用数组的`unshift`和`push`方法，数组即队列。

```JavaScript
const queue = [];
queue.push(1); //[1]
queue.push(12); //[1, 12]
queue.push(123); //[1, 12, 123]

let front = queue.unshift() // front 为1
front = queue.unshift() // front为12
front = queue.unshift() // front为123, 此时队列已空
```

## 队列的复杂度问题

对于 JavaScript 来说，如果使用`数组`实现队列，我们的入队操作看起来是`O(1)`，为什么要说“看起来”呢，因为对于 JS 来说数组长度是可变的，我们只是执行了一个数组的基本操作，并没有什么遍历之类的操作。但是对于如`C#`，`Java`这类语言，数组在初始化的时候，必须首先确定数组的长度，假如你一直不停的入队，但是此刻数组已经没有空间容纳新来的内容了，此刻，我们便需要进行`扩容`，即**申请一个更大的连续内存空间，然后把旧数组的内容拷贝到这块内容上来**，此刻便会有一个`O(n)`的时间复杂度。

如果使用`链表`实现，由于我们每次的操作总是队首或队尾元素，**链表的增删操作的时间复杂度为`O(1)`**，因此，这个实现在实际开发中有重要的意义。

## 队列的应用

在前端面试中，我们被问的最多的便是 JavaScript 的`事件队列`，这便是队列的实际应用场景之一，同类应用还有`消息队列`。

另外，在[广度优先搜索](/data-structure/bfs/)中，我们也需要使用队列。
