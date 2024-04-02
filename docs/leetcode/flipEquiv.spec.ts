import { flipEquiv } from "./flipEquiv";
import { arrToBinaryTree } from "leetcode-test-utils";

describe("flipEquiv", () => {
  it("case 1", () => {
    const root1 = [1, 2, 3, 4, 5, 6, null, null, null, 7, 8],
      root2 = [1, 3, 2, null, 6, 4, 5, null, null, null, null, 8, 7];
    const tree1 = arrToBinaryTree(root1) as any;
    const tree2 = arrToBinaryTree(root2) as any;
    const flag = flipEquiv(tree1, tree2);
    expect(flag).toBe(true);
  });
});
