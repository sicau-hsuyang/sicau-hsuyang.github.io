import { findMin } from "./findMin";

describe("findMin", () => {
  it("case 1", () => {
    const nums = [3, 4, 5, 1, 2];
    const val = findMin(nums);
    expect(val).toBe(1);
  });

  it("case 2", () => {
    const nums = [4, 5, 6, 7, 0, 1, 2];
    const val = findMin(nums);
    expect(val).toBe(0);
  });

  it("case 3", () => {
    const nums = [4, 5, 6, 7, 8, 9, 10, 0, 1, 2];
    const val = findMin(nums);
    expect(val).toBe(0);
  });

  it("case 4", () => {
    const nums = [9, 10, 0, 1, 2, 4, 5, 6, 7, 8];
    const val = findMin(nums);
    expect(val).toBe(0);
  });
});
