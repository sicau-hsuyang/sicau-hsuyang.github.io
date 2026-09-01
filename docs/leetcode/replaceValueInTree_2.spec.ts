import { arrToBinaryTree } from "leetcode-test-utils";
import { replaceValueInTree } from "./replaceValueInTree_2";

describe("replaceValueInTree", () => {
  it("case 1", () => {
    const nums = [
      763,
      111,
      229,
      null,
      334,
      145,
      null,
      null,
      338,
      674,
      null,
      513,
      193,
      366,
      null,
      365,
      null,
      600,
      null,
      null,
      null,
      null,
      null,
      65,
      926,
      null,
      null,
      null,
      607,
    ] as any;
    const tree = arrToBinaryTree(nums) as any;
    replaceValueInTree(tree);
  });
});
