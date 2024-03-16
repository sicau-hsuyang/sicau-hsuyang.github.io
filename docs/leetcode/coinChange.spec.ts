import { coinChange } from "./coinChange";

describe("coinChange", () => {
  it("case 1", () => {
    const coins = [1, 2, 5],
      amount = 11;
    const plan = coinChange(coins, amount);
    expect(plan).toBe(3);
  });

  it("case 2", () => {
    const coins = [2],
      amount = 3;
    const plan = coinChange(coins, amount);
    expect(plan).toBe(-1);
  });

  it("case 3", () => {
    const coins = [429, 171, 485, 26, 381, 31, 290],
      amount = 8440;
    const plan = coinChange(coins, amount);
    expect(plan).toBe(-1);
  });

  it("case 4", () => {
    console.log(Date.now());
    let now = Date.now();
    const coins = [1],
      amount = 10000;
    const plan = coinChange(coins, amount);
    console.log(Date.now() - now);
    expect(plan).toBe(10000);
  });
});
