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
  let countA = 0;
  let node = headA;
  while (node) {
    countA++;
    node = node.next;
  }
  let countB = 0;
  node = headB;
  while (node) {
    countB++;
    node = node.next;
  }
  let nodeA = headA;
  let nodeB = headB;
  if (countA > countB) {
    let d = countA - countB;
    while (d > 0) {
      d--;
      nodeA = nodeA.next;
    }
  } else if (countB > countA) {
    let d = countB - countA;
    while (d > 0) {
      d--;
      nodeB = nodeB.next;
    }
  }
  while (nodeA && nodeB && nodeA !== nodeB && nodeA.next !== nodeB.next) {
    nodeA = nodeA.next;
    nodeB = nodeB.next;
  }
  if (nodeA === nodeB && nodeA) {
    return nodeA;
  }
  return nodeA && nodeB && nodeA.next === nodeB.next ? nodeA.next : null;
};
