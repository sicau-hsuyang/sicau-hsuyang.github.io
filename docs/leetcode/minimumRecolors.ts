export function minimumRecolors(blocks: string, k: number): number {
  let windowOptCount = 0;
  for (let i = 0; i < k; i++) {
    const color = blocks[i];
    if (color === "W") {
      windowOptCount++;
    }
  }
  let minCount = windowOptCount;
  let left = 0;
  for (let i = k; i < blocks.length; i++) {
    const removeChar = blocks[left++];
    const insertChar = blocks[i];
    if (removeChar === "W") {
      windowOptCount--;
    }
    if (insertChar === "W") {
      windowOptCount++;
    }
    if (minCount > windowOptCount) {
      minCount = windowOptCount;
    }
  }
  return minCount;
}
