import { flipAndInvertImage } from "./flipAndInvertImage";

describe("flipAndInvertImage", () => {
  it("case 1", () => {
    const matrix = [
      [1, 1, 0],
      [1, 0, 1],
      [0, 0, 0],
    ];
    const res = flipAndInvertImage(matrix);
    console.log(res);
  });
});
