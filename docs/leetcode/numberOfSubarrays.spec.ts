import { numberOfSubarrays } from "./numberOfSubarrays";

describe("numberOfSubarrays", () => {
  it("case 1", () => {
    const nums = [1, 1, 2, 1, 1],
      k = 3;
    const size = numberOfSubarrays(nums, k);
    expect(size).toBe(2);
  });

  it("case 2", () => {
    const nums = [2, 4, 6],
      k = 1;
    const size = numberOfSubarrays(nums, k);
    expect(size).toBe(0);
  });

  it("case 3", () => {
    const nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2],
      k = 2;
    const size = numberOfSubarrays(nums, k);
    expect(size).toBe(16);
  });

  it("case 4", () => {
    const nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2],
      k = 1;
    const size = numberOfSubarrays(nums, k);
    expect(size).toBe(24);
  });

  it("case 5", () => {
    const nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1],
      k = 1;
    const size = numberOfSubarrays(nums, k);
    expect(size).toBe(28);
  });

  it("case 6", () => {
    const nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1],
      k = 1;
    const size = numberOfSubarrays(nums, k);
    expect(size).toBe(29);
  });

  it("case 7", () => {
    const nums = [2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 2, 1, 1],
      k = 1;
    const size = numberOfSubarrays(nums, k);
    expect(size).toBe(24);
  });
});
