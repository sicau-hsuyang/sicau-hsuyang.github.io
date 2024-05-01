import { commonChars } from "./commonChars";

describe("commonChars", () => {
  it("case 1", () => {
    const words = [
      "acabcddd",
      "bcbdbcbd",
      "baddbadb",
      "cbdddcac",
      "aacbcccd",
      "ccccddda",
      "cababaab",
      "addcaccd",
    ];
    const results = commonChars(words);
    expect(results).toEqual([]);
  });
});
