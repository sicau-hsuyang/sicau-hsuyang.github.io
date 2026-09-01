function selectionNum(map: Map<number, number>) {
  if (map.size === 0) {
    return 0;
  }
  let accu = 0;
}

function deleteAndEarn(nums: number[]): number {
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    const cnt = map.get(nums[i]) || 0;
    map.set(nums[i], cnt + 1);
  }
  const records = [...map.entries()].sort((a, b) => {
    return a[0] - b[0];
  });
}
