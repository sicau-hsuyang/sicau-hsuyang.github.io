import { buildArray } from "./buildArray";

describe("buildArray", () => {
  it("case 1", () => {
    const target = [1, 3],
      n = 3;
    const res = buildArray(target, n);
    console.log(res);
  });
});
