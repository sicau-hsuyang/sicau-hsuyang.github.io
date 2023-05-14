import { QuickSelectByIndex, QuickSelectByNumber } from "./quickSelect";

describe("quick select", () => {
  it("quick select unit test", () => {
    const arr = [10, 9, 3, 2, 6, 7, 8, 5, 1, 4];
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const target = QuickSelectByIndex.quickSelect(arr, 4);
    expect(target).toBe(4);
  });

  it("quick select unit test", () => {
    const arr = [3, 2, 1, 5, 6, 4];
    // [1, 2, 3, 4, 5, 6]
    const target = QuickSelectByIndex.quickSelect(arr, arr.length - 2 + 1);
    expect(target).toBe(5);
    const target2 = QuickSelectByNumber.quickSelect(arr, 2);
    expect(target2).toBe(3);
  });
});
