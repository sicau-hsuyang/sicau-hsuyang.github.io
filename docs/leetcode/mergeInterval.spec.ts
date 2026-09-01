import { merge } from "./mergeInterval";

describe("mergeInterval", () => {
  it("case 1", () => {
    const intervals = [
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ];
    merge(intervals);
  });

  it("case 2", () => {
    const intervals = [
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
      [4, 10],
      [1, 1],
    ];
    merge(intervals);
  });

  it("case 3", () => {
    const intervals = [
      [1, 4],
      [2, 3],
    ];
    const res = merge(intervals);
    console.log(res)
  });
});
