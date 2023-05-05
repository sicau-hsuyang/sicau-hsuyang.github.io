import { islandPerimeter } from "./islandPerimeter";

describe("island perimeter", () => {
  it("island perimeter unit test 1", () => {
    const grid = [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
    ];
    const size = islandPerimeter(grid);
    expect(size).toBe(16);
  });

  it("island perimeter unit test 2", () => {
    const grid = [[1]];
    const size = islandPerimeter(grid);
    expect(size).toBe(4);
  });

  it("island perimeter unit test 3", () => {
    const grid = [[1, 0]];
    const size = islandPerimeter(grid);
    expect(size).toBe(4);
  });

  it("island perimeter unit test 4", () => {
    const grid = [[0, 1, 1]];
    const size = islandPerimeter(grid);
    expect(size).toBe(6);
  });

  it("island perimeter unit test 5", () => {
    const grid = [
      [1, 1],
      [1, 1],
    ];
    const size = islandPerimeter(grid);
    expect(size).toBe(6);
  });
});
