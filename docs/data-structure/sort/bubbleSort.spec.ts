import { bubbleSort } from "./bubbleSort";
describe("bubbleSort", () => {
  it("should sort the array in ascending order", () => {
    const arr = [5, 2, 8, 3, 1];
    bubbleSort(arr);
    expect(arr).toEqual([1, 2, 3, 5, 8]);
  });

  it("should sort an empty array", () => {
    const arr: number[] = [];
    bubbleSort(arr);
    expect(arr).toEqual([]);
  });

  it("should sort an array with one element", () => {
    const arr = [1];
    bubbleSort(arr);
    expect(arr).toEqual([1]);
  });

  it("should sort a pre-sorted array", () => {
    const arr = [1, 2, 3, 4, 5];
    bubbleSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  it("should sort an array in descending order", () => {
    const arr = [5, 4, 3, 2, 1];
    bubbleSort(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });
});
