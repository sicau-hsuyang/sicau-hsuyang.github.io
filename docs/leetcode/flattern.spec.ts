import { arrToBinaryTree } from "leetcode-test-utils";
import { flatten } from "./flattern";

describe("flatten", () => {
  it("case 1", () => {
    const arr = [1, 2, 5, 3, 4, null, 6];
    const root = arrToBinaryTree(arr) as any;
    flatten(root);
  });
});
