export class CombinationIterator {
  results: string[] = [];

  offset: number = 0;

  constructor(characters: string, combinationLength: number) {
    this.results = this.calc(characters, combinationLength);
  }

  calc(pattern: string, k: number): string[] {
    if (pattern.length < k) {
      return [];
    } else if (k === 1) {
      const results: string[] = [];
      for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        results.push(char);
      }
      return results;
    } else {
      let results: string[] = [];
      for (let d = 0; d < pattern.length; d++) {
        const char = pattern[d];
        const nextStr = pattern.substring(d + 1);
        const preResult = this.calc(nextStr, k - 1);
        results = results.concat(
          preResult.map((v) => {
            return char + v;
          })
        );
      }
      return results;
    }
  }

  next(): string {
    return this.results[this.offset++];
  }

  hasNext(): boolean {
    return this.offset < this.results.length;
  }
}

/**
 * Your CombinationIterator object will be instantiated and called as such:
 * var obj = new CombinationIterator(characters, combinationLength)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

/**

abc



*/
