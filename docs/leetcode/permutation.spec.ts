import { permutation } from "./permutation";

describe("permutation", () => {
  it("case 1", () => {
    const str = "qwe";
    const results = permutation(str);
    console.log(results);
  });

  it("case 2", () => {
    const str = "qqw";
    const results = permutation(str);
    console.log(results);
  });
});
