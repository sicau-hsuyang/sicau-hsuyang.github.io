export function subarraysDivByK(nums: number[], k: number): number {
  const preSumCountMap: Map<number, number> = new Map();
  preSumCountMap.set(0, 1);
  let preSum = 0;
  let counter = 0;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    preSum += num;
    const divideK = preSum % k;
    const size = preSumCountMap.get(divideK) || 0;
    if (size === 0) {
      preSumCountMap.set(divideK, 1);
    } else {
      counter += size;
      preSumCountMap.set(divideK, size + 1);
    }
  }
  return counter;
}

/**
 [   4, 5, 0, -2, -3, 1]
 [0, 4, 9, 9,  7,  4, 5]
 9-4 [4, 5] - [4] = [5]

 9-4 [4, 5, 0] - [4] = [5, 0]

 9-9 [0] [4, 5, 0] - [4, 5] = [0]

 4-9 [4, 5, 0, -2, -3] - [4, 5] = [0, -2, -3]
 4-9 [4, 5, 0, -2, -3] - [4, 5, 0] = [-2, -3]
 4-4 [4, 5, 0, -2, -3] - [4] = [5, 0, -2, -3]

 5-0 [4, 5, 0, -2, -3, 1] - [] = [4, 5, 0, -2, -3, 1]
 */
