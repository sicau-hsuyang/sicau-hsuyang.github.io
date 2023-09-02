export function canJump(nums: number[]): boolean {
  return jump(nums);
}

function jump(
  nums: number[],
  offset = 0,
  map: Map<number, boolean> = new Map()
) {
  if (nums.length - 1 <= offset) {
    return true;
  }
  console.log(nums.slice(offset))
  const step = nums[offset];
  for (let i = step; i >= 1; i--) {
    const next = offset + i;
    const flag = map.get(next);
    if (typeof flag !== "undefined") {
      if (flag) {
        return true;
      } else {
        continue;
      }
    } else {
      const tryFlag = jump(nums, next, map);
      map.set(next, tryFlag);
      if (tryFlag) {
        return true;
      }
    }
  }
  return false;
}
