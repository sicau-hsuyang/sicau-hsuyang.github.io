import { smallestNumber } from "./smallestNumber";

describe("smallestNumber", () => {
  it("case 1", () => {
    const pattern = "IIIDIDDD";
    const val = smallestNumber(pattern);
    expect(val).toBe("123549876");
  });
});
