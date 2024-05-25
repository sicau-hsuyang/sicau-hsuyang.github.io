import { myAtoi } from "./myAtoi";

describe("myAtoi", () => {
  it("case 1", () => {
    const s = "42";
    const val = myAtoi(s);
    expect(val).toBe(42);
  });

  it("case 2", () => {
    const s = " -042";
    const val = myAtoi(s);
    expect(val).toBe(-42);
  });

  it("case 3", () => {
    const s = "1337c0d3";
    const val = myAtoi(s);
    expect(val).toBe(1337);
  });

  it("case 4", () => {
    const s = "0-1";
    const val = myAtoi(s);
    expect(val).toBe(0);
  });

  it("case 5", () => {
    const s = "words and 987";
    const val = myAtoi(s);
    expect(val).toBe(0);
  });

  it("case 6", () => {
    const s = "-     1";
    const val = myAtoi(s);
    expect(val).toBe(0);
  });

  it("case 7", () => {
    const s = ".1";
    const val = myAtoi(s);
    expect(val).toBe(0.1);
  });

  it("case 8", () => {
    const s = ".1";
    const val = myAtoi(s);
    expect(val).toBe(0.1);
  });
});
