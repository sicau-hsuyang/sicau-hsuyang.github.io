import { countAndSay } from "./countAndSay";

describe("countAndSay", () => {
  it("case 1", () => {
    const result = countAndSay(1);
    expect(result).toBe("1");
  });

  it("case 2", () => {
    const result = countAndSay(2);
    expect(result).toBe("11");
  })

  it("case 3", () => {
    const result = countAndSay(3);
    expect(result).toBe("21");
  })

  it("case 4", () => {
    const result = countAndSay(4);
    expect(result).toBe("1211");
  })

  it("case 6", () => {
    const result = countAndSay(6);
    expect(result).toBe("312211");
  })
});
