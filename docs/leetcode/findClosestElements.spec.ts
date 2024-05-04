import { findClosestElements } from "./findClosestElements";

describe("findClosestElements", () => {
  it("case 1", () => {
    const arr = [1, 2, 3, 4, 5],
      k = 4,
      x = 3;
    findClosestElements(arr, k, x);
  });

  it("case 2", () => {
    const arr = [1, 2, 3, 4, 4, 4, 5],
      k = 4,
      x = 4;
    findClosestElements(arr, k, x);
  });
});
