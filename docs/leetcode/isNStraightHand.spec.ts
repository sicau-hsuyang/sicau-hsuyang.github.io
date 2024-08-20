import { isNStraightHand } from "./isNStraightHand";

describe("isNStraightHand", () => {
  it("case 1", () => {
    const hand = [1, 2, 3, 6, 2, 3, 4, 7, 8],
      groupSize = 3;
    const res = isNStraightHand(hand, groupSize);
    console.log(res);
  });

  it("case 2", () => {
    const hand = [1, 2, 3, 6, 2, 3, 4, 7, 8],
      groupSize = 1;
    const res = isNStraightHand(hand, groupSize);
    console.log(res);
  });

  it("case 3", () => {
    const hand = [1, 2, 3, 6, 2, 3, 4, 7, 8],
      groupSize = 4;
    const res = isNStraightHand(hand, groupSize);
    console.log(res);
  });

  it("case 4", () => {
    const hand = [3, 4, 7, 4, 6, 3, 6, 5, 2, 8],
      groupSize = 2;
    const res = isNStraightHand(hand, groupSize);
    console.log(res);
  });

  it("case 5", () => {
    const hand = [1, 2, 3, 3, 4, 4, 5, 6],
      groupSize = 4;
    const res = isNStraightHand(hand, groupSize);
    console.log(res);
  });
});
