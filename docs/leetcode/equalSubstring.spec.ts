import { equalSubstring } from "./equalSubstring";

describe("equalSubstring", () => {
  it("case 1", () => {
    const s = "abcd",
      t = "bcdf",
      maxCost = 3;
    const res = equalSubstring(s, t, maxCost);
    expect(res).toBe(3);
  });

  it("case 2", () => {
    const s = "abcd",
      t = "cdef",
      maxCost = 3;
    const res = equalSubstring(s, t, maxCost);
    expect(res).toBe(1);
  });

  it("case 3", () => {
    const s = "abcd",
      t = "acde",
      maxCost = 0;
    const res = equalSubstring(s, t, maxCost);
    expect(res).toBe(1);
  });

  it("case 4", () => {
    const s = "abcd",
      t = "efgh",
      maxCost = 0;
    const res = equalSubstring(s, t, maxCost);
    expect(res).toBe(0);
  });

  it("case 5", () => {
    const s = "abcd",
      t = "zefg",
      maxCost = 6;
    const res = equalSubstring(s, t, maxCost);
    expect(res).toBe(2);
  });
});
