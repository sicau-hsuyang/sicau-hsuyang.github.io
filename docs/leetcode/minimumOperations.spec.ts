import { arrToBinaryTree } from "leetcode-test-utils";
import { minimumOperations } from "./minimumOperations";

describe("minimumOperations", () => {
  it("case 1", () => {
    const root = [1, 3, 2, 7, 6, 5, 4];
    const tree = arrToBinaryTree(root);
    const result = minimumOperations(tree);
    expect(result).toBe(3);
  });

  it("case 2", () => {
    const root = [1, 2, 3, 4, 5, 6];
    const tree = arrToBinaryTree(root);
    const result = minimumOperations(tree);
    expect(result).toBe(0);
  });

  it("case 3", () => {
    const root = [1, 4, 3, 7, 6, 8, 5, null, null, null, null, 9, null, 10];
    const tree = arrToBinaryTree(root as any[]);
    const result = minimumOperations(tree);
    expect(result).toBe(result);
  });
});
