import { minMutation } from "./minMutation";

describe("minMutation", () => {
  it("case 1", () => {
    const start = "AACCGGTT",
      end = "AACCGGTA",
      bank = ["AACCGGTA"];

    const count = minMutation(start, end, bank);
    expect(count).toBe(1);
  });

  it("case 2", () => {
    const start = "AACCGGTT",
      end = "AAACGGTA",
      bank = ["AACCGGTA", "AACCGCTA", "AAACGGTA"];
    const count = minMutation(start, end, bank);
    expect(count).toBe(2);
  });

  it("case 3", () => {
    const start = "AAAAACCC",
      end = "AACCCCCC",
      bank = ["AAAACCCC", "AAACCCCC", "AACCCCCC"];
    const count = minMutation(start, end, bank);
    expect(count).toBe(3);
  });
});
