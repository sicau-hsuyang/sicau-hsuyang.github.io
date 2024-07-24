/**
 * Definition for node.
 * class Node {
 *     val: number
 *     next: Node | null
 *     constructor(val?: number, next?: Node) {
 *         this.val = (val===undefined ? 0 : val);
 *         this.next = (next===undefined ? null : next);
 *     }
 * }
 */

interface Node {
  val: number;
  next?: Node | null;
}

export function insert(head: Node | null, insertVal: number): Node | null {
  const insertNode: Node = {
    val: insertVal,
    next: null,
  };
  // 没有节点
  if (head === null) {
    head = insertNode;
    head.next = head;
    return head;
  }
  // 多个节点
  else {
    // 如果值相等的话，直接插，了事
    if (insertVal === head.val) {
      const nextNode = head.next;
      insertNode.next = nextNode;
      head.next = insertNode;
    } else {
      let minNode: Node;
      let minVal = Infinity;
      let maxNode: Node;
      let maxVal = -Infinity;
      // let preNode: Node | null = null;
      let node = head;
      // const map: Map<Node, Node> = new Map();
      do {
        if (maxVal < node.val) {
          maxNode = node;
          maxVal = node.val;
        }
        if (minVal >= node.val) {
          minNode = node;
          minVal = node.val;
        }
        // preNode = node;
        node = node.next as Node;
        // 建立前置指针的引用
        // map.set(node, preNode);
      } while (node != head);
      // // 设置最后的一个引用关系
      // map.set(head, preNode);
      // 链表中全部都是一个值，直接插在后面
      if (minVal === maxVal) {
        const nextNode = head.next;
        insertNode.next = nextNode;
        head.next = insertNode;
      } else {
        // let tempMinNode = map.get(minNode!);
        // 向前修正前面的节点
        // while (tempMinNode!.val === minVal) {
        //   preMin = tempMinNode!;
        //   tempMinNode = map.get(tempMinNode!);
        // }
        // if (preMin) {
        //   minNode = preMin;
        // }
        // 向后修正最大的节点
        let prevMax: Node | null = null;
        let tempMaxNode: Node = maxNode!.next as Node;
        while (tempMaxNode.val === maxVal) {
          prevMax = tempMaxNode;
          tempMaxNode = tempMaxNode.next as Node;
        }
        // 修正maxNode
        if (prevMax !== null) {
          maxNode = prevMax;
        }
        minNode = maxNode!.next as Node;
        let s = minNode!;
        let e = maxNode!;
        // 插入的是最小值
        if (insertVal <= minVal) {
          insertNode.next = minNode!;
          maxNode!.next = insertNode;
        }
        //插入的是最大值
        else if (insertVal >= maxVal) {
          maxNode!.next = insertNode;
          insertNode.next = minNode!;
        } else {
          let prev: Node | null = null;
          while (s.val < insertVal && s != e) {
            prev = s;
            s = s.next as Node;
          }
          prev!.next = insertNode;
          insertNode.next = s;
        }
      }
    }
  }
  return head;
}
