import { judgeSquareSum } from "./judgeSquareSum";

describe("judgeSquareSum", () => {
  it("case 1", () => {
    const c = 9;
    const res = judgeSquareSum(c);
    expect(res).toBe(false);
  });
});
