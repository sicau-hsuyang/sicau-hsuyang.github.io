import { lengthOfLongestSubstring } from "./lengthOfLongestSubstring";

describe("lengthOfLongestSubstring", () => {
  it("case 1", () => {
    const s = "abcabcbb";
    const len = lengthOfLongestSubstring(s);
    console.log(len);
  });

  it("case 2", () => {
    const s = "abcabcdae";
    const len = lengthOfLongestSubstring(s);
    console.log(len);
  });
});
