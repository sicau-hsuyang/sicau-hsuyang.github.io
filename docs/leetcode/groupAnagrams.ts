interface AnagramGroup {
  str: string;
  consist: {
    [prop: string]: number;
  };
}

export function groupAnagrams(strs: string[]): string[][] {
  const sizeMap: Map<number, AnagramGroup[]> = new Map();
  strs.forEach((word) => {
    const myWord = {
      str: word,
      consist: {},
    };
    // 处理其组成部分
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!myWord.consist[char]) {
        myWord.consist[char] = 1;
      } else {
        myWord.consist[char]++;
      }
    }
    const wordGroup = sizeMap.get(word.length);
    // 已存在
    if (Array.isArray(wordGroup)) {
      wordGroup.push(myWord);
    } else {
      // 不存在则放一个新的进去
      sizeMap.set(word.length, [myWord]);
    }
  });
  const result: string[][] = [];
  const strGroupByLength = [...sizeMap.values()];
  for (let i = 0; i < strGroupByLength.length; i++) {
    const groupItem = strGroupByLength[i];
    const groupResult: string[][] = merge(groupItem);
    result.push(...groupResult);
  }
  return result;
}

function merge(group: AnagramGroup[]) {
  const result: string[][] = [];
  let ddd = group;
  while (ddd.length) {
    const next: AnagramGroup[] = [];
    const current = ddd.shift()!;
    const resultPass = [current];
    while (ddd.length) {
      let tmp = ddd.shift()!;
      if (canMerge(tmp, current)) {
        resultPass.push(tmp);
      } else {
        next.push(tmp);
      }
    }
    if (next.length) {
      ddd = next;
    }
    // 处理完一组
    result.push(resultPass.map((v) => v.str));
  }
  return result;
}

function canMerge(word1: AnagramGroup, word2: AnagramGroup) {
  return Object.entries(word1.consist).every(([prop, count]) => {
    return word2.consist[prop] === count;
  });
}
