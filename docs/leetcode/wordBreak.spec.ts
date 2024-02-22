import { wordBreak } from "./wordBreak";

describe("wordBreak", () => {
  it("case 1", () => {
    const s = "leetcode",
      wordDict = ["leet", "code"];
    const flag = wordBreak(s, wordDict);
    expect(flag).toBe(true);
  });
});
