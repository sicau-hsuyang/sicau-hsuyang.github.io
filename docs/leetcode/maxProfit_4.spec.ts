import { maxProfit } from "./maxProfit_4";

describe("maxProfit", () => {
  it("case 1", () => {
    const prices = [3, 3, 5, 0, 0, 3, 1, 4],
      k = 2;
    const profit = maxProfit(k, prices);
    console.log(profit);
  });

  it("case 2", () => {
    const prices = [3, 2, 6, 5, 0, 3],
      k = 2;
    const profit = maxProfit(k, prices);
    console.log(profit);
  });

  it("case 3", () => {
    const prices = [2, 4, 1],
      k = 2;
    const profit = maxProfit(k, prices);
    console.log(profit);
  });
});
