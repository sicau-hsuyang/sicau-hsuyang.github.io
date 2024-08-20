export function longestPalindrome(s: string): string {
  let max = Number.MIN_VALUE;
  let distL: number = 0,
    distR: number = 0;
  const maxPalindrome = (s: string, l: number, r: number) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      let distance = r - l + 1;
      if (distance > max) {
        max = distance;
        distL = l;
        distR = r;
      }
      l--;
      r++;
    }
  };
  for (let i = 0; i < s.length; i++) {
    maxPalindrome(s, i, i);
    maxPalindrome(s, i, i + 1);
  }
  return s.substring(distL, distR + 1);
}
