export function subsetsWithDup(nums: number[]): number[][] {
  if (nums.length === 0) {
    return [[]];
  } else {
    let results: number[][] = [];
    const subArr = nums.slice(0, nums.length - 1);
    const subResults = subsetsWithDup(subArr);
    for (let i = 0; i < subResults.length; i++) {
      const arr = subResults[i];
      const subResult = [...arr, nums[nums.length - 1]];
      results.push(subResult);
    }
    results = results.concat(subResults);
    return results;
  }
}

function cartesianProduct(arr: number[][]) {}

export function merge(arr1: number[], arr2: number[] = []) {
  if (arr1.length === 0 && arr2.length === 0) {
    return [];
  } else if (arr1.length === 0) {
    const results: number[][] = [];
    for (let i = 0; i < arr2.length; i++) {
      const subsets = arr2.slice(i);
      results.push(subsets);
    }
    return results;
  } else if (arr2.length === 0) {
    const results: number[][] = [];
    for (let i = 0; i < arr1.length; i++) {
      const subsets = arr1.slice(i);
      results.push(subsets);
    }
    return results;
  } else {
    const results: number[][] = [];
    for (let i = 0; i <= arr1.length; i++) {
      const subsets1 = arr1.slice(i);
      for (let j = 0; j <= arr2.length; j++) {
        const subsets2 = arr2.slice(j);
        const mergedArr = [...subsets1, ...subsets2];
        if (mergedArr.length) {
          results.push(mergedArr);
        }
      }
    }
    return results;
  }
}

/**
 

 [1, [2, 2]] -> [1, 2], [1, 2, 2]

 [[2, 2]] -> [2], [2, 2]

 [1]

 []


 [1, [2, 2], [3, 3]] -> [1, 2, [3, 3]], [1, 2, 2, [3, 3]]
                     -> [1, 2, 3], [1,2, 3, 3], [1,2,2,3], [1, 2,2, 3,3]
 */
