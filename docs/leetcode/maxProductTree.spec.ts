import { maxProduct } from "./maxProductTree";
import { arrToBinaryTree } from "leetcode-test-utils";

describe("maxProduct", () => {
  it("case 1", () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const tree = arrToBinaryTree(arr) as any;
    const max = maxProduct(tree);
    expect(max).toBe(110);
  });

  it("case 2", () => {
    const arr = [1, null, 2, 3, 4, null, null, 5, 6];
    const tree = arrToBinaryTree(arr) as any;
    const max = maxProduct(tree);
    expect(max).toBe(90);
  });

  it("case 3", () => {
    const arr = [2, 3, 9, 10, 7, 8, 6, 5, 4, 11, 1];
    const tree = arrToBinaryTree(arr) as any;
    const max = maxProduct(tree);
    expect(max).toBe(1025);
  });

  it("case 5", () => {
    const arr = [1, 1];
    const tree = arrToBinaryTree(arr) as any;
    const max = maxProduct(tree);
    expect(max).toBe(1);
  });
});
