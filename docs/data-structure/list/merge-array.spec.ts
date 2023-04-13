import { merge, mergerArray } from "./merge-array";
describe("merge", () => {
  it("should merge two sorted arrays", () => {
    const arr1 = [1, 3, 5];
    const arr2 = [2, 4, 6];
    const result = merge(arr1, arr2);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("should handle empty arrays", () => {
    const arr1: number[] = [];
    const arr2: number[] = [];
    const result = merge(arr1, arr2);
    expect(result).toEqual([]);
  });

  it("should handle one empty array", () => {
    const arr1 = [1, 3, 5];
    const arr2: number[] = [];
    const result = merge(arr1, arr2);
    expect(result).toEqual([1, 3, 5]);
  });
});

describe("mergeArray", () => {
  it("should merge multiple arrays", () => {
    const arrList = [
      [1, 4, 6],
      [2, 3, 5],
      [7, 8],
    ];
    const result = mergerArray(arrList);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should handle empty array list", () => {
    const arrList: number[][] = [];
    const result = mergerArray(arrList);
    expect(result).toEqual([]);
  });

  it("should handle array list with one array", () => {
    const arrList = [[1, 3, 5]];
    const result = mergerArray(arrList);
    expect(result).toEqual([1, 3, 5]);
  });
});
