import { compareVersion } from "./compareVersion";

describe("compare version", () => {
  it("case 1", () => {
    const version1 = "1.01",
      version2 = "1.001";
    const res = compareVersion(version1, version2);
    expect(res).toBe(0);
  });

  it("case 2", () => {
    const version1 = "1.0",
      version2 = "1.0.0";
    const res = compareVersion(version1, version2);
    expect(res).toBe(0);
  });

  it("case 3", () => {
    const version1 = "0.1",
      version2 = "1.1";
    const res = compareVersion(version1, version2);
    expect(res).toBe(-1);
  });

  it("case 4", () => {
    const version1 = "1.1",
      version2 = "1.10";
    const res = compareVersion(version1, version2);
    expect(res).toBe(-1);
  });

  it("case 5", () => {
    const version1 = "1.0.1",
      version2 = "1";
    const res = compareVersion(version1, version2);
    expect(res).toBe(1);
  });

  it("case 6", () => {
    const version1 = "1.2",
      version2 = "1.10";
    const res = compareVersion(version1, version2);
    expect(res).toBe(-1);
  });
});
