import { isMatch } from "./isMatch_2";

describe("isMatch", () => {
  it("case 1", () => {
    const s = "aa",
      p = "*";
    const res = isMatch(s, p);
    expect(res).toBe(true);
  });

  it("case 2", () => {
    const s = "cb",
      p = "?*";
    const res = isMatch(s, p);
    expect(res).toBe(true);
  });

  it("case 3", () => {
    const s = "aaabbbaabaaaaababaabaaabbabbbbbbbbaabababbabbbaaaaba",
      p = "a*******b";
    const res = isMatch(s, p);
    expect(res).toBe(false);
  });
});
