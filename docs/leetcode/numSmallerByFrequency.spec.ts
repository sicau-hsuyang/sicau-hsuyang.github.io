import { binarySearch, numSmallerByFrequency } from "./numSmallerByFrequency";

describe("numSmallerByFrequency", () => {
  it("case 1", () => {
    const queries = ["cbd"],
      words = ["zaaaz"];
    const res = numSmallerByFrequency(queries, words);
    expect(res).toEqual([1]);
  });

  it("case 2", () => {
    const queries = ["bbb", "cc"],
      words = ["a", "aa", "aaa", "aaaa"];
    const res = numSmallerByFrequency(queries, words);
    expect(res).toEqual([1, 2]);
  });

  it("case 3", () => {
    const queries = [
      "bba",
      "abaaaaaa",
      "aaaaaa",
      "bbabbabaab",
      "aba",
      "aa",
      "baab",
      "bbbbbb",
      "aab",
      "bbabbaabb",
    ];
    const words = [
      "aaabbb",
      "aab",
      "babbab",
      "babbbb",
      "b",
      "bbbbbbbbab",
      "a",
      "bbbbbbbbbb",
      "baaabbaab",
      "aa",
    ];
    const res = numSmallerByFrequency(queries, words);
    expect(res).toEqual([6, 1, 1, 2, 3, 3, 3, 1, 3, 2]);
  });
});

describe("binary search", () => {
  it("case 1", () => {
    const nums = [1, 21, 32, 43, 50, 67, 75, 86, 91];
    const target = 5;
    const len = binarySearch(nums, target);
    expect(len).toBe(8);
  });

  it("case 2", () => {
    const nums = [1, 21, 32, 43, 50, 67, 75, 86, 91];
    const target = -1;
    const len = binarySearch(nums, target);
    expect(len).toBe(9);
  });

  it("case 3", () => {
    const nums = [1, 21];
    const target = 100;
    const len = binarySearch(nums, target);
    expect(len).toBe(0);
  });

  it("case 4", () => {
    const nums = [1];
    const target = 100;
    const len = binarySearch(nums, target);
    expect(len).toBe(0);
  });

  it("case 5", () => {
    const nums = [1];
    const target = -1;
    const len = binarySearch(nums, target);
    expect(len).toBe(1);
  });

  it("case 6", () => {
    const nums = [1, 21, 32, 43, 50, 67, 75, 86, 91];
    const target = 44;
    const len = binarySearch(nums, target);
    expect(len).toBe(5);
  });

  it("case 7", () => {
    const nums = [1, 21, 32, 43, 50, 67, 75, 86, 91];
    const target = 86;
    const len = binarySearch(nums, target);
    expect(len).toBe(1);
  });

  it("case 8", () => {
    const nums = [3];
    const target = 1;
    const len = binarySearch(nums, target);
    expect(len).toBe(1);
  });

  it("case 9", () => {
    const nums = [3, 4, 5, 6];
    const target = 4;
    const len = binarySearch(nums, target);
    expect(len).toBe(2);
  });

  it("case 10", () => {
    const nums = [1, 1, 1, 1, 2, 2, 2, 3, 5, 10];
    const target = 1;
    const len = binarySearch(nums, target);
    expect(len).toBe(6);
  });
});
