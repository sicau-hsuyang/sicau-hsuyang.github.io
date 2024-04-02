import { arrToBinaryTree } from "leetcode-test-utils";
import { countPairs } from "./countPairs";

describe("countPairs", () => {
  it("case 1", () => {
    const root = [1, 2, 3, null, 4],
      distance = 3;
    const tree = arrToBinaryTree(root) as any;
    const count = countPairs(tree, distance);
    expect(count).toBe(1);
  });

  it("case 2", () => {
    const root = [1, 2, 3, 4, 5, 6, 7],
      distance = 3;
    const tree = arrToBinaryTree(root) as any;
    const count = countPairs(tree, distance);
    expect(count).toBe(2);
  });

  it("case 3", () => {
    const root = [7, 1, 4, 6, null, 5, 3, null, null, null, null, null, 2],
      distance = 3;
    const tree = arrToBinaryTree(root) as any;
    const count = countPairs(tree, distance);
    expect(count).toBe(1);
  });
});
