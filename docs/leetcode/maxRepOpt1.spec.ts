import { maxRepOpt1 } from "./maxRepOpt1";

describe("maxRepOpt1", () => {
  it("case 1", () => {
    const text = "ababa";
    maxRepOpt1(text);
  });

  it("case 2", () => {
    const text = "abbab";
    maxRepOpt1(text);
  })
});
