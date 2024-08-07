import { findDiagonalOrder } from "./findDiagonalOrder_2";

describe("findDiagonalOrder", () => {
  it("case 1", () => {
    const nums = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const res = findDiagonalOrder(nums);
    console.log(res);
  });

  it("case 1", () => {
    const nums = [
      [1, 2, 3, 4, 5],
      [6, 7],
      [8],
      [9, 10, 11],
      [12, 13, 14, 15, 16],
    ];
    const res = findDiagonalOrder(nums);
    console.log(res);
  });
});
