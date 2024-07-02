import { minRemoveToMakeValid } from "./minRemoveToMakeValid";

describe("minRemoveToMakeValid", () => {
  it("case 1", () => {
    const s = "lee(t(c)o)de)";
    minRemoveToMakeValid(s);
  });

  it("case 2", () => {
    const s = "))((";
    minRemoveToMakeValid(s);
  });
});
