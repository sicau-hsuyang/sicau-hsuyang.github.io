import { removeSubfolders } from "./removeSubfolders";

describe("removeSubfolders", () => {
  it("case 1", () => {
    const folder = ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"];
    const results = removeSubfolders(folder);
    expect(results).toEqual(["/a", "/c/d", "/c/f"]);
  });

  it("case 2", () => {
    const folder = ["/a", "/a/b/c", "/a/b/d"];
    const results = removeSubfolders(folder);
    expect(results).toEqual(["/a"]);
  });
});
