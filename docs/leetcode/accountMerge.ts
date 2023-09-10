export function accountsMerge(accounts: string[][]): string[][] {
  const map: Map<string, string[][]> = new Map();
  accounts.forEach((act) => {
    const userName = act[0];
    if (map.has(userName)) {
      const set = map.get(userName);
      const emailGroup = act.slice(1);
      set?.push(emailGroup);
    } else {
      const set = act.slice(1);
      map.set(userName, [set]);
    }
  });
  const results: string[][] = [];
  for (const [person, group] of map.entries()) {
    const markedMap: Map<string[], true> = new Map();
    let set: Set<string> | null = null;
    for (let g = 0; g < group.length; g++) {
      // 取当前的一行
      const emailGroup = group[g];
      // 如果已经被合并过了，则跳过
      if (markedMap.get(emailGroup)) {
        continue;
      }
      if (!set) {
        set = new Set<string>(emailGroup);
      }
      // 向后合并
      let k = g + 1;
      while (k < group.length) {
        const nextEmailGroup = group[k];
        // 尝试合并下一行
        const tmpSet = new Set([...set!, ...nextEmailGroup]);
        // 合并之后元素肯定少了，说明是重复的，并且将其标记为已处理
        if (tmpSet.size < nextEmailGroup.length + set!.size) {
          set = tmpSet;
          // 标记为已处理
          markedMap.set(nextEmailGroup, true);
        }
        // 向后继续处理下一行
        k++;
      }
      const arr = [...set!].sort((a, b) => {
        let offset1 = 0;
        let offset2 = 0;
        while (offset1 < a.length && offset2 < b.length) {
          if (a.charCodeAt(offset1) === b.charCodeAt(offset2)) {
            offset1++;
            offset2++;
          } else if (a.charCodeAt(offset1) > b.charCodeAt(offset2)) {
            return true;
          } else {
            return false;
          }
        }
        return (a.length - b.length) as any;
      });
      results.push([person, ...arr]);
      // 合并完成，清理数据
      set = null;
    }
  }
  return results;
}
