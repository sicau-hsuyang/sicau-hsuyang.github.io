import { snail } from "./snail";

describe("snail test", () => {
  it("case 1", () => {
    const arr = [
      19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15,
    ];
    const rowsCount = 5;
    const colsCount = 4;
    const res = snail(arr, rowsCount, colsCount);
    const expectVal = [
      [19, 17, 16, 15],
      [10, 1, 14, 4],
      [3, 2, 12, 20],
      [7, 5, 18, 11],
      [9, 8, 6, 13],
    ];
    expect(res).toEqual(expectVal);
  });

  it("case 2", () => {
    const arr = [1, 2, 3, 4];
    const rowsCount = 1;
    const colsCount = 4;
    const res = snail(arr, rowsCount, colsCount);
    const expectVal = [[1, 2, 3, 4]];
    expect(res).toEqual(expectVal);
  });

  it("case 3", () => {
    const arr = [1, 3];
    const rowsCount = 2;
    const colsCount = 2;
    const res = snail(arr, rowsCount, colsCount);
    const expectVal = [];
    expect(res).toEqual(expectVal);
  });
});
