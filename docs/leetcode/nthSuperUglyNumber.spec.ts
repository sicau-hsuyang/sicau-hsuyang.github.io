import { nthSuperUglyNumber } from "./nthSuperUglyNumber";

describe("nthSuperUglyNumber", () => {
  it("case 1", () => {
    const n = 12,
      primes = [2, 7, 13, 19];
    nthSuperUglyNumber(n, primes);
  });
});
