import { mergerArray } from "./merge-array";

describe("merge array", () => {
  it("merge", () => {
    const arrList = [
      [1, 4, 5],
      [4, 5, 8],
      [1, 2, 2, 5, 8, 9, 10],
    ];
    const results = mergerArray(arrList);
    const sorted = arrList
      .reduce((acc, arr) => {
        return acc.concat(arr);
      })
      .sort((a, b) => a - b)
      .toString();
    expect(results.toString()).toBe(sorted);
  });
});
