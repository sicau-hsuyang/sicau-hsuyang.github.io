import { minDistance } from "./minDistance_2";

describe("minDistance", () => {
  it("case 1", () => {
    const word1 = "sea",
      word2 = "eat";
    const distance = minDistance(word1, word2);
    expect(distance).toBe(2);
  });
});
