import { maxSatisfied } from "./maxSatisfied";

describe("maxSatisfied", () => {
  it("case 1", () => {
    const customers = [1, 0, 1, 2, 1, 1, 7, 5],
      grumpy = [0, 1, 0, 1, 0, 1, 0, 1],
      minutes = 3;
    const total = maxSatisfied(customers, grumpy, minutes);
    expect(total).toBe(16);
  });
});
