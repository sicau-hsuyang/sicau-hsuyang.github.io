import { maxProfit } from "./maxProfit_2";

describe("maxProfit", () => {
  it("case 1", () => {
    const prices = [7, 1, 5, 3, 6, 4];
    const profit = maxProfit(prices);
    console.log(profit);
  });

  it("case 2", () => {
    const prices = [1, 2, 3, 4, 5];
    const profit = maxProfit(prices);
    console.log(profit);
  });

  it("case 3", () => {
    const prices = [7, 6, 4, 3, 1];
    const profit = maxProfit(prices);
    console.log(profit);
  });
});
