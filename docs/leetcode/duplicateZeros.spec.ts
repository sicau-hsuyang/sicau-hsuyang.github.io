import { duplicateZeros } from "./duplicateZeros";

describe("duplicateZeros", () => {
  it("case 1", () => {
    const arr = [1, 0, 2, 3, 0, 4, 5, 0];
    duplicateZeros(arr);
    expect(arr).toEqual([1, 0, 0, 2, 3, 0, 0, 4]);
  });

  it("case 2", () => {
    const arr = [1, 2, 3];
    duplicateZeros(arr);
    expect(arr).toEqual([1, 2, 3]);
  });

  it("case 3", () => {
    const arr = [1, 2, 3, 0];
    duplicateZeros(arr);
    expect(arr).toEqual([1, 2, 3, 0]);
  });

  it("case 4", () => {
    const arr = [0, 1, 2, 3, 0];
    duplicateZeros(arr);
    expect(arr).toEqual([0, 0, 1, 2, 3]);
  });
});
