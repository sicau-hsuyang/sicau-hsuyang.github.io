import { findTheLongestSubstring } from "./findTheLongestSubstring";

describe("findTheLongestSubstring", () => {
  it("case 1", () => {
    const s = "eleetminicoworoep";
    const res = findTheLongestSubstring(s);
    expect(res).toBe(13);
  });

  it("case 2", () => {
    const s = "xxxxxxx";
    const res = findTheLongestSubstring(s);
    expect(res).toBe(7);
  });
});
