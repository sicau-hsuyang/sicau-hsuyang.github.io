import { divisorSubstrings } from "./divisorSubstrings";

describe("divisorSubstrings", () => {
  it("case 1", () => {
    const num = 240,
      k = 2;
    divisorSubstrings(num, k);
  });

  it("case 2", () => {
    const num = 430043,
      k = 2;
    divisorSubstrings(num, k);
  });
});
