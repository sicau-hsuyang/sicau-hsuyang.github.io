import { splitIntoFibonacci } from "./splitIntoFibonacci";

describe("splitIntoFibonacci", () => {
  it("case 1", () => {
    const num = "1101111";
    splitIntoFibonacci(num);
  });

  it("case 2", () => {
    const num = '0123'
    splitIntoFibonacci(num);
  })
});
