import { countSubarrays } from "./countSubarrays";

describe("countSubarrays", () => {
  it("case 1", () => {
    const nums = [1, 3, 2, 3, 3],
      k = 2;
    const total = countSubarrays(nums, k);
    expect(total).toBe(6);
  });

  it("case 2", () => {
    const nums = [1, 3, 2, 3, 3],
      k = 1;
    const total = countSubarrays(nums, k);
    expect(total).toBe(13);
  });
});
