import { findMaxFish } from "./findMaxFish";

describe("findMaxFish", () => {
  it("case 1", () => {
    const grid = [
      [0, 2, 1, 0],
      [4, 0, 0, 3],
      [1, 0, 0, 4],
      [0, 3, 2, 0],
    ];
    const max = findMaxFish(grid);
    expect(max).toBe(7);
  });

  it("case 2", () => {
    const grid = [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
    ];
    const max = findMaxFish(grid);
    expect(max).toBe(1);
  });

  it("case 3", () => {
    const grid = [
      [0, 5],
      [8, 4],
    ];
    const max = findMaxFish(grid);
    expect(max).toBe(17);
  });
});
