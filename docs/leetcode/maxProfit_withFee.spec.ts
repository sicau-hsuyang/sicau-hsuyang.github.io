import { maxProfit } from "./maxProfit_withFee";

describe("maxProfit", () => {
  it("case 1", () => {
    const prices = [1, 3, 2, 8, 4, 9],
      fee = 2;
    const profit = maxProfit(prices, fee);
    console.log(profit);
  });

  it("case 2", () => {
    const prices = [1,3,7,5,10,3], fee = 3
    const profit = maxProfit(prices, fee);
    console.log(profit);
  })
});
