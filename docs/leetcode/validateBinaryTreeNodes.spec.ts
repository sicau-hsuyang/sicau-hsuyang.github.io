import { validateBinaryTreeNodes } from "./validateBinaryTreeNodes";

describe("validate binary tree nodes", () => {
  it("case 1", () => {
    const n = 4,
      leftChild = [1, -1, 3, -1],
      rightChild = [2, -1, -1, -1];
    const flag = validateBinaryTreeNodes(n, leftChild, rightChild);
    expect(flag).toBe(true);
  });

  it("case 2", () => {
    const n = 4,
      leftChild = [1, -1, 3, -1],
      rightChild = [2, 3, -1, -1];
    const flag = validateBinaryTreeNodes(n, leftChild, rightChild);
    expect(flag).toBe(false);
  });

  it("case 3", () => {
    const n = 2,
      leftChild = [1, 0],
      rightChild = [-1, -1];
    const flag = validateBinaryTreeNodes(n, leftChild, rightChild);
    expect(flag).toBe(false);
  });

  it("case 4", () => {
    const n = 6,
      leftChild = [1, -1, -1, 4, -1, -1],
      rightChild = [2, -1, -1, 5, -1, -1];
    const flag = validateBinaryTreeNodes(n, leftChild, rightChild);
    expect(flag).toBe(false);
  });

  it("case 5", () => {
    const n = 3,
      leftChild = [1, -1, -1],
      rightChild = [-1, -1, 1];
    const flag = validateBinaryTreeNodes(n, leftChild, rightChild);
    expect(flag).toBe(false);
  });
});
