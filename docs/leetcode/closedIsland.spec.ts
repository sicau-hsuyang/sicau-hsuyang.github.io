import { closedIsland } from "./closedIsland";

describe("closed island", () => {
  it("case 1", () => {
    const grid = [
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 1, 1, 0],
      [1, 0, 1, 0, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0],
    ];
    const count = closedIsland(grid);
    expect(count).toBe(2);
  });
});
