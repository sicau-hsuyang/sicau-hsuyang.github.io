export function isPalindrome(s: string) {
  let start = 0;
  let end = s.length - 1;
  // 检查输入的有效性
  if (start < 0 || end >= s.length || start > end) {
    throw new Error("Invalid start or end index");
  }
  // 双指针法，从两端向中间移动
  while (start < end) {
    if (s[start] !== s[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

/**
 * 统计从offset位置到0位置的字符串的所有回文子串
 * @param s
 * @param offset
 * @returns
 */
function countPalindrome(s: string, offset = 0): string[] {
 
}

export function countSubstrings(s: string): string[] {
  const res = countPalindrome(s, 0);
}
