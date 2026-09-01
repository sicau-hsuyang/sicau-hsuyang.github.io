import { decodeString } from "./decodeString";

describe("decodeString", () => {
  it("case 1", () => {
    const s = "3[a]2[bc]";
    decodeString(s);
  });

  it("case 2", () => {
    const s = "3[a2[c]]";
    decodeString(s);
  });
});
