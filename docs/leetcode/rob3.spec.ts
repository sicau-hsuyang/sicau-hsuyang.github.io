import { arrToBinaryTree } from "leetcode-test-utils";
import { rob } from "./rob3";

describe("rob", () => {
  it("case 1", () => {
    const nums = [2, 1, 3, null, 4];
    const tree = arrToBinaryTree(nums as any);
    const profit = rob(tree as any);
    console.log(profit);
  });

  it("case 2", () => {
    const root = [4, 1, null, 2, null, 3];
    const tree = arrToBinaryTree(root as any);
    const profit = rob(tree as any);
    console.log(profit);
  });
});
