import { isMatch } from "./isMatch";

describe("isMatch", () => {
  it("case1", () => {
    const s = "aap",
      p = "a*p";
    const res = isMatch(s, p);
    expect(res).toBe(true);
  });

  it("case2", () => {
    const s = "aa",
      p = "a*";
    const res = isMatch(s, p);
    expect(res).toBe(true);
  });

  it("case 3", () => {
    const s = "ab",
      p = ".*";
    const res = isMatch(s, p);
    expect(res).toBe(true);
  });

  it("case 4", () => {
    const s = "a",
      p = "ab*";
    const res = isMatch(s, p);
    expect(res).toBe(true);
  });

  it("case 5", () => {
    const s = "a",
      p = "ab*c*.*";
    const res = isMatch(s, p);
    expect(res).toBe(true);
  });
});
