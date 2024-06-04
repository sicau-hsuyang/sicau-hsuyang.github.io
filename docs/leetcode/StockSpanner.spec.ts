import { StockSpanner } from "./StockSpanner";

const spanner = new StockSpanner();

describe("StockSpanner", () => {
  it("case 1", () => {
    const nums = [100, 80, 60, 70, 60, 75, 85];
    const target = [1, 1, 1, 2, 1, 4, 6];
    for (let i = 0; i < nums.length; i++) {
      const val = spanner.next(nums[i]);
      expect(val).toBe(target[i]);
    }
  });
});
