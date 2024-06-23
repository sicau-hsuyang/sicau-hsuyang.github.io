import { rotateTheBox } from "./rotateTheBox";

describe("rotateTheBox", () => {
  it("case 1", () => {
    const box = [["#", ".", "#"]];
    rotateTheBox(box);
  });

  it("case 2", () => {
    const box = [
      ["#", ".", "*", "."],
      ["#", "#", "*", "."],
    ];
    rotateTheBox(box);
  });

  it("case 3", () => {
    const box = [
      ["#", "#", "*", ".", "*", "."],
      ["#", "#", "#", "*", ".", "."],
      ["#", "#", "#", ".", "#", "."],
    ];
    rotateTheBox(box);
  });
});
