import { arrToLinkedList } from "leetcode-test-utils";
import { detectCycle } from "./detectCycle";

describe("detectCycle", () => {
  it("case 1", () => {
    const list = arrToLinkedList([3, 2, 0, -4]) as any;
    let prev: any = null;
    let node = list;
    while (node) {
      prev = node;
      node = node.next;
    }
    prev.next = list.next;
    const tail = detectCycle(list);
    console.log(tail)
  });
});
