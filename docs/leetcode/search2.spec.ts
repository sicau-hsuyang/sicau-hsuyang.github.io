import { search } from "./search2";

describe("search2", () => {
  it("case 1", () => {
    const nums = [2, 5, 6, 0, 0, 1, 2],
      target = 0;
    const res = search(nums, target);
    console.log(res);
  });

  it("case 2", () => {
    const nums = [0, 0, 1, 2, 5, 6],
      target = 0;
    const res = search(nums, target);
    console.log(res);
  });

  it("case 3", () => {
    const nums = [6, 6, 6, 0, 1, 1, 1, 2, 5],
      target = 0;
    const res = search(nums, target);
    console.log(res);
  });
});
