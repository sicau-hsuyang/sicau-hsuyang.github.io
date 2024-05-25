import { maxFrequency } from "./maxFrequency";

describe("maxFrequency", () => {
  it("case 1", () => {
    const nums = [1, 2, 4],
      k = 5;
    const len = maxFrequency(nums, k);
    expect(len).toBe(3);
  });

  it("case 2", () => {
    const nums = [1, 4, 8, 13],
      k = 5;
    const len = maxFrequency(nums, k);
    expect(len).toBe(2);
  });

  it("case 3", () => {
    const nums = [1, 1, 1, 1, 1, 1, 2, 4, 8, 13],
      k = 5;
    const len = maxFrequency(nums, k);
    expect(len).toBe(6);
  });

  it("case 4", () => {
    const nums = [1, 1, 1, 1, 1, 1],
      k = 5;
    const len = maxFrequency(nums, k);
    expect(len).toBe(6);
  });
});
