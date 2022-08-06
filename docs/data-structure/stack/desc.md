## 栈

栈（`stack`）又名堆栈，它是一种运算受限的线性表。限定仅在表尾进行插入和删除操作的线性表。这一端被称为栈顶，相对地，把另一端称为栈底。向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。(copy 自百度百科)

因此，栈具备一个重要的性质：`后入先出`。

<div align="center">
  <img :src="$withBase('/stack/stack.webp')" alt="栈"  />
</div>

## 栈的通用数组实现

```TypeScript
class Stack<T> {
  private data: T[] = [];

  get size(): number {
    return this.data.length;
  }

  /* 获取栈顶元素 */
  get top(): T | null {
    return this.isEmpty() ? null : this.data[this.size-1];
  }

  /**
   * 压栈
   * @param ele
   */
  push(ele: T) {
    let length = this.data.length;
    // 让数组长度增加
    this.data.length++;
    // 将新加入的元素放在最后面
    this.data[length] = ele;
  }

  /**
   * 退栈
   * @returns
   */
  pop() {
    if (this.isEmpty()) {
      throw new Error("can't pop from an empty stack");
    }
    let length = this.data.length;
    // 取出最后一个元素
    let ele = this.data[length - 1];
    // 数组长度-1
    this.data.length--;
    return ele;
  }

  /**
   * 判断栈是否为空
   * @returns
   */
  isEmpty() {
    return this.data.length === 0;
  }
}
```

## 栈的通用链表实现（使用 TypeScript ）

```TypeScript

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
  /* 获取栈顶元素 */
  public get top(): T | null {
    return this.isEmpty() ? null : this.head.data;
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
    // 栈长度增加
    this.length++;
    // 如果一个元素都没有，直接让head指向这个节点
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
    // 栈中的元素
    let ele = this.head!.data;
    // 解开第一个节点的后继节点
    this.head!.next = null;
    // 解开第一个节点的后继节点的前驱节点
    head!.prev = null;
    // 让栈首元素指向新的栈首元素
    this.head = head;
    // 栈长度递减
    this.length--;
    return ele;
  }

  /**
   * 栈是否为空
   * @returns
   */
  public isEmpty() {
    return this.length === 0;
  }
}

```

## 栈的复杂度问题

对于 JavaScript 来说，如果使用`数组`实现栈，我们的入栈操作看起来是`O(1)`，为什么要说“看起来”呢，因为对于 JS 来说数组长度是可变的，我们只是执行了一个数组的基本操作，并没有什么遍历之类的操作。但是对于如`C#`，`Java`这类语言，数组在初始化的时候，必须首先确定数组的长度，假如你一直不停的入栈，但是此刻数组已经没有空间容纳新来的内容了，此刻，我们便需要进行`扩容`，即**申请一个更大的连续内存空间，然后把旧数组的内容拷贝到这块内容上来**，此刻便会有一个`O(n)`的时间复杂度。

如果使用`链表`实现，由于我们每次的操作总是顶端的元素，**链表的增删操作的时间复杂度为`O(1)`**，因此，这个实现在实际开发中有重要的意义。

## 在 JavaScript 中使用栈

JS 的数组同时具备栈和队列的特性，假设我们每次仅使用数组的`push`和`pop`方法，数组即栈。

```JavaScript
const queue = [];
queue.push(1); //[1]
queue.push(12); //[1, 12]
queue.push(123); //[1, 12, 123]

let tail = queue.pop() // tail 为123
tail = queue.pop() // tail为12
tail = queue.pop() // tail为1, 此时栈已空
```

## 栈的应用

系统的堆栈就是栈的应用场景之一；

在深度优先搜索中，我们也需要使用栈用来记住返回的路径；

在我们需要逆序的场景时，我们也需要使用栈，如`无权图的单源最短路`问题。

在词法分析时，我们也需要栈，如`babel`将我们写在 vue 组件中 `template` 的内容解析为`AST`；
