import { maxProfit } from "./maxProfit_3";

describe("maxProfit", () => {
  it("case 1", () => {
    const prices = [3, 3, 5, 0, 0, 3, 1, 4];
    const profit = maxProfit(prices);
    console.log(profit);
  });
});
