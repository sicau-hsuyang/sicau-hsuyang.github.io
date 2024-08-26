interface Struct {
  pos: number;
  len: number;
}

export function longestArithSeqLength(nums: number[]): number {
  let maxDistance = 2;
  const map: Map<number, Struct[]> = new Map();
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {}
  }
  return maxDistance;
}
