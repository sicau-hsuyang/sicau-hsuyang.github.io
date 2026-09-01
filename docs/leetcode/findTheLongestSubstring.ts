export function findTheLongestSubstring(s: string): number {
  const map: Map<string, number> = new Map();
  let maxDistance = 0;
  let state = [0, 0, 0, 0, 0];
  map.set(state.join(""), -1);
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const idx = "aeiou".indexOf(char);
    if (idx >= 0) {
      state[idx] = state[idx] === 0 ? 1 : 0;
    }
    const key = state.join("");
    if (map.has(key)) {
      let prevPos = map.get(key)!;
      const D = i - prevPos;
      maxDistance = Math.max(maxDistance, D);
    } else {
      // 更新位置
      map.set(key, i);
    }
  }
  return maxDistance;
}
