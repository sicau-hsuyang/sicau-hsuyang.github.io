import { reversePairs } from "./reversePairs";

describe("reverse pairs", () => {
  it("case 1", () => {
    const arr = [7, 5, 6, 4];
    const len = reversePairs(arr);
    expect(len).toBe(5);
  });

  it("case 2", () => {
    const arr = [7, 5, 100, 102, 45, 6, 4];
    const len = reversePairs(arr);
    expect(len).toBe(13);
  });
});
