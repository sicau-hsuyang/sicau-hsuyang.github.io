export function watchedVideosByFriends(
  watchedVideos: string[][],
  friends: number[][],
  id: number,
  level: number
): string[] {
  const map: Map<number, number[]> = new Map();
  for (let i = 0; i < friends.length; i++) {
    map.set(i, friends[i]);
  }
  let grade = 0;
  const queue: number[][] = [[id]];
  const set: Set<number> = new Set();
  set.add(id);
  let targetChunk!: number[];
  while (queue.length) {
    const chunk = queue.shift()!;
    if (grade === level) {
      targetChunk = chunk;
      break;
    }
    grade++;
    const nextChunk: number[] = [];
    chunk.forEach((num) => {
      const next = map.get(num) || [];
      next.forEach((nextNum) => {
        if (!set.has(nextNum)) {
          nextChunk.push(nextNum);
          set.add(nextNum);
        }
      });
    });
    if (nextChunk.length) {
      queue.push(nextChunk);
    }
  }
  const collectVideoMap: Map<string, number> = new Map();
  for (let i = 0; i < targetChunk.length; i++) {
    watchedVideos[targetChunk[i]].forEach((video) => {
      const count = collectVideoMap.get(video) || 0;
      collectVideoMap.set(video, count + 1);
    });
  }
  const values = [...collectVideoMap.entries()]
    .sort((a, b) => {
      // 出现的频率不同
      if (a[1] !== b[1]) {
        return a[1] - b[1];
      }
      let i = 0;
      while (
        i < a[0].length &&
        i < b[0].length &&
        a[0].charCodeAt(i) === b[0].charCodeAt(i)
      ) {
        i++;
      }
      if (i === Math.min(a[0].length, b[0].length)) {
        return a[0].length - b[0].length;
      } else {
        return a[0].charCodeAt(i) - b[0].charCodeAt(i);
      }
    })
    .map((v) => {
      return v[0];
    });
  return values;
}
