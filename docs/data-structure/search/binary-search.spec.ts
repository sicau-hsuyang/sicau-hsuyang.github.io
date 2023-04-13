import { binarySearch } from "./binary-search";
describe("binarySearch", () => {
  it("should return the correct index when target exists in array", () => {
    const arr = [1, 3, 5, 7, 9];
    const target = 5;
    const expectedIndex = 2;
    const result = binarySearch(arr, target);
    expect(result).toEqual(expectedIndex);
  });

  it("should return -1 when target does not exist in array", () => {
    const arr = [1, 3, 5, 7, 9];
    const target = 2;
    const expectedIndex = -1;
    const result = binarySearch(arr, target);
    expect(result).toEqual(expectedIndex);
  });

  it("should return -1 when given an empty array", () => {
    const arr: number[] = [];
    const target = 2;
    const expectedIndex = -1;
    const result = binarySearch(arr, target);
    expect(result).toEqual(expectedIndex);
  });

  it("should return -1 when given a non-array argument", () => {
    const arr = "not an array";
    const target = 2;
    const expectedIndex = -1;
    const result = binarySearch(arr as any, target);
    expect(result).toEqual(expectedIndex);
  });
});
