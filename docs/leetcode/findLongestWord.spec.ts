import { findLongestWord } from "./findLongestWord";

describe("findLongestWord", () => {
  it("case 1", () => {
    const s = "abpcplea",
      dictionary = ["ale", "apple", "ppale", "monkey", "plea"];
    const res = findLongestWord(s, dictionary);
  });
});
