## 链表

链表，是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。

链表由一系列结点（链表中每一个元素称为结点）组成，结点可以在运行时动态生成。每个结点包括两个部分：一个是存储数据元素的数据域，另一个是存储下一个结点地址的指针域。

一般我们说链表都是指的是单向链表。

## 链表的一般数据结构定义

```TypeScript
interface LinkedListNode<T> {
  /**
   * 链表的数据域
   */
  data: T;
  /**
   * 链表的后继节点域
   */
  next: LinkedListNode<T> | null;
}
```

## 链表的操作

对于链表的操作，我个人感觉最重要的两个操作就是初始化和遍历。对于链表的操作有些同学喜欢在头放一个空节点，这是属于个人的编程习惯，而我一般不喜欢（可不是出于节约内存的想法哦，哈哈哈），因此，选择一个适合你的习惯即可。以下的所有代码实现均不包含空的头结点。

### 初始化

初始化，即把一堆数据构造成链表。对于链表的初始化一般有两种操作：即`头插法`和`尾插法`。
头插法：用一个变量指向已有链表的头结点，每次新来的节点都插在头结点的前面，再让这个变量指向新插入的节点，因此头插法构建出的链表数据的顺序和输入的顺序是`相反`的。

头插法插入节点的过程：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/009b4f55ee914c4f98db38418cfdd3d2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />

```JavaScript
/**
 * 以头插法初始化链表
 * @param {Array<number>} arr 用于初始化链表的数据
 */
function initialize(arr) {
  // 如果图中第一步
  let head = null;
  // 此例中无用，仅用于阐述问题
  let tail = null;
  arr.forEach((val) => {
    const node = createNode(val);
    // 如果是空链表的话，直接让头结点指针指向第一个节点
    if (head == null) {
      // 如图第二步
      head = node;
      // 此例中无用，仅用于阐述问题
      tail = node;
    } else {
      //先让新来的节点指向head节点，如图第三步
      node.next = head;
      // 再让head指针指向最新的节点，如图第四步
      head = node;
    }
  });
  return head;
}
```

尾插法：用一个变量指向已有链表的尾结点，每次新来的节点都插在尾结点的后面，再让这个变量指向新插入的尾结点，因此尾插法构建出的链表数据的顺序和输入的顺序是`相同`的。

尾插法插入节点的过程：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f325cca564342e09a54e6b7b8dd6286~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />

```javascript
/**
 * 以尾插法初始化链表
 * @param {Array<number>} arr 用于初始化链表的数据
 */
function initialize(arr) {
  // 如图第一步
  let head = null;
  let tail = null;
  arr.forEach((val) => {
    const node = createNode(val);
    if (head == null) {
      // 如果是空链表的话，直接让头结点指针和尾结点指针指向第一个节点，对应图中第一步
      head = node;
      tail = node;
    } else {
      // 让尾结点的后继指针指向新来的节点, 如图第三步
      tail.next = node;
      // 让尾节点指针指向最后一个节点，如图第四步
      tail = node;
    }
  });
  return head;
}
```

我个人编程习惯喜欢用第二种，但是即使是使用头插法，你也可以多用一个变量来记住链表的尾结点，这样的好处就是如果某个时刻你需要在尾部插入的话，可以直接用尾节点指针而不用再去遍历了。

### 遍历

链表的遍历几乎可以说是一种标准范式了，这是对于链表一定得掌握的知识。对于单向链表，只要给头指针就可以完成遍历。

**在遍历链表时，我们有时候会申明一个前驱节点，这样可以使得在遍历的过程中，既能找到当前节点，又可以找到当前节点的前驱节点，在某些时候非常好用，这也是一个必须掌握的编程技巧。**

需要注意的是在遍历链表的过程中不要修改头指针，因为一旦修改了头指针就找不回来了，万一需要用到头指针，那代码又得重新设计。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/796665b6d0cf43cea87d4ff816467fc0~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />

链表遍历的复杂度为`O(n)`;

```JavaScript
/**
 * 遍历链表
 * @param {Node<number>} head 链表头指针
 */
function traverse(head) {
  let node = head;
  // pre在本例中无用，仅用于说明这是一种编程技巧
  let pre = null;
  // 如果当前节点指向空 （对于空链表，开始就直接指向空）
  while (node) {
    console.log(node);
    // 让pre滞后，这样可以永远保证pre指向node的前一个节点（如果node是null,pre指向最后一个节点，如果node是第一个节点或者链表是空表，pre指向null）
    pre = node;
    node = node.next;
  }
}
```

### 插入

对于链表的操作操作一定要谨慎，否则容易丢失后继节点或者使得链表的节点指向表现非预期。

我们演示一下在表中部插入节点的场景，其流程如下：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3694abb3f3e840579db74ade7e6d9bfe~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06784c2bc19b4ff7a4296090a5df5adf~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />

伪代码描述即：`newNode.next = node; pre.next = newNode;` 这两行代码一定不能交换。

链表插入的平均时间复杂度为：`O(n)`;

