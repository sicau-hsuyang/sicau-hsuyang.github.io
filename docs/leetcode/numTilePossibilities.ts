function calc(tiles: string): string[] {
  if (tiles.length === 0) {
    return [];
  } else if (tiles.length === 1) {
    return [tiles];
  } else {
    let results: string[] = [];
    const char = tiles[0];
    const nextStr = tiles.substring(1);
    const preResults = calc(nextStr);
    const set: Set<string> = new Set();
    for (let i = 0; i < preResults.length; i++) {
      const str = preResults[i];
      for (let k = 0; k <= str.length; k++) {
        let leftStr = str.substring(0, k);
        let rightStr = str.substring(k);
        const tempStr = leftStr + char + rightStr;
        if (!set.has(tempStr)) {
          results.push(tempStr);
          set.add(tempStr);
        }
      }
    }
    // results = results.concat(preResults);
    preResults.forEach((str) => {
      if (!set.has(str)) {
        results.push(str);
        set.add(str);
      }
    });
    if (!set.has(char)) {
      results.push(char);
      set.add(char);
    }
    return results;
  }
}

export function numTilePossibilities(tiles: string): number {
  const values = calc(tiles);
  const set = new Set(values);
  console.log(values, set.size);
  return values.length;
}

/**
 AAB

 A

 A
 AA

 B
 BA
 AB
 BAA
 ABA
 AAB

 */
