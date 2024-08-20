import { countSubstrings } from "./countSubstrings";

describe("countSubstrings", () => {
  it("case 1", () => {
    const s = "aaa";
    const res = countSubstrings(s);
    expect(res).toBe(6);
  });

  it("case 2", () => {
    const s = "aaba";
    const res = countSubstrings(s);
    expect(res).toBe(6);
  });

  /**
   * a a b a
   * aa aba
   */
});
