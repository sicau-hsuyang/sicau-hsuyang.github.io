import { makeSquare } from "./makeSquare";

describe("makeSquare", () => {
  it("case 1", () => {
    const a = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 102];
    const flag = makeSquare(a);
    console.log(flag);
  });
});
