import { minFallingPathSum } from "./minFallingPathSum";

describe("minFallingPathSum", () => {
  it("case 1", () => {
    const matrix = [
      [2, 1, 3],
      [6, 5, 4],
      [7, 8, 9],
    ];
    const val = minFallingPathSum(matrix);
    expect(val).toBe(13);
  });

  it("case 2", () => {
    const matrix = [
      [-19, 57],
      [-40, -5],
    ];
    const val = minFallingPathSum(matrix);
    expect(val).toBe(-59);
  });
});
