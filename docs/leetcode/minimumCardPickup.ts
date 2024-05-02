export function minimumCardPickup(cards: number[]): number {
  let minDistance = Infinity;
  let left = 0;
  const map: Map<number, number> = new Map();
  for (let right = 0; right < cards.length; right++) {
    // 如果窗口里面不存在
    if (!map.has(cards[right])) {
      // 直接添加到窗口里去
      map.set(cards[right], right);
      continue;
    }
    const preIdx = map.get(cards[right])!;
    const D = right - preIdx + 1;
    if (minDistance > D) {
      minDistance = D;
    }
    // 设置新的索引即可，这样在算的时候就是最小的差值
    map.set(cards[right], right);
    left = preIdx + 1;
  }
  return minDistance === Infinity ? -1 : minDistance;
}
