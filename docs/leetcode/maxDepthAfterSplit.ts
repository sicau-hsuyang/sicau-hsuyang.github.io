export function maxDepthAfterSplit(seq: string): number[] {
  const stack: string[] = [];
  let maxDepth = 0;
  let offset = 0;
  let currentDepth = 0;
  while (offset < seq.length) {
    const char = seq[offset];
    if (char === "(") {
      stack.push(char);
      currentDepth++;
      if (currentDepth > maxDepth) {
        maxDepth = currentDepth;
      }
    } else {
    }
  }
}
