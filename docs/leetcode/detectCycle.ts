/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
export var detectCycle = function (head) {
  let slow = head;
  let fast = head;
  while (slow && fast && fast.next) {
    if (fast === slow && fast !== head) {
      break;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  if (fast === null || fast.next == null) {
    return null;
  }
  fast = head;
  while (slow != fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
};
