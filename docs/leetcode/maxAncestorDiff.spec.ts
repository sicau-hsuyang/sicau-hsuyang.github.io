import { arrToBinaryTree } from "leetcode-test-utils";
import { maxAncestorDiff } from "./maxAncestorDiff";

describe("maxAncestorDiff", () => {
  it("case 1", () => {
    const arr = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13];
    const tree = arrToBinaryTree(arr) as any;
    maxAncestorDiff(tree);
  });
});
