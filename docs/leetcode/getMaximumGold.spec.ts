import { getMaximumGold } from "./getMaximumGold";

describe("getMaximumGold", () => {
  it("case 1", () => {
    const grid = [
      [0, 6, 0],
      [5, 8, 7],
      [0, 9, 0],
    ];
    const max = getMaximumGold(grid);
    expect(max).toBe(24);
  });

  it("case 2", () => {
    const grid = [
      [1, 0, 7],
      [2, 0, 6],
      [3, 4, 5],
      [0, 3, 0],
      [9, 0, 20],
    ];
    const max = getMaximumGold(grid);
    expect(max).toBe(28);
  });
});
