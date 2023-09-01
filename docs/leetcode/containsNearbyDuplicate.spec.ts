import { containsNearbyDuplicate } from "./containsNearbyDuplicate";

describe("containsNearbyDuplicate", () => {
  it("1", () => {
    const nums = [1, 2, 3, 1];
    const k = 3;
    const res = containsNearbyDuplicate(nums, k);
    expect(res).toBe(true);
  });

  it("2", () => {
    const nums = [1, 0, 1, 1];
    const k = 1;
    const res = containsNearbyDuplicate(nums, k);
    expect(res).toBe(true);
  });

  it("3", () => {
    const nums = [1, 2, 3, 1, 2, 3];
    const k = 2;
    const res = containsNearbyDuplicate(nums, k);
    expect(res).toBe(false);
  });
});
