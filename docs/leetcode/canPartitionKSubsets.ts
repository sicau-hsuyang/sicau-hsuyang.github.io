function accumulate(arr: number[], initVal = 0) {
  return arr.reduce((t, i) => {
    return t + i;
  }, initVal);
}

function calc(nums: number[], k: number): boolean {}

export function canPartitionKSubsets(nums: number[], k: number): boolean {
  const sum = accumulate(nums);
  const partitionSum = sum / k;
  // 凑不出来整的，就无需凑整了
  if (Math.floor(partitionSum) !== partitionSum) {
    return false;
  }
}
