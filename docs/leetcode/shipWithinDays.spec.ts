import { shipWithinDays } from "./shipWithinDays";

describe("shipWithinDays", () => {
  it("case 1", () => {
    const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      days = 5;
    const res = shipWithinDays(weights, days);
    console.log(res);
  });

  it("case 2", () => {
    const weights = [3, 2, 2, 4, 1, 4],
      days = 3;
    const res = shipWithinDays(weights, days);
    console.log(res);
  });

  it("case 3", () => {
    const weights = [1, 2, 3, 1, 1],
      days = 4;
    const res = shipWithinDays(weights, days);
    console.log(res);
  });
});
