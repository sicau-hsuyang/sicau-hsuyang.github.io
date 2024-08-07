import { ladderLength } from "./ladderLength";

describe("generate case", () => {
  const generateWordList = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const res = [];
    const len = 10;
    for (let i = 0; i < 2000; i++) {
      let str = "";
      for (let k = 0; k < len; k++) {
        str += alphabet[Math.floor(Math.random() * 26)];
      }
      res.push(str);
    }
    console.log(JSON.stringify(res));
  };
});

describe("ladderLength", () => {
  it("case 1", () => {
    const beginWord = "hit",
      endWord = "cog",
      wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
    const len = ladderLength(beginWord, endWord, wordList);
    console.log(len);
  });

  it("case 2", () => {
    const beginWord = "got",
      endWord = "log",
      wordList = ["hot", "dot", "dog", "lot", "log"];
    const len = ladderLength(beginWord, endWord, wordList);
    console.log(len);
  });
});
