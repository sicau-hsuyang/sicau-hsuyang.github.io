import { judgePoint24 } from "./judgePoint24";

describe("judgePoint24", () => {
  it("case 1", () => {
    const cards = [4, 1, 8, 7];
    judgePoint24(cards);
  });

  it("case 2", () => {
    const cards = [1, 5, 9, 1];
    judgePoint24(cards);
  });

  it("case 3", () => {
    const cards = [1, 3, 4, 6];
    judgePoint24(cards);
  });

  it("case 4", () => {
    const cards = [3, 3, 8, 8];
    judgePoint24(cards);
  });
});
