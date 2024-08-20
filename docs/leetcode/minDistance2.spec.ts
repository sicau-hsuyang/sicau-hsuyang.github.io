import { minDistance } from "./minDistance_2";

describe("minDistance", () => {
  it("case 1", () => {
    const word1 = "sea",
      word2 = "eat";
    const d = minDistance(word1, word2);
    console.log(d);
  });

  it("case 2", () => {
    const word1 = "leetcode", word2 = "etco"
    const d = minDistance(word1, word2);
    console.log(d);
  })
});
