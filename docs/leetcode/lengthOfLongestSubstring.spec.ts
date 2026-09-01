import { lengthOfLongestSubstring } from "./lengthOfLongestSubstring";

describe("lengthOfLongestSubstring", () => {
  it("case 1", () => {
    const s = "abcabcbb";
    const len = lengthOfLongestSubstring(s);
    console.log(len);
  });
  // dvdf

  it("case 2", () => {
    const s = "abcabcdae";
    const len = lengthOfLongestSubstring(s);
    console.log(len);
  });

  it("case 3", () => {
    const s = "dvdf";
    const len = lengthOfLongestSubstring(s);
    console.log(len);
  });

  it("case 4", () => {
    const s = "aab";
    const len = lengthOfLongestSubstring(s);
    console.log(len);
  });

  it("case 5", () => {
    const s = "pwwkew";
    const len = lengthOfLongestSubstring(s);
    console.log(len);
  });
});
