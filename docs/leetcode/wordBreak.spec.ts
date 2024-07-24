import { wordBreak } from "./wordBreak";

describe("wordBreak", () => {
  it("case 1", () => {
    const s = "leetcode",
      wordDict = ["leet", "code"];
    const flag = wordBreak(s, wordDict);
    expect(flag).toBe(true);
  });

  it("case 3", () => {
    const s = "applepenapple",
      wordDict = ["apple", "pen"];
    const flag = wordBreak(s, wordDict);
    expect(flag).toBe(true);
  });

  it("case 2", () => {
    const s = "catsandog",
      wordDict = ["cats", "dog", "sand", "and", "cat"];
    const flag = wordBreak(s, wordDict);
    expect(flag).toBe(false);
  });

  it("case 4", () => {
    const s =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      wordDict = [
        "a",
        "aa",
        "aaa",
        "aaaa",
        "aaaaa",
        "aaaaaa",
        "aaaaaaa",
        "aaaaaaaa",
        "aaaaaaaaa",
        "aaaaaaaaaa",
      ];
    const flag = wordBreak(s, wordDict);
    expect(flag).toBe(false);
  });
});
