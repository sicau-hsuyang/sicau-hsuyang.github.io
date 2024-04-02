import { amountOfTime } from "./amountOfTime";
import { arrToBinaryTree } from "leetcode-test-utils";

describe("amountOfTime", () => {
  it("case 1", () => {
    const root = [1, 5, 3, null, 4, 10, 6, 9, 2],
      start = 3;
    const tree = arrToBinaryTree(root) as any;
    const time = amountOfTime(tree, start);
    expect(time).toBe(4);
  });

  it("case 2", () => {
    const root = [1, 5, 3, null, 4, 10, 6, 9, 2],
      start = 4;
    const tree = arrToBinaryTree(root) as any;
    const time = amountOfTime(tree, start);
    expect(time).toBe(4);
  });
});
