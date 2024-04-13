// https://leetcode.cn/problems/remove-sub-folders-from-the-filesystem/
export function removeSubfolders(folder: string[]): string[] {
  const set = new Set(folder);
  const results: string[] = [];
  for (let i = 0; i < folder.length; i++) {
    const path = folder[i];
    let str = path;
    let preStr;
    while (true) {
      preStr = str;
      str = str.replace(/\/[a-z]+$/, "");
      if (str === "" || preStr === str) {
        results.push(path);
        break;
      } else if (set.has(str)) {
        break;
      }
    }
  }
  return results;
}
