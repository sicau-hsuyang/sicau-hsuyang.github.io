import { combine } from "./combine";

describe("combine", () => {
  it("case 1", () => {
    const n = 4,
      k = 2;
    const results = combine(n, k);
    console.log(results);
  });

  it("case 2", () => {
    const n = 4,
      k = 3;
    const results = combine(n, k);
    console.log(results);
  });

  it("case 3", () => {
    const n = 4,
      k = 4;
    const results = combine(n, k);
    console.log(results);
  });
});
