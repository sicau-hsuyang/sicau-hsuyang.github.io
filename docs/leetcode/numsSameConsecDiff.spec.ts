import { numsSameConsecDiff } from "./numsSameConsecDiff";

describe("numsSameConsecDiff", () => {
  it("case 1", () => {
    const sum = numsSameConsecDiff(3, 7);
    console.log(sum);
  });

  it("case 2", () => {
    const sum = numsSameConsecDiff(2, 0);
    console.log(sum);
  });
});
