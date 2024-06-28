import { lengthLongestPath } from "./lengthLongestPath";

describe("lengthLongestPath", () => {
  it("case 1", () => {
    const input =
      "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext";
    const l = lengthLongestPath(input);
    console.log(l);
  });

  it("case 2", () => {
    const input = "file1.txt\nfile2.txt\nlongfile.txt";
    const l = lengthLongestPath(input);
    console.log(l)
  });

  it("case3", () => {
    const input =
      "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext\nfile1.txt\nfile2.txt\nlongfile.txt";
    const l = lengthLongestPath(input);
    console.log(l)
  });
});
