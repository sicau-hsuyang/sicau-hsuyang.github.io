import { maxScoreSightseeingPair } from "./maxScoreSightseeingPair";

describe("maxScoreSightseeingPair", () => {
  it("case 1", () => {
    const values = [8, 1, 5, 2, 6];
    const score = maxScoreSightseeingPair(values);
    console.log(score);
  });
});
