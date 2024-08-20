/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let slow = headA;
  let fast = headB;
  while (slow && fast && fast.next && slow !== fast) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (slow == null || fast == null) {
    return null;
  }
  fast = headB;
  while (slow != fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
};
