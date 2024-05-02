export function maxVowels(s: string, k: number): number {
  const dict = new Set("aeiou");
  let windowCount = 0;
  for (let i = 0; i < k; i++) {
    const char = s[i];
    if (dict.has(char)) {
      windowCount++;
    }
  }
  // 初始化元音字符的数目
  let maxCount = windowCount;
  for (let right = k; right < s.length; right++) {
    let preIdx = right - k;
    // 需要删除的元音字符
    const removeChar = s[preIdx];
    // 插入进来的元音字符
    const insertChar = s[right];
    console.log(s.substring(preIdx, right), removeChar, insertChar);
    if (dict.has(removeChar)) {
      windowCount--;
    }
    if (dict.has(insertChar)) {
      windowCount++;
    }
    if (maxCount < windowCount) {
      maxCount = windowCount;
    }
  }
  return maxCount;
}
