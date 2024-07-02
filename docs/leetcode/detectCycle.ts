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
  while (slow && fast) {
    // console.log(slow.val, fast.val);
    slow = slow.next;
    fast = fast.next ? fast.next.next : null;
    if (slow === fast && slow != null) {
      return slow;
    }
  }
  return null;
};
