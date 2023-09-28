import { arrToBinaryTree } from "leetcode-test-utils";
import { kthLargestLevelSum } from "./kthLargestLevelSum";

describe("kthLargestLevelSum", () => {
  it("case 1", () => {
    const arr = [5, 8, 9, 2, 1, 3, 7, 4, 6],
      k = 2;
    const tree = arrToBinaryTree(arr);
    const result = kthLargestLevelSum(tree, k);
    expect(result).toBe(13);
  });
});
