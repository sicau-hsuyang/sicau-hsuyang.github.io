import { threeSumMulti } from "./threeSumMulti";

describe("threeSumMulti", () => {
  it("case 1", () => {
    const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
      target = 8;
    const total = threeSumMulti(arr, target);
    console.log(total);
  });

  it("case 2", () => {
    const arr = [1, 1, 2, 2, 2, 2],
      target = 5;
    const total = threeSumMulti(arr, target);
    console.log(total);
  });
});
