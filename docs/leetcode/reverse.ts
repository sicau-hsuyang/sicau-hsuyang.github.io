interface LinkedNode {
  next: MyNode;

  val: number;
}

type MyNode = LinkedNode | null;

export function reverse(node: MyNode): MyNode {
  if (!node) {
    return null;
  }
  const nextNode = node.next;
  node.next = null;
  let head = reverse(nextNode);
  if (!head) {
    head = node;
  } else {
    let t = head;
    while (t.next) {
      t = t.next;
    }
    t.next = node;
  }
  return head;
}
