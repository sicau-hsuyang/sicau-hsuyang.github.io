import { isPossible } from "./isPossible";

describe("isPossible", () => {
  it("case 1", () => {
    const nums = [1, 2, 3, 3, 4, 5];
    const possible = isPossible(nums);
    expect(possible).toBe(true);
  });

  it("case 2", () => {
    const nums = [1, 2, 3, 3, 4, 4, 5, 5];
    const possible = isPossible(nums);
    expect(possible).toBe(true);
  });

  it("case 3", () => {
    const nums = [1, 2, 3, 4, 4, 5];
    const possible = isPossible(nums);
    expect(possible).toBe(false);
  });

  it("case 4", () => {
    const nums = [1, 3, 3, 4, 4, 7, 8, 8, 9, 10];
    const possible = isPossible(nums);
    expect(possible).toBe(false);
  });

  it("case 5", () => {
    const nums = [1, 2, 3, 4, 5, 5, 6, 7];
    const possible = isPossible(nums);
    expect(possible).toBe(true);
    /**
     123
     45
     567
     */
  });

  it("case 6", () => {
    const nums = [1, 2, 3, 5, 5, 6, 7];
    const possible = isPossible(nums);
    expect(possible).toBe(false);
    /**
     123
     45
     567
     */
  });
});
