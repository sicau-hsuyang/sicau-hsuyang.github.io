import { arrToBinaryTree } from "leetcode-test-utils";
import { maxPathSum } from "./maxPathSum";

describe("maxPathSum", () => {
  it("case 1", () => {
    const arr: any[] = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1];
    const tree = arrToBinaryTree(arr) as any;
    const max = maxPathSum(tree);
    console.log(max);
  });

  it("case 2", () => {
    const arr: any[] = [1, -2, -3, 1, 3, -2, null, -1];
    const tree = arrToBinaryTree(arr) as any;
    const max = maxPathSum(tree);
    console.log(max);
  });

  it("case 3", () => {
    const arr: any[] = [1, 2, 3];
    const tree = arrToBinaryTree(arr) as any;
    const max = maxPathSum(tree);
    console.log(max);
  });

  it("case 4", () => {
    const arr: any[] = [-10, 9, 20, null, null, 15, 7];
    const tree = arrToBinaryTree(arr) as any;
    const max = maxPathSum(tree);
    console.log(max);
  });

  it("case 5", () => {
    const arr: any[] = [2, -1];
    const tree = arrToBinaryTree(arr) as any;
    const max = maxPathSum(tree);
    console.log(max);
  });
});
