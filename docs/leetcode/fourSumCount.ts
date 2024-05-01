export function fourSumCount(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  let total = 0;
  const map1: Map<number, number> = getSumCombine(nums1, nums2);
  const map2: Map<number, number> = getSumCombine(nums3, nums4);
  const s1 = calcMapSize(map1, map2);
  // console.log(s1);
  total += s1;
  return total;
}

function calcMapSize(
  map1: Map<number, number>,
  map2: Map<number, number>
) {
  let total = 0;
  [...map1.keys()].forEach((key) => {
    const c1 = map2.get(key * -1);
    if (c1 !== undefined) {
      const c2 = map1.get(key)!;
      // console.log([...c1, ...c2]);
      total += c1 * c2;
    }
  });
  return total;
}

/*

12 34
13 24
14 23

*/

function getSumCombine(
  nums1: number[],
  nums2: number[]
): Map<number, number> {
  const map: Map<number, number> = new Map();
  for (let i = 0; i < nums1.length; i++) {
    const num1 = nums1[i];
    for (let j = 0; j < nums2.length; j++) {
      const num2 = nums2[j];
      const sum = num1 + num2;
      const size = map.get(sum) || 0;
      if (size === 0) {
        map.set(sum, 1);
      } else {
        map.set(sum, size + 1);
      }
    }
  }
  return map;
}
