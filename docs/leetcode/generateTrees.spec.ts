import { generateTrees } from "./generateTrees";

describe("generateTrees", () => {
  it("case 1", () => {
    const results = generateTrees(3);
    console.log(results);
  });

  it("case 2", () => {
    const results = generateTrees(2);
    console.log(results);
  });

  it("case 3", () => {
    const results = generateTrees(8);
    console.log(results);
  });
});
