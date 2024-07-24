import { change } from "./change";

describe("change", () => {
  it("case 1", () => {
    const amount = 5,
      coins = [1, 2, 5];
    const res = change(amount, coins);
    console.log(res)
  });
});
