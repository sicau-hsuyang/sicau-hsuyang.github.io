import { reformat } from "./reformat";

describe("reformat", () => {
  it("case 1", () => {
    const str = "a0b1c2";
    const results = reformat(str);
  });

  it("case2", () => {
    const str = "a0b1c2c";
    const results = reformat(str);
  });
});
