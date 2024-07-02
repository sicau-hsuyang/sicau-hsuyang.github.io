function removeSingleLineComment(line: string) {
  const pos = line.indexOf("//");
  if (pos >= 0) {
    line = line.substring(0, pos);
  }
  // 删除单个里面的 /* ****  */这样的注释
  line = line.replace(/\/\*[\w\W]*\*\//g, "");
  return line;
}

export function removeComments(source: string[]): string[] {
  const parsedResults: string[] = [];
  for (let i = 0; i < source.length; i++) {
    removeSingleLineComment(source[i]);
  }
  return parsedResults;
}
