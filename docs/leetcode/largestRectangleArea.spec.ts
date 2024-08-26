import { largestRectangleArea } from "./largestRectangleArea";

describe("largestRectangleArea", () => {
  it("case 1", () => {
    const heights = [2, 1, 5, 6, 2, 3];
    const area = largestRectangleArea(heights);
    expect(area).toBe(10);
  });

  it("case 2", () => {
    const heights = [4, 2, 0, 3, 2, 5];
    const area = largestRectangleArea(heights);
    expect(area).toBe(6);
  });

  it("case 3", () => {
    const heights = [3, 6, 5, 7, 4, 8, 1, 0];
    const area = largestRectangleArea(heights);
    expect(area).toBe(20);
  });

  it("case 4", () => {
    const heights = [1];
    const area = largestRectangleArea(heights);
    expect(area).toBe(1);
  });
});
