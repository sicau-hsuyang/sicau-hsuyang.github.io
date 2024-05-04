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
  let lastChar = "";
  // 最大只有可能是2个
  let collectedChar: string[] = [];
  let dict: Record<string, number> = {};
  for (let right = 0; right < text.length; right++) {
    let char = text[right];
    // 如果字符的品类不到2个，随便加入
    if (collectedChar.length < 2) {
      collectedChar.push(char);
      const preNum = dict[char] || 0;
      dict[char] = preNum + 1;
    } else if (collectedChar.length === 2 && char === lastChar) {
      let oneChar, otherChar;
      if (collectedChar[0] === char) {
        oneChar = collectedChar[1];
        otherChar = collectedChar[0];
      } else {
        oneChar = collectedChar[0];
        otherChar = collectedChar[1];
      }
      // TODO: 需要考虑一个字符串仅有一个，窗口的剩余位置全是其它字符
    }
    lastChar = char;
  }
  return maxDistance;
}
