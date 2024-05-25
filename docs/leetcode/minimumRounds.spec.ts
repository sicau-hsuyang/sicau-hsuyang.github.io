import { minimumRounds } from "./minimumRounds";

describe("minimumRounds", () => {
  it("case 1", () => {
    const tasks = [2, 2, 3, 3, 2, 4, 4, 4, 4, 4];
    const total = minimumRounds(tasks);
    expect(total).toBe(4);
  });

  it("case 2", () => {
    const tasks = [7, 7, 7, 7, 7, 7];
    const total = minimumRounds(tasks);
    expect(total).toBe(2);
  });
});
