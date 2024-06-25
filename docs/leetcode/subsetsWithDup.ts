function subsets(nums: number[], offset: number): number[][] {
  // 到顶了
  if (offset >= nums.length) {
    return [];
  }
  let startNum = nums[offset];
  let pos = offset + 1;
  while (pos < nums.length && nums[pos] === startNum) {
    pos++;
  }
  const results: number[][] = [];
  let size = pos - offset;
  const nextSets = subsets(nums, pos);
  // 从0-k个，每个选X个
  for (let i = 0; i <= size; i++) {
    if (nextSets.length) {
      for (let k = 0; k < nextSets.length; k++) {
        const temp = [
          ...nextSets[k],
          ...(Array.from({
            length: i,
          }).fill(startNum) as number[]),
        ];
        results.push(temp);
      }
    } else {
      results.push(
        Array.from({
          length: i,
        }).fill(startNum) as number[]
      );
    }
  }
  return results;
}

export function subsetsWithDup(nums: number[]): number[][] {
  nums.sort((a, b) => {
    return a - b;
  });
  return subsets(nums, 0);
}
