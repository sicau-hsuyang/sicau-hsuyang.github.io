import { distinctIntegers } from "./distinctIntegers";

describe("distinctIntegers", () => {
  it("case 1", () => {
    const n = 5;
    const len = distinctIntegers(n);
    expect(len).toBe(4);
  });

  it("case 2", () => {
    const n = 100;
    const len = distinctIntegers(n);
    expect(len).toBe(99);
  });
});
