import { wordBreak } from "./wordBreak2";

describe("wordBreak", () => {
  it("case 1", () => {
    const s = "catsanddog",
      wordDict = ["cat", "cats", "and", "sand", "dog"];
    wordBreak(s, wordDict);
  });
});
