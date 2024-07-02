import { simplifyPath } from "./simplifyPath";

describe("simplifyPath", () => {
  it("case 1", () => {
    const path = "/a/./b/../../c/";
    const res = simplifyPath(path);
    expect(res).toBe("/c");
  });

  it("case 2", () => {
    const path = "/home//foo/";
    const res = simplifyPath(path);
    expect(res).toBe("/home/foo");
  });

  it("case 3", () => {
    const path = "/../";
    const res = simplifyPath(path);
    expect(res).toBe("/");
  });

  it("case 4", () => {
    const path = "/../c/d/e";
    const res = simplifyPath(path);
    expect(res).toBe("/");
  });

  it("case 5", () => {
    const path = "/a//b////c/d//././/..";
    const res = simplifyPath(path);
    expect(res).toBe("/a/b/c");
  });
});
