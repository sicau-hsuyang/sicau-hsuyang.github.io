import { findAnagrams } from "./findAnagrams";

describe("findAnagrams", () => {
  it("case 1", () => {
    const s = "cbaebabacd",
      p = "abc";
    findAnagrams(s, p);
  });

  it("case 2", () => {
    const s = "abab",
      p = "ab";
    findAnagrams(s, p);
  });

  it("case 3", () => {
    const s = 'abab', p = 'ababab'
    findAnagrams(s, p);
  })
});
