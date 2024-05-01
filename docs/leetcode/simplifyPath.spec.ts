import { simplifyPath } from "./simplifyPath";

describe("simplifyPath", () => {
  it("case 1", () => {
    const path = "/a/./b/../../c/";
    simplifyPath(path);
  });
});
