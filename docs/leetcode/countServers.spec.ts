import { countServers } from "./countServers";

describe("count servers", () => {
  it("case 1", () => {
    const grid = [
      [1, 0],
      [0, 1],
    ];
    const total = countServers(grid);
    expect(total).toBe(0);
  });

  it("case 2", () => {
    const grid = [
      [1, 0],
      [1, 1],
    ];
    const total = countServers(grid);
    expect(total).toBe(3);
  });

  it("case 3", () => {
    const grid = [
      [1, 1, 0, 1, 1],
      [0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1],
      [0, 0, 0, 1, 1],
    ];
    const total = countServers(grid);
    expect(total).toBe(10);
  });

  it("case 4", () => {
    const grid = [
      [1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
    ];
    const total = countServers(grid);
    expect(total).toBe(3);
  });
});
