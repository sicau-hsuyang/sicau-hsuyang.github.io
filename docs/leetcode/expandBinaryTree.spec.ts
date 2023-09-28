import { arrToBinaryTree } from "leetcode-test-utils";
import { expandBinaryTree } from "./expandBinaryTree";

describe("expandBinaryTree", () => {
  it("case 1", () => {
    const root = [7, 5, 6];
    const tree = arrToBinaryTree(root);
    const result = expandBinaryTree(tree);
    console.log(result);
  });
});
