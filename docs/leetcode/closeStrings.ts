export function closeStrings(word1: string, word2: string): boolean {
  if (word1.length != word2.length) {
    return false;
  }
  // 得到了两个有序的字符串数组
  const charArr1 = word1.split("").sort((a, b) => {
    return a.charCodeAt(0) - b.charCodeAt(0);
  });
  const charArr2 = word2.split("").sort((a, b) => {
    return a.charCodeAt(0) - b.charCodeAt(0);
  });
  // 如果只是顺序的不同
  if (charArr1.join("") === charArr2.join("")) {
    return true;
  }
  while (true) {}
}
