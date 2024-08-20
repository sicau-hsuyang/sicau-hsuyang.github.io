export function countBinarySubstrings(s: string): number {
  let total = 0;
  for (let i = 0; i < s.length; ) {
    if (
      (s[i] === "0" && s[i + 1] == "1") ||
      (s[i] === "1" && s[i + 1] == "0")
    ) {
      let left = i;
      let right = i + 1;
      total++;
      while (s[left - 1] === s[i] && s[right + 1] === s[i + 1]) {
        left--;
        right++;
        // console.log(s.substring(left, right + 1));
        total++;
      }
      i = right;
    } else {
      i++;
    }
  }
  return total;
}
