import { calculateMinimumHP } from "./calculateMinimumHP";

describe("calculateMinimumHP", () => {
  it("case 1", () => {
    const cell = [
      [1, -3, 3],
      [0, -2, 0],
      [-3, -3, -3],
    ];
    const health = calculateMinimumHP(cell);
    expect(health).toBe(3);
  });

  it("case 2", () => {
    const cell = [
      [0, 0, 0],
      [1, 1, -1],
    ];
    const health = calculateMinimumHP(cell);
    expect(health).toBe(1);
  });

  it("case 3", () => {
    const cell = [
      [-2, -3, 3],
      [-5, -10, 1],
      [10, 30, -5],
    ];
    const health = calculateMinimumHP(cell);
    expect(health).toBe(7);
  });

  it("case 4", () => {
    const cell = [
      [0, 0, 0],
      [-1, 0, 0],
      [2, 0, -2],
    ];
    const health = calculateMinimumHP(cell);
    expect(health).toBe(2);
  });
});
