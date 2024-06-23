export function isPalindrome(s: string, start: number, end: number) {
  const len = end - start + 1;
  let left = start;
  let right = end;
  while (left <= right && s[left] === s[right]) {
    left++;
    right--;
  }
  return (
    (len % 2 !== 0 && left === right) || (len % 2 === 0 && left === right + 1)
  );
}

export function countSubstrings(s: string, offset:number): number {
  return 0;
}
