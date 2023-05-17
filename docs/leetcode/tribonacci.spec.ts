import { tribonacci } from "./tribonacci";

describe("tribonacci", () => {
  it("tribonacci test", () => {
    const n = 4;
    const num = tribonacci(n);
    expect(num).toBe(4);
  });

  it("tribonacci test 2", () => {
    const n = 3;
    const num = tribonacci(n);
    expect(num).toBe(2);
  });
});
