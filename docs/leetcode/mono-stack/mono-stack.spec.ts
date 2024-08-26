import { monoStack } from "./mono-stack";

describe("monoStack", () => {
  it("case 1", () => {
    const nums = [9, 2, 8, 1, 7, 5, 6, 10, 3, 4];
    monoStack(nums);
  });

  it("case 2", () => {
    const nums = [9, 2, 10, 7, 8, 1, 7, 5, 7, 6, 2, 3, 10, 3, 4];
    monoStack(nums);
  });
});
