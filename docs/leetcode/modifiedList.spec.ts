import { arrToLinkedList } from "leetcode-test-utils";
import { modifiedList } from "./modifiedList";

describe("modifiedList", () => {
  it("case 1", () => {
    const nums = [1, 2, 3, 4, 5],
      arr = [1, 2, 3, 9, 4, 5];
    const list = arrToLinkedList(arr) as any;
    modifiedList(nums, list as any);
  });
});
