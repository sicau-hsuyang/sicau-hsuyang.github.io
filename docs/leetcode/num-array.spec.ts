import { NumArray } from "./num-array";

describe("num array", () => {
  it("case 1", () => {
    const arr = [-2, 0, 3, -5, 2, -1];
    const sum = [0, -2, -2, 1, -4, -2, -3];
    const dict = new NumArray([-2, 0, 3, -5, 2, -1]);
    const range1 = dict.sumRange(0, 2);
    expect(range1).toBe(1);
    const range2 = dict.sumRange(2, 5);
    expect(range2).toBe(-1);
    const range3 = dict.sumRange(0, 5);
    expect(range3).toBe(-3);
  });
});
