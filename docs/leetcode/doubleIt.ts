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

export function doubleIt(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }
  let node: ListNode | null = head;
  const stack: number[] = [];
  while (node) {
    stack.push(node.val);
    node = node.next;
  }
  let plusOne = false;
  let newHead: ListNode | null = null;
  while (stack.length) {
    const num = stack.pop()!;
    const sum = num * 2;
    const listNode: ListNode = {
      val: -1,
      next: null,
    };
    let val = sum;
    if (plusOne) {
      val++;
      plusOne = false;
    }
    if (val >= 10) {
      plusOne = true;
      val -= 10;
    }
    listNode.val = val;
    if (newHead === null) {
      newHead = listNode;
    } else {
      listNode.next = newHead;
      newHead = listNode;
    }
  }
  if (plusOne) {
    const newNode = {
      val: 1,
      next: newHead,
    };
    newHead = newNode;
  }
  return newHead;
}
