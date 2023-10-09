import { GeneralTreeNode, arrToBinaryTree } from "leetcode-test-utils";
import { lowestCommonAncestor } from "./lowestCommonAncestor";

function findNode(root: GeneralTreeNode<number>, num: number) {
  if (!root) {
    return null;
  } else if (root.val === num) {
    return root;
  } else {
    return findNode(root.left, num) || findNode(root.right, num);
  }
}

describe("lowestCommonAncestor", () => {
  it("case 1", () => {
    const tree = arrToBinaryTree([3, 1, 4, null, 2]) as any;
    const qNode = findNode(tree, 2);
    const pNode = findNode(tree, 3);
    const node = lowestCommonAncestor(tree as any, qNode, pNode);
    expect(node!.val).toBe(3);
  });

  it("case 2", () => {
    const tree = arrToBinaryTree([
      6,
      2,
      8,
      0,
      4,
      7,
      9,
      null,
      null,
      3,
      5,
    ]) as any;
    const qNode = findNode(tree, 2);
    const pNode = findNode(tree, 8);
    const node = lowestCommonAncestor(tree as any, qNode, pNode);
    expect(node!.val).toBe(6);
  });

  it("case 3", () => {
    const arr = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
      p = 2,
      q = 4;
    const tree = arrToBinaryTree(arr as any);
    const qNode = findNode(tree as any, p);
    const pNode = findNode(tree as any, q);
    const node = lowestCommonAncestor(tree as any, qNode, pNode);
    expect(node!.val).toBe(2);
  });

  it("case 4", () => {
    const arr = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
      p = 5,
      q = 9;
    const tree = arrToBinaryTree(arr as any);
    const qNode = findNode(tree as any, p);
    const pNode = findNode(tree as any, q);
    const node = lowestCommonAncestor(tree as any, qNode, pNode);
    expect(node!.val).toBe(6);
  });

  it("case 5", () => {
    const arr = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
      p = 0,
      q = 5;
    const tree = arrToBinaryTree(arr as any);
    const qNode = findNode(tree as any, p);
    const pNode = findNode(tree as any, q);
    const node = lowestCommonAncestor(tree as any, qNode, pNode);
    expect(node!.val).toBe(2);
  });
});
