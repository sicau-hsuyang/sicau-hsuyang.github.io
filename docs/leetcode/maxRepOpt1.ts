export function maxRepOpt1(text: string): number {
  // 使用哈希表记录每个字符串出现的次数，在将来备用
  const map: Map<string, number> = new Map();
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const counter = map.get(char) || 0;
    if (counter === 0) {
      map.set(char, 1);
    } else {
      map.set(char, counter + 1);
    }
  }
  let maxDistance = 0;
  let left = 0;
  const windowMap: Map<string, number> = new Map();
  for (let right = 0; right < text.length; right++) {
    let char = text[right];
    // 如果窗口里面没有这个字符，并且窗口装得下
    if (!windowMap.has(char) && windowMap.size <= 1) {
      windowMap.set(char, 1);
    }
    // 窗口可能装不下
    else if (windowMap.size === 2 && windowMap.has(char)) {
      const [char1, char2] = windowMap.keys();
      let multiChar;
      let singleChar;
      // abb 来的是a; aab 来的是b
      if (
        windowMap.get(char1)! === 1 &&
        windowMap.get(char2)! > 1 &&
        char === char1
      ) {
        singleChar = char1;
        multiChar = char2;
      } else if (
        windowMap.get(char2)! === 1 &&
        windowMap.get(char1)! > 1 &&
        char === char2
      ) {
        singleChar = char2;
        multiChar = char1;
      }
      // 找到哪个字符是唯一出现那一次的字符
      // const multiChar
    }
    // 窗口装不下了
    else if (windowMap.size === 2 && !windowMap.has(char)) {
    }
  }
  return maxDistance;
}

/**
 
a b


ab a
ab b
ab c

aabaa a

baaaa a
abaaa a


aaaab 

 * 
 */
