import { exist } from "./exist";

describe("exist", () => {
  it("case 1", () => {
    const board = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"],
      ],
      word = "ABCCED";
    const flag = exist(board, word);
    console.log(flag);
  });

  it("case 3", () => {
    const board = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"],
      ],
      word = "SEE";
    const flag = exist(board, word);
    console.log(flag);
  });

  it("case 2", () => {
    const board = [
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"],
        ["A", "A", "A", "A", "A", "A"],
      ],
      word = "AAAAAAAAAAAAAAB";
    const flag = exist(board, word);
    console.log(flag);
  });
});
