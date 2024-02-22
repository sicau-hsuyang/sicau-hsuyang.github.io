import { thirdMax } from "./thirdMax";

describe("thirdMax", () => {
  it("case 1", () => {
    const nums = [2, 2, 3, 1];
    const res = thirdMax(nums);
    expect(res).toBe(1);
  });

  it("case 2", () => {
    const nums = [7, 6, 5, 4, 3, 2, 1];
    const res = thirdMax(nums);
    expect(res).toBe(5);
  });
});
