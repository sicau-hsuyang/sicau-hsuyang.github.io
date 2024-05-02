import { numSubarraysWithSum } from "./numSubarraysWithSum";

describe("numSubarraysWithSum", () => {
  it("case 1", () => {
    const nums = [1, 0, 1, 0, 1],
      goal = 2;
    numSubarraysWithSum(nums, goal);
  });

  it("case 2", () => {
    const nums = [0, 0, 0, 0, 0],
      goal = 0;
    numSubarraysWithSum(nums, goal);
  });
});
