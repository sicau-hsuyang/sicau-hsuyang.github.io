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

  it("case 2", () => {
    const grid = [
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
    ];
    const count = closedIsland(grid);
    expect(count).toBe(1);
  });

  it("case 3", () => {
    const grid = [
      [
        0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1,
        1, 1, 0, 0, 1, 0,
      ],
      [
        1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1,
        1, 1, 0, 0, 1, 0,
      ],
    ];
    const count = closedIsland(grid);
    expect(count).toBe(0);
  });

  it("case 4", () => {
    const grid = [
      [0, 0, 1, 1, 0, 1, 0, 0, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
      [1, 0, 1, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
    ];
    const count = closedIsland(grid);
    expect(count).toBe(5);
  });
});
