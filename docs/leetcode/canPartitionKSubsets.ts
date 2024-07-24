function accumulate(arr: number[], initVal = 0) {
  return arr.reduce((t, i) => {
    return t + i;
  }, initVal);
}

/**
 * 编号为num的子集是否选择nums数组中下标为offset的元素
 * @param nums 原始数组
 * @param offset 数组下标
 * @returns
 */
function selection(
  nums: number[],
  offset: number,
  partitionSet: number[],
  target: number,
  k: number,
  map: Map<
    number,
    {
      flag: boolean;
      set: number[];
    }
  >
): boolean {
  if (offset >= nums.length) {
    const s = new Set(partitionSet);
    return s.size === 1 && s.has(target);
  }
  const cache = map.get(offset);
  if (cache) {
    const isSame = cache.set.every((v, idx) => {
      return partitionSet[idx] === v;
    });
    // console.log("命中缓存");
    if (isSame) {
      return cache.flag;
    }
  }
  // 依次决定对k个子集决定选或者不选
  for (let idx = 0; idx < k; idx++) {
    partitionSet[idx] += nums[offset];
    // 只有小于的时候 才有继续进行下去的必要
    if (
      partitionSet[idx] <= target &&
      selection(nums, offset + 1, partitionSet, target, k, map)
    ) {
      map.set(offset + 1, {
        flag: true,
        set: partitionSet.map((v) => v),
      });
      return true;
    }
    partitionSet[idx] -= nums[offset];
    // 如果不选的话，但是结果是错误的
    if (partitionSet[idx] === 0) {
      break;
    }
  }
  map.set(offset, {
    flag: false,
    set: partitionSet.map((v) => v),
  });
  return false;
}

export function canPartitionKSubsets(nums: number[], k: number): boolean {
  const sum = accumulate(nums);
  const partitionSum = sum / k;
  // 凑不出来整的，就无需凑整了
  if (Math.floor(partitionSum) !== partitionSum) {
    return false;
  }
  if (nums.some((v) => v > partitionSum)) {
    return false;
  }
  nums.sort((a, b) => a - b);
  const set: number[] = Array.from({
    length: k,
  }).fill(0) as number[];
  return selection(nums, 0, set, partitionSum, k, new Map());
}
