## 栈的应用之逆序

在实际开发中，我们一旦遇到逆序的问题，可以想当然的先思考一下是否可以用栈进行处理。

### [两数相加](https://leetcode.cn/problems/add-two-numbers-ii/)

#### 描述

给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

<img src="https://pic.leetcode-cn.com/1626420025-fZfzMX-image.png" />

#### 思路分析

因为是逆序，所以我们会想到用栈，分别遍历两个链表，用两个栈存储对应的节点，则问题转化为[合并 2 个有序数组]()。

#### 算法实现

链表节点定义如下：

```ts
interface ListNode<T> {
  next: ListNode<T> | null;
  val: T;
}
```

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const stack1 = [];
  const stack2 = [];
  let node1 = l1;
  let node2 = l2;
  while (node1 && node2) {
    stack1.push(node1);
    stack2.push(node2);
    node1 = node1.next;
    node2 = node2.next;
  }

  while (node1) {
    stack1.push(node1);
    node1 = node1.next;
  }

  while (node2) {
    stack2.push(node2);
    node2 = node2.next;
  }

  let needIncrease = false;
  let newHead = null;
  while (stack1.length && stack2.length) {
    const num1Node = stack1.pop();
    const num2Node = stack2.pop();
    let val = num1Node.val + num2Node.val + (needIncrease ? 1 : 0);
    needIncrease = false;
    if (val >= 10) {
      val = val - 10;
      needIncrease = true;
    }
    const tempNode = {
      val,
      next: null,
    };
    if (!newHead) {
      newHead = tempNode;
    } else {
      tempNode.next = newHead;
      newHead = tempNode;
    }
  }
  while (stack1.length) {
    const num1Node = stack1.pop();
    let val = num1Node.val + (needIncrease ? 1 : 0);
    needIncrease = false;
    if (val >= 10) {
      val = val - 10;
      needIncrease = true;
    }
    const tempNode = {
      val,
      next: null,
    };
    if (!newHead) {
      newHead = tempNode;
    } else {
      tempNode.next = newHead;
      newHead = tempNode;
    }
  }
  while (stack2.length) {
    const num2Node = stack2.pop();
    let val = num2Node.val + (needIncrease ? 1 : 0);
    needIncrease = false;
    if (val >= 10) {
      val = val - 10;
      needIncrease = true;
    }
    const tempNode = {
      val,
      next: null,
    };
    if (!newHead) {
      newHead = tempNode;
    } else {
      tempNode.next = newHead;
      newHead = tempNode;
    }
  }
  if (needIncrease) {
    const tempNode = {
      val: 1,
      next: null,
    };
    tempNode.next = newHead;
    newHead = tempNode;
  }
  return newHead;
};
```

### 有权无向图求最短路径

TODO
