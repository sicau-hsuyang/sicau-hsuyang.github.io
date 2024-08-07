import { findEvenNumbers } from "./findEvenNumbers";

describe("findEvenNumbers", () => {
  it("case 1", () => {
    const digits = [2, 1, 3, 0];
    const res = findEvenNumbers(digits);
    console.log(res);
  });

  it("case 2", () => {
    const digits = [2, 2, 8, 8, 2];
    const res = findEvenNumbers(digits);
    console.log(res);
  });
});
