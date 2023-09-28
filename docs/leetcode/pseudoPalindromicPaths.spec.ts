import { pseudoPalindromicPaths } from "./pseudoPalindromicPaths";
import { arrToBinaryTree } from "leetcode-test-utils";

describe("pseudo palindromic paths", () => {
  it("case 1", () => {
    const tree = arrToBinaryTree([2, 3, 1, 3, 1, null, 1]);
    const count = pseudoPalindromicPaths(tree as any);
    expect(count).toBe(2);
  });
  it("case 2", () => {
    const tree = arrToBinaryTree([
      2,
      1,
      1,
      1,
      3,
      null,
      null,
      null,
      null,
      null,
      1,
    ]);
    const count = pseudoPalindromicPaths(tree as any);
    expect(count).toBe(1);
  });
});
