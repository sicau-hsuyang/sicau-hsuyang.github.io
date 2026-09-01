export function findSubstring(s: string, words: string[]): number[] {
  const set: Set<string> = new Set(words);
  const res: number[] = [];
  let left = 0;
  let offset = left;
  const windowSet: Set<string> = new Set();
  for (let right = 0; right < s.length; right++) {
    const word = s.substring(left, right);
    if(set.has(word)) {

    } else {
      
    }
  }
  return res;
}
