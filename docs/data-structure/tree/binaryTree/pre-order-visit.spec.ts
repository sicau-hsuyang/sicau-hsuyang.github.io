import {
  TreeNode,
  treePreOrderRecursion,
  treePreOrder,
} from "./pre-order-visit";

describe("treePreOrderRecursion", () => {
  test("should return empty array when the tree is empty", () => {
    const tree: TreeNode<number> | undefined = undefined;
    const result = treePreOrderRecursion(tree);
    expect(result).toEqual([]);
  });

  test("should return array with single element when the tree has only one node", () => {
    const tree: TreeNode<number> = {
      data: 1,
    };
    const result = treePreOrderRecursion(tree);
    expect(result).toEqual([1]);
  });

  test("should return correct order when the tree has multiple nodes", () => {
    const tree: TreeNode<number> = {
      data: 1,
      left: {
        data: 2,
        left: {
          data: 4,
        },
        right: {
          data: 5,
        },
      },
      right: {
        data: 3,
      },
    };
    const result = treePreOrderRecursion(tree);
    expect(result).toEqual([1, 2, 4, 5, 3]);
  });
});

describe("treePreOrder", () => {
  test("should return empty array when the tree is empty", () => {
    const tree: TreeNode<number> | undefined = undefined;
    const result = treePreOrder(tree);
    expect(result).toEqual([]);
  });

  test("should return array with single element when the tree has only one node", () => {
    const tree: TreeNode<number> = {
      data: 1,
    };
    const result = treePreOrder(tree);
    expect(result).toEqual([1]);
  });

  test("should return correct order when the tree has multiple nodes", () => {
    const tree: TreeNode<number> = {
      data: 1,
      left: {
        data: 2,
        left: {
          data: 4,
        },
        right: {
          data: 5,
        },
      },
      right: {
        data: 3,
      },
    };
    const result = treePreOrder(tree);
    expect(result).toEqual([1, 2, 4, 5, 3]);
  });
});
