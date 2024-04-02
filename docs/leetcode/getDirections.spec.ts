import { arrToBinaryTree } from "leetcode-test-utils";
import { getDirections } from "./getDirections";

describe("getDirections", () => {
  it("case 1", () => {
    const root = [5, 1, 2, 3, null, 6, 4],
      startValue = 3,
      destValue = 6;
    const tree = arrToBinaryTree(root) as any;
    const path = getDirections(tree, startValue, destValue);
    expect(path).toBe("UURL");
  });

  it("case 2", () => {
    const root = [5, 1, 2, 3, null, 6, 4],
      startValue = 5,
      destValue = 3;
    const tree = arrToBinaryTree(root) as any;
    const path = getDirections(tree, startValue, destValue);
    expect(path).toBe("LL");
  });

  it("case 3", () => {
    const root = [5, 1, 2, 3, null, 6, 4],
      startValue = 3,
      destValue = 4;
    const tree = arrToBinaryTree(root) as any;
    const path = getDirections(tree, startValue, destValue);
    expect(path).toBe("UURR");
  });

  it("case 4", () => {
    const root = [103, 101, 100, 11, 12, 5, 1, 2, 3, null, 6, 4, 10, 8, 9],
      startValue = 2,
      destValue = 6;
    const tree = arrToBinaryTree(root) as any;
    const path = getDirections(tree, startValue, destValue);
    expect(path).toBe("UURR");
  });

  it("case 5", () => {
    const root = [103, 101, 100, 11, 12, 5, 1, 2, 3, null, 6, 4, 10, 8, 9],
      startValue = 2,
      destValue = 5;
    const tree = arrToBinaryTree(root) as any;
    const path = getDirections(tree, startValue, destValue);
    expect(path).toBe("UUURL");
  });

  it("case 6", () => {
    const root = [103, 101, 100, 11, 12, 5, 1, 2, 3, null, 6, 4, 10, 8, 9],
      startValue = 3,
      destValue = 8;
    const tree = arrToBinaryTree(root) as any;
    const path = getDirections(tree, startValue, destValue);
    expect(path).toBe("UUURRL");
  });

  it("case 7", () => {
    const root = [103, 101, 100, 11, 12, 5, 1, 2, 3, null, 6, 4, 10, 8, 9],
      startValue = 8,
      destValue = 3;
    const tree = arrToBinaryTree(root) as any;
    const path = getDirections(tree, startValue, destValue);
    expect(path).toBe("UUULLR");
  });

  it("case 8", () => {
    const root = [103, 101, 100, 11, 12, 5, 1, 2, 3, null, 6, 4, 10, 8, 9],
      startValue = 103,
      destValue = 6;
    const tree = arrToBinaryTree(root) as any;
    const path = getDirections(tree, startValue, destValue);
    expect(path).toBe("LRR");
  });
});
