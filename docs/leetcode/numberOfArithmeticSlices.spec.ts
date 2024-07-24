import { numberOfArithmeticSlices } from "./numberOfArithmeticSlices";

describe("numberOfArithmeticSlices", () => {
  it("case 1", () => {
    const nums = [1, 2, 3, 4];
    const res = numberOfArithmeticSlices(nums);
    console.log(res);
  });

  it("case 2", () => {
    const nums = [
      1, 2, 3, 4, 7, 9, 11, 14, 16, 18, 22, 24, 26, 28, 30, 48, 52, 100, 200,
      300, 400, 500,
    ];
    const res = numberOfArithmeticSlices(nums);
    console.log(res);
  });
});
