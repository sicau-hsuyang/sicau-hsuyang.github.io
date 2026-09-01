import { minSubArrayLen } from "./minSubArrayLen";

describe("minSubArrayLen", () => {
  it("case 1", () => {
    const nums = [2, 3, 1, 2, 4, 3],
      target = 7;
    const res = minSubArrayLen(target, nums);
    expect(res).toEqual(2);
  });

  it("case 2", () => {
    const nums = [1, 1, 1, 1, 1, 1, 1, 1],
      target = 11;
    const res = minSubArrayLen(target, nums);
    expect(res).toEqual(2);
  });
});
