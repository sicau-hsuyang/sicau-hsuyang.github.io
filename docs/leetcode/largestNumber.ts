export function largestNumber(nums: number[]): string {
  nums.sort((a, b) => {
    let strA = String(a);
    let strB = String(b);
    let offset = 0;
    while (
      strA[offset] === strB[offset] &&
      offset < strA.length &&
      offset < strB.length
    ) {
      offset++;
    }
    if (strA === strB) {
      return 0;
    }
    // 不相同中断的话
    else if (offset < strA.length && offset < strB.length) {
      return strB.charCodeAt(offset) - strA.charCodeAt(offset);
    }
    // 有一个没了
    else {
      let max!: string, min!: string;
      if (strA.length > strB.length) {
        max = strA;
        min = strB;
      } else {
        max = strB;
        min = strA;
      }
      let tempMax = max + min;
      let tempMin = min + max;
      let k = 0;
      while (tempMax[k] === tempMin[k]) {
        k++;
      }
      let flag = max === strA ? 1 : -1;
      return tempMax.charCodeAt(k) > tempMin.charCodeAt(k)
        ? -1 * flag
        : 1 * flag;
    }
  });
  let f = false;
  while (nums[nums.length - 1] == 0) {
    f = true;
    nums.pop();
  }
  return nums.join("") + f ? "0" : "";
}

JSON.stringify(
  Array.from({
    length: 100,
  }).map(() => {
    return Math.floor(Math.random() * 100);
  })
);
