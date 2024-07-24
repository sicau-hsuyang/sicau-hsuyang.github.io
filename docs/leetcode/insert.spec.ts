import { arrToLinkedList } from "leetcode-test-utils";
import { insert } from "./insert";

describe("insert", () => {
  it("case 1", () => {
    const arr = [1, 3, 5];
    const list = arrToLinkedList(arr);
    list!.next!.next!.next = list;
    const head = list?.next;
    const res = insert(head as any, 2);
    console.log(res);
  });

  it("case 2", () => {
    const arr = [1, 3, 5];
    const list = arrToLinkedList(arr);
    list!.next!.next!.next = list;
    const head = list;
    const res = insert(head as any, 4);
    console.log(res);
  });

  it("case 3", () => {
    const arr = [3, 4, 5, 3, 3, 3];
    const list = arrToLinkedList(arr);
    list!.next!.next!.next!.next!.next!.next = list;
    const head = list;
    const res = insert(head as any, 2);
    console.log(res);
  });
});
