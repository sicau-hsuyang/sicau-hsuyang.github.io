import { lexicalOrder } from "./lexicalOrder";

describe("lexicalOrder", () => {
  it("case 1", () => {
    const res = lexicalOrder(13);
    expect(res.length).toBe(13);
  });

  it("case 2", () => {
    const res = lexicalOrder(130);
    debugger;
    expect(res.length).toBe(130);
  });
});
