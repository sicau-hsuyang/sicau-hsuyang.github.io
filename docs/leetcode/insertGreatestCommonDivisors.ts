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

export function getGcd(a: number, b: number) {
  let gcd = a % b;
  while (gcd !== 0) {
    a = b;
    b = gcd;
    gcd = a % b;
  }
  return b;
}

export function insertGreatestCommonDivisors(
  head: ListNode | null
): ListNode | null {
  if (!head) {
    return head;
  }
  let node = head;
  let next = node.next;
  let newHead: ListNode | null = node;
  while (node && next) {
    const gcd = getGcd(node.val, next.val);
    const gcdNode: ListNode = {
      val: gcd,
      next: null,
    };
    node.next = gcdNode;
    gcdNode.next = next;
    node = next;
    next = node.next;
  }
  return newHead;
}
