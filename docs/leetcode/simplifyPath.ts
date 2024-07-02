export function simplifyPath(path: string): string {
  // 替换多个// 到 /
  // path = path.replace(/\/{2,}/g, "/");
  // 替换 ./ 为空，注意，不能干扰到了../这样的操作
  // path = path.replace(/(?<!\.)\.\//g, "");
  const stack: string[] = [];
  let offset = 1;
  let tmp = "";
  while (offset < path.length) {
    const char = path[offset];
    if (char === "/") {
      // 拼接起来则是./
      if (tmp === ".") {
        // 什么都不用做
        tmp = "";
      }
      // 拼接起来则是../
      else if (tmp === "..") {
        // 向上弹一级
        stack.pop();
        tmp = "";
      } else if (tmp !== "") {
        stack.push(tmp);
        tmp = "";
      }
    } else {
      tmp += char;
    }
    offset++;
  }
  if (tmp !== "") {
    if (tmp === "..") {
      stack.pop();
    } else if (tmp !== ".") {
      stack.push(tmp);
    }
    tmp = "";
  }
  return "/" + stack.join("/");
}
