import { F1, F2, sum } from "./recursion";

describe("fibonacci", () => {
  it("recursion", () => {
    let now = Date.now();
    const f1 = F1(34);
    console.log(Date.now() - now);
    now = Date.now();
    console.log(f1);
    const f2 = F2(34);
    console.log(Date.now() - now);
    console.log(f2);
  });

  it("it tail recursion optimize", () => {
    const val = sum(10000000);
    expect(val).toBe(55);
  });
});
