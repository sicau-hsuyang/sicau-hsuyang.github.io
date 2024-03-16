import { arrToBinaryTree } from "leetcode-test-utils";
import { lowestCommonAncestor } from "./lowestCommonAncestor.bst";

describe("lowestCommonAncestor", () => {
  function findNode(root, val) {
    if (root.val === val) {
      return root;
    } else if (root.val > val) {
      return findNode(root.left, val);
    } else {
      return findNode(root.right, val);
    }
  }

  it("case 1", () => {
    const arr = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
      p = 2,
      q = 8;
    const root = arrToBinaryTree(arr) as any;
    const pNode = findNode(root, p);
    const qNode = findNode(root, q);
    const node = lowestCommonAncestor(root, pNode, qNode);
    expect(node?.val).toBe(6);
  });

  it("case 2", () => {
    const arr = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
      p = 0,
      q = 5;
    const root = arrToBinaryTree(arr) as any;
    const pNode = findNode(root, p);
    const qNode = findNode(root, q);
    const node = lowestCommonAncestor(root, pNode, qNode);
    expect(node?.val).toBe(2);
  });

  it("case 3", () => {
    const arr = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
      p = 2,
      q = 4;
    const root = arrToBinaryTree(arr) as any;
    const pNode = findNode(root, p);
    const qNode = findNode(root, q);
    const node = lowestCommonAncestor(root, pNode, qNode);
    expect(node?.val).toBe(2);
  });
});
