import { mergeSimilarItems } from "./mergeSimilarItems";

describe("mergeSimilarItems", () => {
  it("case 1", () => {
    const items1 = [
        [1, 3],
        [2, 2],
      ],
      items2 = [
        [7, 1],
        [2, 2],
        [1, 4],
      ];
    const results = mergeSimilarItems(items1, items2);
    console.log(results);
  });
});
