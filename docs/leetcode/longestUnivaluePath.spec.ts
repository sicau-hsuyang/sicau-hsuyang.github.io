import { arrToBinaryTree } from "leetcode-test-utils";
import { longestUnivaluePath } from "./longestUnivaluePath";

describe("longestUnivaluePath", () => {
  it("case 1", () => {
    const arr = [5, 4, 5, 1, 1, 5];
    const root = arrToBinaryTree(arr);
    const max = longestUnivaluePath(root);
    expect(max).toBe(2);
  });

  it("case 2", () => {
    const arr = [1, 4, 5, 4, 4, 5];
    const root = arrToBinaryTree(arr);
    const max = longestUnivaluePath(root);
    expect(max).toBe(2);
  });

  it("case 3", () => {
    const arr = [];
    const root = arrToBinaryTree(arr);
    const max = longestUnivaluePath(root);
    expect(max).toBe(0);
  });
});
