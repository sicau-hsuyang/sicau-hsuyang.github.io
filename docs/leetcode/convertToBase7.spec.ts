import { convertToBase7 } from "./convertToBase7";

describe("convertToBase7", () => {
  it("case 1", () => {
    const res = convertToBase7(100);
    expect(res).toBe("202");
  });

  it("case 2", () => {
    const res = convertToBase7(-7);
    expect(res).toBe("-10");
  });
});
