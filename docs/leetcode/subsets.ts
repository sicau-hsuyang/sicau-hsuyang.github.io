export function subsets(nums: number[]): number[][] {
  if (nums.length === 0) {
    return [[]];
  } else {
    let results: number[][] = [];
    const subArr = nums.slice(0, nums.length - 1);
    const subResults = subsets(subArr);
    for (let i = 0; i < subResults.length; i++) {
      const arr = subResults[i];
      results.push([...arr, nums[nums.length - 1]]);
    }
    results = results.concat(subResults);
    return results;
  }
}

/**
 []  ------- []
 [1] ------- [] [1]
 [1, 2] ---- [] [1], [2], [1,2]
 [1, 2, 3]-- [] [1], [2], [3], [1, 2], [1,3], [2, 3], [1, 2, 3]

             []

             [] + [] 并 1 = [] [1]

             [] [1] + [] [1] 并 2 = [], [1], [2], [1, 2]

             [] [1], [2], [1, 2]  [1, 3], [2, 3], [1, 2, 3]
 */
