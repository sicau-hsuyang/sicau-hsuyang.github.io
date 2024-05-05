import { countCompleteSubarrays } from "./countCompleteSubarrays";

describe("countCompleteSubarrays", () => {
  it("case 1", () => {
    const nums = [1, 3, 1, 2, 2];
    const total = countCompleteSubarrays(nums);
    expect(total).toBe(4);
  });

  it("case 5", () => {
    const nums = [5, 5, 5, 5];
    const total = countCompleteSubarrays(nums);
    expect(total).toBe(10);
  });
});
