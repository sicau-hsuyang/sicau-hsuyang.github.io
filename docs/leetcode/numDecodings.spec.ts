import { numDecodings } from "./numDecodings";

describe("numDecodings", () => {
  it("case 1", () => {
    const s = "226";
    const val = numDecodings(s);
    console.log(val);
  });

  it("case 2", () => {
    const s = "1562326";
    const val = numDecodings(s);
    console.log(val);
  });

  it("case 3", () => {
    const s = "10";
    const val = numDecodings(s);
    console.log(val);
  });

  it("case 4", () => {
    const s = "2839";
    const val = numDecodings(s);
    console.log(val);
  });

  it("Case 5", () => {
    const s = '1011010110'
    const val = numDecodings(s);
    console.log(val);
  })
});
