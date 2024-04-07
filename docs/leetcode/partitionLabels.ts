export function partitionLabels(s: string): number[] {
  const map: Map<string, number> = new Map();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const counter = map.get(char) || 0;
    if (counter === 0) {
      map.set(char, 1);
    } else {
      map.set(char, counter + 1);
    }
  }
  const group: string[] = [];
  let i = 0;
  while (i < s.length) {
    const char = s[i];
    const counter = map.get(char)!;
    // 运气足够好，单个就可以成一组
    if (counter === 1) {
      group.push(char);
      i++;
    }
    // 运气不好
    else {
      // 这个小集合里面可以记次数
      const record = Object.create(null) as Record<string, number>;
      // 因为已经出现过一次了，所以要减去一次
      record[char] = counter - 1;
      let offset = i + 1;
      while (offset < s.length) {
        const nextChar = s[offset];
        // 如果已经记录过的话，将其减小
        if (record[nextChar]) {
          record[nextChar]--;
          // 如果已经为0了，说明这个就已经处理好了，可以暂时不管了
          if (record[nextChar] === 0) {
            Reflect.deleteProperty(record, nextChar);
          }
        }
        // 否则又带来了新的麻烦，还是先减去1，因为已经出现过一次了，如果仅仅出现一次的话，就没有必要加进去了
        else {
          const t = map.get(nextChar)! - 1;
          if (t > 0) {
            record[nextChar] = t;
          }
        }
        // 刚好把这一组消除完了，就不要再给自己找麻烦了
        if (Reflect.ownKeys(record).length === 0) {
          // 提取字符串，[i, offset]，即[i, offset+1)
          group.push(s.substring(i, offset + 1));
          // 跳到下一个节点
          i = offset + 1;
          break;
        } else {
          offset++;
        }
      }
    }
  }
  return group.map((v) => v.length);
}
