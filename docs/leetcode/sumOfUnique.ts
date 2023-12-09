function sumOfUnique(nums: number[]): number {
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (map.has(num)) {
      map.set(num, map.get(num)! + 1);
    } else {
      map.set(num, 1);
    }
  }
  let sum = 0;
  const arr = [...map.entries()];
  for (let i = 0; i < arr.length; i++) {
    const [prop, value] = arr[i];
    if (value > 1) {
      sum += prop;
    }
  }
  return sum;
}
