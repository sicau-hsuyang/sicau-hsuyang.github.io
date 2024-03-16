import { traverse, closestNodes } from "./closestNodes";
import { arrToBinaryTree } from "leetcode-test-utils";

describe("closestNodes", () => {
  it("case 1", () => {
    const root = [
      6,
      2,
      13,
      1,
      4,
      9,
      15,
      null,
      null,
      null,
      null,
      null,
      null,
      14,
    ];
    const queries = [2, 5, 16];
    const tree = arrToBinaryTree(root);
    const res = closestNodes(tree as any, queries);
    expect(res).toEqual([
      [2, 2],
      [4, 6],
      [15, -1],
    ]);
  });

  it("case 2", () => {
    const root = [4, null, 9],
      queries = [3];
    const tree = arrToBinaryTree(root);
    const res = closestNodes(tree as any, queries);
    expect(res).toEqual([[-1, 4]]);
  });
});
