import { orangesRotting } from "./orangesRotting";

describe("orangesRotting", () => {
  it("case 1", () => {
    const grid = [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ];
    const time = orangesRotting(grid);
    expect(time).toBe(4);
  });
  it("case 2", () => {
    const grid = [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1],
    ];
    const time = orangesRotting(grid);
    expect(time).toBe(-1);
  });

  it("case 3", () => {
    const grid = [[0, 2]];
    const time = orangesRotting(grid);
    expect(time).toBe(0);
  });

  it("case 4", () => {
    const grid = [[0]];
    const time = orangesRotting(grid);
    expect(time).toBe(0);
  });

  it("case 5", () => {
    const grid = [[1]];
    const time = orangesRotting(grid);
    expect(time).toBe(0);
  });
});
