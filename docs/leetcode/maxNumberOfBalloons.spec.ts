import { maxNumberOfBalloons } from "./maxNumberOfBalloons";

describe("maxNumberOfBalloons", () => {
  it("case 1", () => {
    const str = "loonbalxballpoonballoo";
    const res = maxNumberOfBalloons(str);
    expect(res).toBe(2);
  });
});
