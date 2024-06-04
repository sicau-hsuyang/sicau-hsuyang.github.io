import { findTheLongestSubstring } from "./findTheLongestSubstring";

describe("findTheLongestSubstring", () => {
  it("case 1", () => {
    const s = "eleetminicoworoep"
    const res = findTheLongestSubstring(s);
    expect(res).toBe(13)
  });
});
