import { findDiagonalOrder } from "./findDiagonalOrder";

describe("findDiagonalOrder", () => {
  it("case 1", () => {
    const mat = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const res = findDiagonalOrder(mat);
    console.log(res);
  });

  it("case 2", () => {
    const mat = [
      [1, 2, 3],
      [4, 5, 6],
      // [7, 8, 9],
    ];
    const res = findDiagonalOrder(mat);
    console.log(res);
  });

  it("case 3", () => {
    const mat = [
      [1, 2],
      [4, 5],
      [7, 8],
    ];
    const res = findDiagonalOrder(mat);
    console.log(res);
  });

  it("case 4", () => {
    const mat = [[1], [4], [7]];
    const res = findDiagonalOrder(mat);
    console.log(res);
  });

  it("case 5", () => {
    const mat = [
      [1, 2, 3],
      // [4, 5, 6],
      // [7, 8, 9],
    ];
    const res = findDiagonalOrder(mat);
    console.log(res);
  });
});
