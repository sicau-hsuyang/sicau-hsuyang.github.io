import { maxSubarraySumCircular } from "./maxSubarraySumCircular";

describe("maxSubarraySumCircular", () => {
  it("case 1", () => {
    const nums = [1, -2, 3, -2];
    const res = maxSubarraySumCircular(nums);
    expect(res).toBe(3);
  });

  it("case 2", () => {
    const nums = [5, -4, 5];
    const res = maxSubarraySumCircular(nums);
    expect(res).toBe(10);
  });

  it("case 3", () => {
    const nums = [-3, -2, -3];
    const res = maxSubarraySumCircular(nums);
    expect(res).toBe(-2);
  });
});
