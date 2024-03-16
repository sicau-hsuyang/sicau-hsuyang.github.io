import { subsets } from "./subsets";

describe("subsets", () => {
  it("case 1", () => {
    const nums = [1, 2, 3];
    const results = subsets(nums);
    results.forEach((v) => {
      v.sort((a, b) => {
        return a - b;
      });
    });
    results.sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      } else {
        return a[0] - b[0];
      }
    });
    const val = [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];
    val.forEach((v) => {
      v.sort((a, b) => {
        return a - b;
      });
    });
    val.sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      } else {
        return a[0] - b[0];
      }
    });
    expect(results).toEqual(val);
  });
});
