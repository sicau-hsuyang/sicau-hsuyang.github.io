import { numSubarraysWithSum } from "./numSubarraysWithSum";

describe("numSubarraysWithSum", () => {
  it("case 1", () => {
    const nums = [1, 0, 1, 0, 1],
      goal = 2;
    const val = numSubarraysWithSum(nums, goal);
    expect(val).toBe(4);
  });

  it("case 2", () => {
    const nums = [0, 0, 0, 0, 0],
      goal = 0;
    const val = numSubarraysWithSum(nums, goal);
    expect(val).toBe(15);
  });

  it("case 3", () => {
    const nums = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      goal = 0;
    const val = numSubarraysWithSum(nums, goal);
    expect(val).toBe(27);
  });
});
