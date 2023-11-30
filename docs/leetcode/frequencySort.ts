export function frequencySort(nums: number[]): number[] {
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const size = map.get(num) || 0;
    if (size) {
      map.set(num, size + 1);
    } else {
      map.set(num, 1);
    }
  }

  nums.sort((a, b) => {
    const f1 = map.get(a)!;
    const f2 = map.get(b)!;
    return f1 != f2 ? f1 - f2 : a - b;
  });

  return nums;
}
