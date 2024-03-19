import { arrayStringsAreEqual } from "./arrayStringsAreEqual";

describe("arrayStringsAreEqual", () => {
  it("case 1", () => {
    const word1 = ["ab", "c"],
      word2 = ["a", "bc"];
    const flag = arrayStringsAreEqual(word1, word2);
    expect(flag).toBe(true);
  });
});
