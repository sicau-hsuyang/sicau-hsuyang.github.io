interface AnagramGroup {
  str: string | null;
  refs: Record<string, AnagramGroup>;
}

export function groupAnagrams(strs: string[]): string[][] {
  const lenMap: Map<number, Map<string, AnagramGroup[]>> = new Map();
  strs.forEach((str) => {
    const length = str.length;
    const charMap = lenMap.get(length);
    if (!charMap) {
      const map: Map<string, AnagramGroup[]> = new Map();
      const refs: Record<string, AnagramGroup> = Object.create(null);
      const arr: AnagramGroup[] = [];
      for (let i = 1; i < str.length; i++) {
        const char = str[i];
        const other = {
          str: null,
          refs: {},
        };
        refs[char] = other;
        arr.push(other);
      }
      map.set(str[0], [
        {
          str,
          refs,
        },
      ]);
      lenMap.set(length, map);
    } else {
      const data = charMap.get(str[0]);
      const refs: Record<string, AnagramGroup> = Object.create(null);
      for (let i = 1; i < str.length; i++) {
        const char = str[i];
        // 查找其它字符
        let refGroup = charMap.get(char);
        // 如果找的到
        if (!refGroup) {
          refGroup = {
            str: [],
            refs: {},
          };
          charMap.set(char, refGroup);
        }
        refs[char] = refGroup;
      }
      if (!data) {
        charMap.set(str[0], {
          str: [str],
          refs,
        });
      } else {
        data.str.push(str);
        data.refs = refs;
      }
    }
  });
  const results: string[][] = [];
  lenMap.forEach((charMap) => {
    charMap.forEach((charConfig) => {
      console.log(charConfig);
    });
  });
  return results;
}
