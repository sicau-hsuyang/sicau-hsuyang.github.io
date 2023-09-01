export function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const map = new Map();
  nums.forEach((v, i) => {
    const target = map.get(v);
    if (target) {
      target.push(i);
    } else {
      map.set(v, [i]);
    }
  });
  const arr = [...map.values()];
  for (const v of arr) {
    if (v.length >= 2) {
      const distance = calcDistance(v);
      if (distance <= k) {
        return true;
      }
    }
  }
  return false;
}

function calcDistance(arr: number[]) {
  let minDistance = Infinity;
  for (let i = 0; i < arr.length - 1; i++) {
    const a = arr[i];
    const b = arr[i + 1];
    const d = Math.abs(a - b);
    if (minDistance > d) {
      minDistance = d;
    }
  }
  return minDistance;
}
