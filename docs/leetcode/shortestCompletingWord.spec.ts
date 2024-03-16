import { shortestCompletingWord } from "./shortestCompletingWord";

describe("shortestCompletingWord", () => {
  it("case 1", () => {
    const licensePlate = "1s3 PSt",
      words = ["step", "steps", "stripe", "stepple"];
    const word = shortestCompletingWord(licensePlate, words);
    expect(word).toBe("steps");
  });

  it("case 2", () => {
    const licensePlate = "1s3 456", words = ["looks", "pest", "stew", "show"]
    const word = shortestCompletingWord(licensePlate, words);
    expect(word).toBe("pest");
  })
});
