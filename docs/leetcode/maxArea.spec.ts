import { maxArea } from "./maxArea";

describe("maxArea", () => {
  it("case 1", () => {
    const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    const area = maxArea(height);
    expect(area).toBe(49);
  });

  it("case 2", () => {
    const height = [
      1, 8, 6, 2, 5, 4, 8, 3, 7, 200, 300, 30, 20, 50, 80, 90, 10,
    ];
    const area = maxArea(height);
    expect(area).toBe(540);
  });
});
