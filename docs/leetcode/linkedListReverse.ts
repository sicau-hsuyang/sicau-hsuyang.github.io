interface LinkedNode {
  val: number;

  next: LinkedNode | null;
}

export function reverse(head: LinkedNode | null): LinkedNode | null {
  if (!head) {
    return null;
  }
  // 取下头结点
  const node = head;
  // 将剩余的串记下来，因为马上就要把原来的头结点拿来拼接了
  const remainHead = head.next;
  head.next = null;
  // 递归调用得到的反转结果，此刻得到的是一个头结点，而实际上我们需要的是尾节点，因此需要在这个上面找到尾节点
  const reversedHead = reverse(remainHead);
  // 如果当前链表只有一个节点，就没必要再继续进行了，把一个null指向一个头结点？没意义啊，因此后面的操作就可以不用做了
  if (!remainHead) {
    return node;
  }
  let reverseNode = reversedHead;
  let reversedPrev: LinkedNode | null = null;
  while (reverseNode) {
    reversedPrev = reverseNode;
    reverseNode = reverseNode.next;
  }
  // 如果链表只有一个节点的时候，reversedPrev就是null，因此需要进行判断
  if (reversedPrev) {
    reversedPrev.next = node;
  }
  return reversedHead;
}
