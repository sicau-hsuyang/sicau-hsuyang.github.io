import { hasValidPath } from "./hasValidPath";

describe("hasValidPath", () => {
  it("case 1", () => {
    const grid = [
      [2, 4, 3],
      [6, 5, 2],
    ];
    const res = hasValidPath(grid);
    expect(res).toBe(true);
  });

  it("case 2", () => {
    const grid = [
      [4, 1],
      [6, 1],
    ];
    const res = hasValidPath(grid);
    expect(res).toBe(true);
  });
});
