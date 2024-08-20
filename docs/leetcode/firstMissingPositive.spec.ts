import { firstMissingPositive } from "./firstMissingPositive";

describe("firstMissingPositive", () => {
  it("case 1", () => {
    const nums = [1, 2, 0];
    firstMissingPositive(nums);
  });

  it("case 2", () => {
    const nums = [3,4,-1,1]
    firstMissingPositive(nums);
  })
});
