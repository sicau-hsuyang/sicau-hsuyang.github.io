import { floodFill } from "./floodFill";

describe("flood fill", () => {
  it("test case", () => {
    const image = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ];
    const sr = 1;
    const sc = 1;
    const newColor = 2;
    const newImage = floodFill(image, sr, sc, newColor);
    console.log(newImage);
  });
});
