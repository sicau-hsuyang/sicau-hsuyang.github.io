import { arrToLinkedList } from "leetcode-test-utils";
import { reverse } from "./linkedListReverse";

describe("linkedListReverse", () => {
  it("case 1", () => {
    const list1 = arrToLinkedList([1, 2, 3]);
    const res = reverse(list1 as any)
    console.log(res)
  });
});
