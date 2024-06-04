import { minMutation } from "./minMutation";

describe("minMutation", () => {
  it("case 1", () => {
    const start = "AACCGGTT",
      end = "AACCGGTA",
      bank = ["AACCGGTA"];

    const count = minMutation(start, end, bank);
    expect(count).toBe(1);
  });
});
