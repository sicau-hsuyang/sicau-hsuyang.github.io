import { findWords } from "./findWords";

describe("findWords", () => {
  it("case 1", () => {
    const board = [
        ["o", "a", "a", "n"],
        ["e", "t", "a", "e"],
        ["i", "h", "k", "r"],
        ["i", "f", "l", "v"],
      ],
      words = ["oath", "pea", "eat", "e", "rain"];
    const results = findWords(board, words);
    console.log(results);
  });

  it("case 2", () => {
    const makeBoard = () => {
      const str = "abcdefghijklmnopqrstuvwxyz";
      const board = Array.from({
        length: 12,
      }).map((v) => {
        return Array.from({
          length: 12,
        }).map((x) => {
          return str[Math.floor(Math.random() * 26)];
        });
      });
      return JSON.stringify(board);
    };

    const makeWords = () => {
      const str = "abcdefghijklmnopqrstuvwxyz";
      const words = new Set();
      for (let i = 0; i < 3000; i++) {
        let len = Math.floor(Math.random() * 10) + 1;
        let t = "";
        for (let k = 0; k < len; k++) {
          t += str[Math.floor(Math.random() * 26)];
        }
        words.add(t);
      }
      return JSON.stringify([...words.values()]);
    };
  });
});
