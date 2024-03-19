import { merge, subsetsWithDup } from "./subsetsWithDup";

describe("subsetsWithDup", () => {
  it("case 1", () => {
    const nums = [1, [2, 2], [3, 3]];
    const results = subsetsWithDup(nums as any) as any;
    let set1 = results.filter((v) => Array.isArray(v)) as any;
    let tempResults: number[][] = [];
    for (let i = 0; i < set1.length; i += 2) {
      const processed = merge(set1[i], set1[i + 1]);
      tempResults = tempResults.concat(processed);
    }
    const set2 = results.filter((v) => !Array.isArray(v));
    let dist: number[][] = [];
    for (let i = 0; i < set2.length; i++) {
      const distPass = merge(set2, tempResults[i]);
      dist = dist.concat(distPass);
    }
    console.log(dist);
  });
});

describe("parseResult", () => {
  it("case 1", () => {
    const nums = [2, 2];
    const results = merge(nums);
    console.log(results);
  });

  it("case 2", () => {
    const nums1 = [2, 2],
      nums2 = [3, 3];
    const results = merge(nums1, nums2);
    console.log(results);
  });

  // it("case 2", () => {
  //   const nums = [1, [2, 2], [3, 3]];
  //   const results = parse(nums);
  //   console.log(results);
  // });

  // it("case 3", () => {
  //   const nums = [1];
  //   const results = parseResults(nums);
  //   console.log(results);
  // });
});
