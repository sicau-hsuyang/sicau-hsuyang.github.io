import { minDistance } from "./minDistance";

describe("minDistance", () => {
  it("case 1", () => {
    const word1 = "horse",
      word2 = "ros";
    const d = minDistance(word1, word2);
    console.log(d);
  });

  it("case 2", () => {
    const word1 = "horse",
      word2 = "";
    const d = minDistance(word1, word2);
    console.log(d);
  });

  it("case 3", () => {
    const word1 = "intention",
      word2 = "execution";
    const d = minDistance(word1, word2);
    console.log(d);
  });

  it("case 4", () => {
    const word1 = "horsjoighjsgdfse",
      word2 = "sdfsfros";
    const d = minDistance(word1, word2);
    console.log(d);
  });
});
