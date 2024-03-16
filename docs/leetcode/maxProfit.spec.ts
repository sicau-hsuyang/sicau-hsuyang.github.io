import { maxProfit } from "./maxProfit";

describe("maxProfit", () => {
  it("case 1", () => {
    const prices = [7, 1, 5, 3, 6, 4];
    const profit = maxProfit(prices);
    expect(profit).toBe(5);
  });
});
