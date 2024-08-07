import { bestTiming } from "./bestTiming";

describe("bestTiming", () => {
  it("case 1", () => {
    const prices = [3, 6, 2, 9, 8, 5];
    const profit = bestTiming(prices);
    expect(profit).toBe(7);
  });
});
