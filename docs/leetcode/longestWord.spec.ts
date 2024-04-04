import { longestWord } from "./longestWord";

describe("longestWord", () => {
  it("case 1", () => {
    const words = ["w", "wo", "wor", "worl", "world"];
    longestWord(words);
  });

  it("case 2", () => {
    const words = ["a", "banana", "app", "appl", "ap", "apply", "apple"];
    longestWord(words);
  });
});
