import { maxProfit } from "./maxProfit_withFreezeCycle";

describe("maxProfit", () => {
  it("case 1", () => {
    const prices = [1, 2, 3, 0, 2];
    const profit = maxProfit(prices);
    console.log(profit);
  });
});
