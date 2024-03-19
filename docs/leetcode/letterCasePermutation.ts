export function letterCasePermutation(s: string): string[] {
  if (s === "") {
    return [];
  }
  const subStr = s.substring(1);
  const subsets = letterCasePermutation(subStr);
  const char = s[0];
  if (/[a-z]/i.test(char)) {
    if (subsets.length === 0) {
      return [char.toLowerCase(), char.toUpperCase()];
    } else {
      return [
        ...subsets.map((str) => {
          return char.toLowerCase() + str;
        }),
        ...subsets.map((str) => {
          return char.toUpperCase() + str;
        }),
      ];
    }
  } else {
    if (subsets.length === 0) {
      return [char];
    } else {
      return subsets.map((str) => {
        return char + str;
      });
    }
  }
}
