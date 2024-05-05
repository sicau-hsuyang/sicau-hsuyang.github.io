import { maxConsecutiveAnswers } from "./maxConsecutiveAnswers";

describe("maxConsecutiveAnswers", () => {
  it("case 1", () => {
    const answerKey = "TTFF",
      k = 2;
    const d = maxConsecutiveAnswers(answerKey, k);
    expect(d).toBe(4);
  });

  it("case 2", () => {
    const answerKey = "TFFT",
      k = 1;
    const d = maxConsecutiveAnswers(answerKey, k);
    expect(d).toBe(3);
  });

  it("case 3", () => {
    const answerKey = "TTFTTFTT",
      k = 1;
    const d = maxConsecutiveAnswers(answerKey, k);
    expect(d).toBe(5);
  });

  it("case 4", () => {
    const answerKey = "TTFFFTFTFTFTFTFT",
      k = 4;
    const d = maxConsecutiveAnswers(answerKey, k);
    expect(d).toBe(11);
  });
});
