import { subsetsWithDup } from "./subsetsWithDup";

describe("subsetsWithDup", () => {
  it("case 1", () => {
    const nums = [1, 2, 2, 3, 3];
    const results = subsetsWithDup(nums);
    console.log(results);
  });
});
