import { diffWaysToCompute } from "./diffWaysToCompute";

describe("diffWaysToCompute", () => {
  it("case 4", () => {
    const expression = "211";
    const res = diffWaysToCompute(expression);
    expect(res.sort((a, b) => a - b)).toEqual([211]);
  });

  it("case 3", () => {
    const expression = "2-1";
    const res = diffWaysToCompute(expression);
    expect(res.sort((a, b) => a - b)).toEqual([1]);
  });

  it("case 1", () => {
    const expression = "2-1-1";
    const res = diffWaysToCompute(expression);
    expect(res.sort((a, b) => a - b)).toEqual([0, 2]);
  });

  it("case 2", () => {
    const expression = "2*3-4*5";
    const res = diffWaysToCompute(expression);
    expect(res.sort((a, b) => a - b)).toEqual([-34, -14, -10, -10, 10]);
  });
});
