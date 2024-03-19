export function permuteUnique(nums: number[]): number[][] {
  if (nums.length === 0) {
    return [];
  } else if (nums.length === 1) {
    return [nums];
  } else {
    const results: number[][] = [];
    const recordLen: number[][][] = [];
    const subArr = nums.slice(0, nums.length - 1);
    const prePermuteResults = permuteUnique(subArr);
    const finalEl = nums[nums.length - 1];
    for (let i = 0; i < prePermuteResults.length; i++) {
      const tempArr = prePermuteResults[i];
      for (let k = 0; k <= subArr.length; k++) {
        // 拷贝一份
        const record = tempArr.slice(0);
        record.push(finalEl);
        let temp = record[k];
        record[k] = record[record.length - 1];
        record[record.length - 1] = temp;
        const oldRecord = recordLen[record.length] || [];
        const hasSameResults = oldRecord.some((arr) => {
          const isSame = arr.every((a, idx) => {
            return record[idx] === a;
          });
          return isSame;
        });
        if (!hasSameResults) {
          if (!Array.isArray(recordLen[record.length])) {
            recordLen[record.length] = [record];
          } else {
            recordLen[record.length].push(record);
          }
          results.push(record);
        }
      }
    }
    return results;
  }
}

/**

[]

[1] -> [1]
[1, 2] -> [1,2],[2,1]
[1, 2, 3] -> 
            [1, 2, 3],
            [1, 3, 2],
            [3, 1, 2],
            [2, 1, 3],
            [3, 2, 1]
            [2, 3, 1]


[1, 1, 2]

[1] -> [1]
[1, 1] -> [1, 1]
[1, 1, 2] -> [2, 1, 1]
             [1, 2, 1]
             [1, 1, 2]

 */
