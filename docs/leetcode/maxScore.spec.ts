import { maxScore } from "./maxScore";

describe("maxScore", () => {
  it("case 1", () => {
    const cardPoints = [1, 2, 3, 4, 5, 6, 1],
      k = 3;
    const sum = maxScore(cardPoints, k);
    expect(sum).toBe(12);
  });

  it("case 2", () => {
    const cardPoints = [2, 2, 2],
      k = 2;
    const sum = maxScore(cardPoints, k);
    expect(sum).toBe(4);
  });

  it("case 3", () => {
    const cardPoints = [9, 7, 7, 9, 7, 7, 9],
      k = 7;
    const sum = maxScore(cardPoints, k);
    expect(sum).toBe(55);
  });

  it("case 4", () => {
    const cardPoints = [1, 1000, 1],
      k = 1;
    const sum = maxScore(cardPoints, k);
    expect(sum).toBe(1);
  });

  it("case 5", () => {
    const cardPoints = [1, 79, 80, 1, 1, 1, 200, 1],
      k = 3;
    const sum = maxScore(cardPoints, k);
    expect(sum).toBe(202);
  });
});
