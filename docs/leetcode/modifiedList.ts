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

interface ListNode {
  val: number;
  next: ListNode | null;
}

export function modifiedList(
  nums: number[],
  head: ListNode | null
): ListNode | null {
  const set: Set<number> = new Set(nums);
  let temp: ListNode | null = head;
  let node: ListNode | null = head;
  let prev: ListNode | null = null;
  while (node) {
    // 如果当前节点存在于数组中
    if (set.has(node.val)) {
      // 如果头结点需要被删除
      if (temp === node) {
        // 更新头节点
        temp = node.next;
        // 因为头结点被更新了，导致prev也没了
        prev = null;
        // 将node指向新的节点
        node = temp;
      } else {
        // 直接删除
        prev!.next = node.next;
        // 如果只是最后一个节点了
        if (node.next) {
          node = node.next;
        } else {
          node = null;
        }
      }
    } else {
      prev = node;
      node = node.next;
    }
  }
  return temp;
}
