import { arrToBinaryTree } from "leetcode-test-utils";
import { printTree } from "./printTree";

describe("printTree", () => {
  it("case 1", () => {
    const root = [1, 2];
    const tree = arrToBinaryTree(root);
    const res = printTree(tree as any);
    expect(res).toEqual([
      ["", "1", ""],
      ["2", "", ""],
    ]);
  });

  it("case 2", () => {
    const root = [1, 2, 3, null, 4];
    const tree = arrToBinaryTree(root);
    const res = printTree(tree as any);
    expect(res).toEqual([
      ["", "", "", "1", "", "", ""],
      ["", "2", "", "", "", "3", ""],
      ["", "", "4", "", "", "", ""],
    ]);
  });
});
