import { numSquares } from "./numSquares";

describe("numSquares", () => {
  it("case 1", () => {
    const count = numSquares(12);
    expect(count).toBe(3);
  });

  it("case 2", () => {
    const count = numSquares(13);
    expect(count).toBe(2);
  });
});
