import { totalFruit } from "./totalFruit";

describe("totalFruit", () => {
  it("case 1", () => {
    const fruits = [1, 2, 1];
    const total = totalFruit(fruits);
    expect(total).toBe(3);
  });

  it("case 2", () => {
    const fruits = [0, 1, 2, 2];
    const total = totalFruit(fruits);
    expect(total).toBe(3);
  });

  it("case 3", () => {
    const fruits = [1, 2, 3, 2, 2];
    const total = totalFruit(fruits);
    expect(total).toBe(4);
  });

  it("case 4", () => {
    const fruits = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4];
    const total = totalFruit(fruits);
    expect(total).toBe(5);
  });

  it("case 5", () => {
    const fruits = [1, 2, 2, 2, 3, 3, 2, 4, 3, 5, 5, 6, 2, 1, 4, 4, 4, 4, 1];
    const total = totalFruit(fruits);
    expect(total).toBe(6);
  });

  it("case 7", () => {
    const fruits = [
      1, 2, 2, 2, 3, 3, 5, 5, 6, 2, 3, 2, 4, 3, 5, 6, 2, 3, 2, 4, 3, 5, 5, 6, 6,
      2, 3, 2, 4, 3, 5, 2, 1, 4, 4, 4, 4, 1,
    ];
    const total = totalFruit(fruits);
    expect(total).toBe(6);
  });

  it("case 6", () => {
    const fruits = [1, 1, 6, 5, 6, 6, 1, 1, 1, 1];
    const total = totalFruit(fruits);
    expect(total).toBe(6);
  });
});
