import { findLadders } from "./findLadders";

describe("findLadders", () => {
  it("case 1", () => {
    const beginWord = "hit",
      endWord = "cog",
      wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
    findLadders(beginWord, endWord, wordList);
  });

  it("case 2", () => {
    const beginWord = "a",
      endWord = "c",
      wordList = ["a", "b", "c"];
    findLadders(beginWord, endWord, wordList);
  });

  it("case 3", () => {
    const beginWord = "hot",
      endWord = "dog",
      wordList = ["hot", "dog"];
    findLadders(beginWord, endWord, wordList);
  });

  it("case 4", () => {
    const beginWord = "red",
      endWord = "tax",
      wordList = ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"];
    findLadders(beginWord, endWord, wordList);
  });
});
