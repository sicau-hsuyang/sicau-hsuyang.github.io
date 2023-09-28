import { missingNumber } from "./missingNumber";

describe("missingNumber", () => {
  it("case 1", () => {
    const nums = [0, 1];
    const res = missingNumber(nums);
    expect(res).toBe(2);
  });
});
