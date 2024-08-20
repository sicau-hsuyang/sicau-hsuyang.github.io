import { hIndex } from "./hIndex2";

describe("hIndex", () => {
  it("case 1", () => {
    const citations = [0, 1, 3, 5, 6];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 2", () => {
    const citations = [1, 2, 100];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 3", () => {
    const citations = [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 4, 100];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 4", () => {
    const citations = [0, 1, 3, 5, 6, 9, 10, 10, 21, 22, 24, 24, 27];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 5", () => {
    const citations = [0];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 6", () => {
    const citations = [1, 2];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 7", () => {
    const citations = [1];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 8", () => {
    const citations = [0, 0, 0, 0, 0];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 9", () => {
    const citations = [0, 0, 0, 0, 0, 1, 2];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 10", () => {
    const citations = [11, 15];
    const idx = hIndex(citations);
    console.log(idx);
  });

  it("case 11", () => {
    const citations = [0, 0, 4, 4];
    const idx = hIndex(citations);
    console.log(idx);
  });
});
