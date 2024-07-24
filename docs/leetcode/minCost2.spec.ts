import { minCost } from "./minCost2";

describe("minCost", () => {
  it("case 1", () => {
    const costs = [
      [17, 2, 17],
      [16, 16, 5],
      [14, 3, 19],
    ];
    const cost = minCost(costs);
    console.log(cost);
  });
});
