function countPalindrome(s: string, l: number, r: number) {
  let count = 0;
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    count++;
    console.log(s.substring(l, r + 1));
    l--;
    r++;
  }
  return count;
}

export function countSubstrings(s: string): number {
  // const dp: number[] = [1];
  let t = 0;
  for (let i = 0; i < s.length; i++) {
    const count1 = countPalindrome(s, i, i);
    const count2 = countPalindrome(s, i, i + 1);
    // dp[i] = count1 + count2 + dp[i - 1];
    t += count1 + count2;
  }
  return t;
}

/**

a: a 

aa: a aa a

aaa: 

 */
