/**
 * 删除单行里面的 //
 * @param line
 * @returns
 */
function removeSingleLineComment(line: string) {
  const pos = line.indexOf("//");
  if (pos >= 0) {
    line = line.substring(0, pos);
  }
  return line;
}

export function removeComments(source: string[]): string[] {
  let isStart = -1;
  let startPos = -1;
  for (let i = 0; i < source.length; i++) {
    // 先处理单行里面的多行注释/**/
    source[i] = source[i].replace(/\/\*[\w\W]*\*\//g, "");
    const line = source[i];
    // 先进行预处理
    source[i] = removeSingleLineComment(line);
    let pos1 = source[i].indexOf("/*");
    // 仅包含开始注释
    if (pos1 >= 0 && isStart === -1) {
      isStart = i;
      startPos = pos1;
    } else {
      // 防止// 把多行注释的 */给打掉了
      let pos2 = line.indexOf("*/");
      if (pos2 < 0 || isStart == -1) {
        continue;
      }
      // 从下一行开始一直到倒数第二行，都是可以全部删除的
      let startLine = isStart + 1;
      let endLine = i;
      while (startLine < endLine) {
        source[startLine] = "";
        startLine++;
      }
      // 取得/*前面的所有字符
      source[isStart] = source[isStart].substring(0, startPos);
      // 取得*/后面的所有字符
      source[i] = source[i].substring(pos2 + 2);
      // 将两行合成一行
      source[isStart] += source[i];
      source[i] = "";
      isStart = -1;
      startPos = -1;
    }
  }
  return source.filter((v) => v !== "");
}
