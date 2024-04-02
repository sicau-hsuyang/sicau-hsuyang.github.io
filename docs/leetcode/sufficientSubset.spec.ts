import { sufficientSubset } from "./sufficientSubset";
import { arrToBinaryTree } from "leetcode-test-utils";

describe("sufficientSubset", () => {
  it("case 1", () => {
    const root = [1, 2, 3, 4, -99, -99, 7, 8, 9, -99, -99, 12, 13, -99, 14],
      limit = 1;
    const tree = arrToBinaryTree(root) as any;
    sufficientSubset(tree, limit);
  });

  it("case 2", () => {
    const root = [1, 2, 3, 4, -99, -99, 7, 8, 9, -99, -99, 12, 13, -99, 14],
      limit = 16;
    const tree = arrToBinaryTree(root) as any;
    sufficientSubset(tree, limit);
  });

  it("case 3", () => {
    const root = [1, 2, 3, 4, -99, -99, 7, 8, 9, -99, -99, 12, 13, -99, 14],
      limit = 1000;
    const tree = arrToBinaryTree(root) as any;
    sufficientSubset(tree, limit);
  });

  it("case 4", () => {
    const root = [2, 7, 2, null, 8, null, null, null, 4];
    const limit = 15;
    const tree = arrToBinaryTree(root) as any;
    sufficientSubset(tree, limit);
  });

  it("case 5", () => {
    const root = [1, 2, -3, -5, null, 4, null];
    const limit = 2;
    const tree = arrToBinaryTree(root) as any;
    sufficientSubset(tree, limit);
  });
});
