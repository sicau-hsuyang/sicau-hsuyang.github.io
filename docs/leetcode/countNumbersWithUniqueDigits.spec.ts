import { countNumbersWithUniqueDigits } from "./countNumbersWithUniqueDigits";

describe("countNumbersWithUniqueDigits", () => {
  it("case 1", () => {
    const n = 3;
    const total = countNumbersWithUniqueDigits(n);
    console.log(total);
  });

  it("case 2", () => {
    const n = 2;
    const total = countNumbersWithUniqueDigits(n);
    console.log(total);
  });
});
