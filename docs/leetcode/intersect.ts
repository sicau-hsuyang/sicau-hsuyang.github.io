export function intersect(nums1: number[], nums2: number[]): number[] {
  const map1: Map<number, number> = new Map();
  const map2: Map<number, number> = new Map();
  nums1.forEach((num) => {
    const counter = map1.get(num) || 0;
    if (counter > 0) {
      map1.set(num, counter + 1);
    } else {
      map1.set(num, 1);
    }
  });
  nums2.forEach((num) => {
    const counter = map2.get(num) || 0;
    if (counter > 0) {
      map2.set(num, counter + 1);
    } else {
      map2.set(num, 1);
    }
  });
  const results: number[] = [];
  const map = new Map();
  nums2.forEach((num) => {
    if (map.get(num)) {
      return;
    }
    const counter1 = map1.get(num) || 0;
    const counter2 = map2.get(num) || 0;
    // 同时存在
    if (counter1 > 0 && counter2 > 0) {
      const size = Math.min(counter1, counter2);
      let k = 0;
      while (k < size) {
        results.push(num);
        k++;
      }
    }
    map.set(num, true);
  });
  return results;
}
