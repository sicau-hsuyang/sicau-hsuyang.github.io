/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// import { GeneralLinkedNode } from "leetcode-test-utils";

interface ListNode {
  val: number;
  next?: ListNode | null;
}

export function removeNodes(head: ListNode): ListNode {
  let prev: ListNode | undefined | null = null;
  let node: ListNode | undefined | null = head;
  let newHead = node;
  const map: Map<ListNode, ListNode | null> = new Map();
  while (node) {
    if (prev && prev.val < node.val) {
      // 向前面找比当前节点小的值的节点
      let prevNode = map.get(prev);
      // 退出的时候有两种可能1，找到头了，2还没有找到头就找到了比node大的节点
      while (prevNode && prevNode.val < node.val) {
        prevNode = map.get(prevNode);
      }
      // 说明之前的节点全部是比当前节点小的，全部扔掉
      if (!prevNode) {
        newHead = node;
        // 解除当前节点的前一个节点的引用
        prev.next = null;
        // 去掉之前所建立的引用关系
        map.clear();
        // 建立一个新的关系
        map.set(node, null);
      } else {
        // 说明只需要删除部分节点
        prevNode.next = node;
        prev.next = null;
        prev = prevNode;
        map.set(node, prev);
      }
      prev = node;
      node = node.next;
      if (node) {
        map.set(node, prev);
      }
    } else {
      prev = node;
      node = node.next;
      if (node) {
        map.set(node, prev);
      }
    }
  }
  return newHead;
}
