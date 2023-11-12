import { pivotIndex } from "./pivotIndex";

describe("pivotIndex", () => {
  it("case 1", () => {
    const idx = pivotIndex([1, 7, 3, 6, 5, 6]);
    expect(idx).toBe(3);
  });

  it("case 2", () => {
    const idx = pivotIndex([2, 1, -1]);
    expect(idx).toBe(0);
  });

  it("case 3", () => {
    const idx = pivotIndex([1, -1, 2]);
    expect(idx).toBe(2);
  });

  it("case 4", () => {
    const idx = pivotIndex([0, 0]);
    expect(idx).toBe(0);
  });
});
