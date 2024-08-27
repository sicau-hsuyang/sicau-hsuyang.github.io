import { arrToBinaryTree } from "leetcode-test-utils";
import { distributeCoins } from "./distributeCoins";

describe("distributeCoins", () => {
  it("case 1", () => {
    const tree = arrToBinaryTree([3, 0, 0]);
    const res = distributeCoins(tree);
    console.log(res);
  });

  it("case 2", () => {
    const tree = arrToBinaryTree([0, 3, 0]);
    const res = distributeCoins(tree);
    console.log(res);
  });
});
