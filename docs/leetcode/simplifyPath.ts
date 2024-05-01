export function simplifyPath(path: string): string {
  // 替换// 到 /
  path = path.replace(/\/\//g, "/");
  // 替换 ./ 为空
  path = path.replace(/\.\//, "");
  const dir: string[] = [];
  let offset = 0;
  return "";
}
