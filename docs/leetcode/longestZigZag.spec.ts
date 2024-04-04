import { arrToBinaryTree } from "leetcode-test-utils";
import { longestZigZag } from "./longestZigZag";

describe("longestZigZag", () => {
  it("case 1", () => {
    const arr = [
      1,
      null,
      1,
      1,
      1,
      null,
      null,
      1,
      1,
      null,
      1,
      null,
      null,
      null,
      1,
      null,
      1,
    ];
    const tree = arrToBinaryTree(arr) as any;
    const max = longestZigZag(tree);
    expect(max).toBe(3);
  });

  it("case 2", () => {
    const arr = [1, 1, 1, null, 1, null, null, 1, 1, null, 1];
    const tree = arrToBinaryTree(arr) as any;
    const max = longestZigZag(tree);
    expect(max).toBe(4);
  });
});
