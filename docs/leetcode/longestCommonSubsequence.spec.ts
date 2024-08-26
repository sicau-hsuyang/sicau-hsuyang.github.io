import { longestCommonSubsequence } from "./longestCommonSubsequence";

describe("longestCommonSubsequence", () => {
  it("case 1", () => {
    const text1 = "abcde",
      text2 = "ace";
    const len = longestCommonSubsequence(text1, text2);
    expect(len).toBe(3);
  });
});
