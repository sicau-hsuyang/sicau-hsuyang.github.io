import { arrToBinaryTree } from "leetcode-test-utils";
import { pathSum } from "./pathSum";

describe("pathSum", () => {
  it("case 1", () => {
    const arr = [1, -2, -3, 1, 3, -2, null, -1];
    const tree = arrToBinaryTree(arr) as any;
    const res = pathSum(tree, 0);
    console.log(res)
  });
});