```javascript
/**
 * 在链表中指定的K位置插入节点, 如果K小于1，则插在头部，如果K大于链表的长度，则直接插在尾部
 * @param {Node<number>} head 链表头
 * @param {number} val 节点值
 * @param {number} K 插入的位置,K为节点数,不是索引
 */
function insert(head, val, K) {
  const newNode = createNode(val);
  // 如果需要插在头部的话
  if (K < 1) {
    newNode.next = head;
    head = newNode;
    return head;
  }
  let node = head;
  // 申明一个空指针，因为其滞后node一个表结点，主要是用来记录上一个节点
  let pre = null;
  // 申明一个计数器，用于标记已经遍历的节点的个数
  let counter = 0;
  let inserted = false;
  while (node) {
    counter++;
    // 如果找到了合适的插入位置，插入完成以后就没有继续循环的必要了
    if (counter === K) {
      // 必须先用一个临时变量将其记住，否则会丢失后继节点
      let nextNode = node.next;
      // 插入新的节点
      node.next = newNode;
      newNode.next = nextNode;
      // 标记插入完成
      inserted = true;
      break;
    }
    // 先把当前这个节点记住，然后向后迭代
    pre = node;
    node = node.next;
  }
  // 如果已经插入了的哈，就不用再管什么事儿了
  if (inserted) {
    return head;
  }
  // 如果K大于等于链表的长度的话，就直接插在链表尾部即可
  if (counter < K && pre) {
    // 此刻的node已经是null了，而pre指针指向链表的最后一个节点
    pre.next = newNode;
  } else {
    // 如果链表是空表，之前的循环一次都没有执行的，那么直接让head指向新来的节点即可
    head = newNode;
  }
  return head;
}
```

### 查找

查找主要分为按值查找或者按位置查找。 查找的思路和遍历类似。

查找的平均算法复杂度为`O(N)`。

```JavaScript
/**
 * 根据索引查找链表节点
 * @param {Node<number>} head 链表头结点
 * @param {number} idx 目标索引
 */
function findIndex(head, idx) {
  let node = head;
  let counter = 0;
  // 找到表尾没有找到目标索引 或者 找到了目标索引 结束循环
  while (node && counter < idx) {
    counter++;
    node = node.next;
  }
  return counter === idx ? node : null;
}

/**
 * 根据节点值查找节点
 * @param {Node<number>} head 链表头结点
 * @param {number} val 目标节点值
 */
function find(head, val) {
  let node = head;
  // 找到节点值或遍历到链表结束，终止循环
  while (node && node.val !== val) {
    node = node.next;
  }
  return node;
}
```

### 删除
链表的删除相对来说比较简单，直接拿掉特定节点即可，这一点，相对于数组来说有优势的，因为在数组删除元素后，需要把元素统统往前挪动一位，然后才能把size减少，当**数据的每个单元是一个复杂结构的时候，这个时间的开销可是不能忽略的**。

链表节点的删除过程：
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dbfba072c0b45b8b44c86591b4cd0f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />
<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3eae3f2bfcf3450a8732528c40b32b55~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />

```javascript
/**
 * 从链表中删除值为val的节点
 * @param {Node<number>} head 链表的头结点
 * @param {number} val 待删除的值
 */
function remove(head, val) {
  if (!head) {
    console.warn("can not remove element from empty linked list");
    return;
  }
  let node = head;
  let pre = null;
  while (node) {
    // 找到了目标节点，需要结束循环
    if (node.value != val) {
      break;
    }
    pre = node;
    node = node.next;
  }
  // 如果pre存在的话，说明用户删除的不是头结点
  if (pre) {
    // 如图第二步
    pre.next = node.next;
    // 如图第三步
    node.next = null;
    node = null;
  } else {
    // 删除头结点时，首先得用临时变量把第二个节点先记下来（哪怕它不存在）
    let nextHead = head.next;
    // 解除头结点对第二个节点的引用
    head.next = null;
    // 让头结点指针指向下一个节点
    head = nextHead;
  }
  return head;
}
```

## 结语

链表相对于数组还有一个优势是在**内存足够的前提下**，其长度是可以**无限增长**的。链表在初始化的的时候无需知道表长，而数组必须确定表长（此性质不考虑JavaScript语言），对于其它语言来说（C#，Java等）数组的扩容代价相对较大，**首先需要向系统申请更长的连续空间（在某些情况下是可能申请不到的），然后需要把旧数据拷贝到新数组里面去，然后再将原来的数组释放，而在每个数据项比较大的情况下，这个拷贝时间是不能被忽略的。**

链表平均算法复杂度与数组的比较如下：
| 操作                 | 数组 | 链表 |
| -------------------- | ---- | ---- |
| 随机访问             | `O(1)` | `O(N)` |
| 插入(不考虑前置查找)                 |`O(N)` | `O(1)` |
| 查找                 | `O(N)` | `O(N)` |
| 删除(不考虑前置查找) | `O(N)` | `O(1)` |

但是如果需要对其数据进行排序的话，有些排序算法是不能直接用的，在实际开发中我们需要根据需求选择链表还是数组。
