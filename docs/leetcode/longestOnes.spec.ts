import { longestOnes } from "./longestOnes";

describe("longestOnes", () => {
  it("case 1", () => {
    const nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
      K = 2;
    const count = longestOnes(nums, K);
    expect(count).toBe(6);
  });

  it("case 2", () => {
    const nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
      K = 3;
    const count = longestOnes(nums, K);
    expect(count).toBe(10);
  });
});
