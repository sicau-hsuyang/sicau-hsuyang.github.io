import { smallestEquivalentString } from "./smallestEquivalentString";

describe("smallestEquivalentString", () => {
  it("case 1", () => {
    const s1 = "parker",
      s2 = "morris",
      baseStr = "parser";
    const res = smallestEquivalentString(s1, s2, baseStr);
    expect(res).toBe("makkek");
  });

  it("case 2", () => {
    const s1 = "hello",
      s2 = "world",
      baseStr = "hold";
    const res = smallestEquivalentString(s1, s2, baseStr);
    expect(res).toBe("hdld");
  });

  it("case 3", () => {
    const s1 = "leetcode",
      s2 = "programs",
      baseStr = "sourcecode";
    const res = smallestEquivalentString(s1, s2, baseStr);
    expect(res).toBe("aauaaaaada");
  });
});
