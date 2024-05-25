function compareDictSort(s1: string, s2: string) {
  let k = 0;
  while (k < s1.length) {
    if (s1[k] === "0" && s2[k] === "1") {
      return -1;
    } else if (s2[k] === "0" && s1[k] === "1") {
      return 1;
    }
    k++;
  }
  return 0;
}

export function shortestBeautifulSubstring(s: string, k: number): string {
  let minDistance = Number.MAX_VALUE;
  let distLeft;
  let distRight;
  let windowK = 0;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (char === "1") {
      windowK++;
      while (windowK >= k) {
        // 跳过非0
        while (s[left] !== "1" && left < right) {
          left++;
        }
        const D = right - left + 1;
        if (D < minDistance) {
          distLeft = left;
          distRight = right;
          // console.log(s.substring(left, right + 1));
          minDistance = D;
        } else if (D === minDistance) {
          const s1 = s.substring(distLeft, distRight + 1);
          const s2 = s.substring(left, right + 1);
          const res = compareDictSort(s2, s1);
          if (res === -1) {
            distLeft = left;
            distRight = right;
            // console.log(s.substring(left, right + 1));
          }
        }
        // 跳过一个1
        left++;
        // 再跳过非0
        while (s[left] !== "1" && left < right) {
          left++;
        }
        windowK--;
      }
    }
  }
  return minDistance === Number.MAX_VALUE
    ? ""
    : s.substring(distLeft, distRight + 1);
}
