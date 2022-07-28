## 从链表中删去总和值为零的连续节点

给你一个链表的头节点 `head`，请你编写代码，反复删去链表中由 总和值为 `0` 的连续节点组成的序列，直到不存在这样的序列为止。

删除完毕后，请你返回最终结果链表的头节点。

> 输入：head = [1,2,-3,3,1]
> 输出：[3,1]
> 提示：答案 [1,2,1] 也是正确的。
> <br/> > <br/>
> 输入：head = [1,2,3,-3,4]
> 输出：[1,2,4]

这题难就难在我们操作的对象是个链表，如果是数组的话，一下就变得特别简单了，从第一个数开始出发，遇到 0 可以直接删除，或者总和为 0 的时候，也可以把之前累加的都删除掉。如果一直加到最后都没有和为 0 的结果，那么就从第二个出发，以此类推，直到遍历到最后一个数。

关键是现在换成了链表，不过想一下，还是可以把一个链表变成像数组那样操作，那么自然而然就可以联系到用哈希表来解决这个问题。

首先，先遍历链表建立哈希，得到一个类数组对象，接着开始遍历这个类数组对象，求和，如果遇到和为 0 了，就把之前的节点全部丢弃，对剩余的节点递归进行上述操作。

算法实现如下：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeZeroSumSublists = function (head) {
  if (!head) {
    return null;
  }
  let newHead = head;
  let preNode = null;
  // 根据链表生成映射
  const posMap = makeHash(head);
  for (let i = 0; posMap[i]; i++) {
    let currentNode = posMap[i];
    let node = currentNode;
    let sum = 0;
    // 对从当前节点开始到最后一个节点求和，若为0，则丢弃这期间的所有节点，并且递归的进行删除操作
    while (node) {
      sum += node.val;
      if (sum == 0) {
        if (preNode === null) {
          head = node.next;
        } else {
          preNode.next = node.next;
        }
        return removeZeroSumSublists(head);
      } else {
        node = node.next;
      }
    }
    // 没有和为0的连续节点，将当前节点保留下来
    preNode = currentNode;
  }

  return newHead;
};

/**
 * 将链表生成类数组对象
 * @param {ListNode} head
 * @returns
 */
var makeHash = function (head) {
  let node = head;
  let map = Object.create(null);
  let counter = 0;
  while (node) {
    map[counter] = node;
    node = node.next;
    counter++;
  }
  map.length = counter;
  return map;
};
```
