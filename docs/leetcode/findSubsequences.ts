function excludeSame(
  record: number[],
  map: Map<number, number[][]>
): number[] | null {
  if (!map.get(record.length)) {
    map.set(record.length, [record]);
    return record;
  }
  let result: null | number[] = null;
  const exist = map.get(record.length) || [];
  const isExistRecord = exist.some((seq) => {
    const isSame = seq.every((el, elIdx) => {
      return el === record[elIdx];
    });
    return isSame;
  });
  if (!isExistRecord) {
    result = record;
    exist.push(record);
  }
  return result;
}

function calc(nums: number[]): number[][] {
  if (nums.length == 1) {
    return [nums];
  } else {
    const results: number[][] = [];
    const val = nums[0];
    const nextNums = nums.slice(1);
    const nxtResults = calc(nextNums);
    const map: Map<number, number[][]> = new Map();
    nxtResults.forEach((record) => {
      const r = excludeSame(record, map);
      if (r) {
        results.push(r);
      }
    });
    for (let i = 0; i < nxtResults.length; i++) {
      const arr = nxtResults[i];
      if (val <= arr[0]) {
        const record = [val, ...arr];
        const r = excludeSame(record, map);
        if (r) {
          results.push(r);
        }
      }
    }
    results.push([val]);
    return results;
  }
}

export function findSubsequences(nums: number[]): number[][] {
  const results = calc(nums);
  let distResults: number[][] = [];
  const realResults = results.filter((v) => v.length > 1);
  // const map: Map<number, number[][]> = new Map();
  // realResults.forEach((record) => {
  //   const r = excludeSame(record, map);
  //   if (r) {
  //     distResults.push(r);
  //   }
  // });
  distResults = realResults;
  return distResults;
}
