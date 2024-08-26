import { maxUniqueSplit } from "./maxUniqueSplit";

describe("maxUniqueSplit", () => {
  it("case 1", () => {
    const s = "ababccc";
    const t = maxUniqueSplit(s);
    expect(t).toBe(5);
  });

  it("case 2", () => {
    const s = "aaaaaaaaaaaaaaaaaa";
    const t = maxUniqueSplit(s);
    expect(t).toBe(5);
  });

  it("case 3", () => {
    const s = "aa";
    const t = maxUniqueSplit(s);
    expect(t).toBe(1);
  });
});
