import { ambiguousCoordinates, magnifyNum } from "./ambiguousCoordinates";

describe("ambiguousCoordinates", () => {
  it("case 1", () => {
    const str = "(123)";
    ambiguousCoordinates(str);
  });

  it("case 2", () => {
    const str = "(00011)";
    ambiguousCoordinates(str);
  });

  it("case 3", () => {
    const str = "(1000101)";
    ambiguousCoordinates(str);
  });

  it("case 4", () => {
    const str = "(0123)";
    ambiguousCoordinates(str);
  });
});

describe("magnifyNum", () => {
  it("case 1", () => {
    const str = "1000101";
    const results = magnifyNum(str);
    console.log(results);
  });

  it("case 2", () => {
    const str = "01";
    const results = magnifyNum(str);
    console.log(results);
  });
});
