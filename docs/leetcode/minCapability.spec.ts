import { minCapability } from "./minCapability";

describe("minCapability", () => {
  it("case 1", () => {
    const nums = [2, 3, 5, 9],
      k = 2;
    const total = minCapability(nums, k);
    console.log(total);
  });

  it("case 2", () => {
    const nums = [2, 7, 9, 3, 1],
      k = 2;
    const total = minCapability(nums, k);
    console.log(total);
  });
});
