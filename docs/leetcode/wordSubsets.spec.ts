import { wordSubsets } from "./wordSubsets";

describe("wordSubsets", () => {
  it("case 1", () => {
    const words1 = ["amazon", "apple", "facebook", "google", "leetcode"],
      words2 = ["e", "o"];
    const res = wordSubsets(words1, words2);
    console.log(res);
  });

  it("case 2", () => {
    const words1 = ["amazon", "apple", "facebook", "google", "leetcode"],
      words2 = ["l", "e"];
    const res = wordSubsets(words1, words2);
    console.log(res);
  });

  it("case 3", () => {
    const words1 = ["amazon", "apple", "facebook", "google", "leetcode"],
      words2 = ["ec", "oc", "ceo"];
    const res = wordSubsets(words1, words2);
    console.log(res);
  });
});
