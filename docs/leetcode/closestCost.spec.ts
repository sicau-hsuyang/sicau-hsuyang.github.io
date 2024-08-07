import { closestCost } from "./closestCost";

describe("closestCost", () => {
  it("case 1", () => {
    const baseCosts = [1, 7],
      toppingCosts = [3, 4],
      target = 10;
    const closestTarget = closestCost(baseCosts, toppingCosts, target);
    console.log(closestTarget);
  });

  it("case 2", () => {
    const baseCosts = [2, 3],
      toppingCosts = [4, 5, 100],
      target = 18;
    const closestTarget = closestCost(baseCosts, toppingCosts, target);
    console.log(closestTarget);
  });

  it("case 3", () => {
    const baseCosts = [3, 10],
      toppingCosts = [2, 5],
      target = 9;
    const closestTarget = closestCost(baseCosts, toppingCosts, target);
    console.log(closestTarget);
  });

  it("case 35", () => {
    const baseCosts = [3, 10 ,11, 12, 4, 6, 7, 8, 9, 2],
      toppingCosts = [2, 5, 6, 8, 3 , 4 ,8, 9, 2, 1],
      target = 10000;
    const closestTarget = closestCost(baseCosts, toppingCosts, target);
    console.log(closestTarget);
  });
});
