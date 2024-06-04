import { distributeCandies } from "./distributeCandies";

describe("distributeCandies", () => {
  it("case 1", () => {
    const n = 5,
      limit = 2;
    const total = distributeCandies(n, limit);
    console.log(total);
  });

  it("case 2", () => {
    const n = 3,
      limit = 3;
    const total = distributeCandies(n, limit);
    console.log(total);
  });
});
