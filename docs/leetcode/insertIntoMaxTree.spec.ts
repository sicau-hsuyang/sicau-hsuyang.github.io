import {
  insertIntoMaxTree,
  constructMaximumBinaryTree,
} from "./insertIntoMaxTree";

describe("insertIntoMaxTree", () => {
  it("case 1", () => {
    const tree: any = {
      val: 5,
      left: {
        val: 2,
        right: {
          val: 1,
        },
      },
      right: {
        val: 4,
      },
    };
    const newTree = insertIntoMaxTree(tree, 3);
    console.log(newTree);
  });
});
