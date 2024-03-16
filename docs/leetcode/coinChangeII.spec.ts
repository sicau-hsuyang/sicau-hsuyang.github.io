import { change } from "./coinChangeII";

describe("coinChange", () => {
  it("case 1", () => {
    const amount = 5,
      coins = [1, 2, 5];
    const plan = change(amount, coins);
    expect(plan).toBe(4);
  });
});
