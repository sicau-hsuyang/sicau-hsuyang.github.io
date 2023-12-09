import { minSubArrayLen } from "./minSubArrayLen";

describe("minSubArrayLen", () => {
  it("case 1", () => {
    const nums = [2, 3, 1, 2, 4, 3],
      target = 7;
    const res = minSubArrayLen(target, nums);
    expect(res).toEqual(2);
  });
});
