export function partitionLabels(s: string): number[] {
  const res: number[] = [];
  const map: Map<string, number> = new Map();
  for (let i = 0; i < s.length; i++) {
    const cnt = map.get(s[i]) || 0;
    map.set(s[i], cnt + 1);
  }
  let tempRecord: Record<string, number> | null = null;
  let tempStr = "";
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (tempRecord === null) {
      tempRecord = {
        [char]: map.get(char)! - 1,
      };
    } else {
      // 已经存在，消除一个
      if (char in tempRecord) {
        tempRecord[char]--;
      } else {
        const cnt = map.get(char)! - 1;
        tempRecord[char] = cnt;
      }
    }
    tempStr += char;
    // 当消除完了，就可以开心的加入了
    if (Object.values(tempRecord).every((v) => v === 0)) {
      console.log(tempStr);
      res.push(tempStr.length);
      tempRecord = null;
      tempStr = "";
    }
  }
  return res;
}
