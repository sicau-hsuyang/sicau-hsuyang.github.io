export function lengthOfLongestSubstring(s: string): number {
  let maxDistance = 0;
  let left = 0;
  const map: Map<string, number> = new Map();
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      const pos = map.get(s[right])!;
      while (left <= pos) {
        map.delete(s[left]);
        left++;
      }
    }
    map.set(s[right], right);
    const currentDistance = right - left + 1;
    maxDistance = Math.max(maxDistance, currentDistance);
  }
  return maxDistance;
}
