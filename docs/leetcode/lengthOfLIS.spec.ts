import { lengthOfLIS } from "./lengthOfLIS";

describe("lengthOfLIS", () => {
  it("case 1", () => {
    const nums = [10, 9, 2, 5, 3, 7, 101, 18];
    const res = lengthOfLIS(nums);
    expect(res).toBe(4);
  });

  it("case 3", () => {
    const nums = [0, 1, 0, 3, 2, 3];
    const res = lengthOfLIS(nums);
    expect(res).toBe(4);
  });

  it("case 2", () => {
    const nums = [7, 7, 7, 7, 7];
    const res = lengthOfLIS(nums);
    expect(res).toBe(1);
  });
});
