import { partitionLabels } from "./partitionLabels";

describe("partitionLabels", () => {
  it("case 1", () => {
    const res = partitionLabels("ababcbacadefegdehijhklij");
    expect(res).toEqual([9, 7, 8]);
  });

  it("case 2", () => {
    const res = partitionLabels("eccbbbbdec");
    expect(res).toEqual([10]);
  });

  it("case 3", () => {
    const res = partitionLabels("acadfgkklikg");
    expect(res).toEqual([3, 1, 1, 7]);
  });

  it("case 4", () => {
    const res = partitionLabels("abcdefg");
    expect(res).toEqual([1, 1, 1, 1, 1, 1, 1]);
  });
});
