import { sum } from "./sum-of";

describe("sum", () => {
  it("case 1", () => {
    const res = sum(1, 2).sumOf();
    expect(res).toBe(3);
  });
});
