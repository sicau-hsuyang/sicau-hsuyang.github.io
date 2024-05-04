export function longestBeautifulSubstring(word: string): number {
  let maxDistance = 0;
  let left = -1;
  let lastChar = "";
  let len = word.length;
  for (let right = 0; right < len; right++) {
    const char = word[right];
    if (lastChar === "" && char === "a") {
      // 初始化left指针
      left = right;
      lastChar = "a";
    }
    // 如果原来是字符串a，可以进入窗口的是a和e
    else if (lastChar === "a" && (char === "a" || char === "e")) {
      if (char === "e") {
        lastChar = "e";
      }
      continue;
      // console.log("拼接a或者e");
    }
    // 如果原来是字符串e，可以进入窗口的是e和i
    else if (lastChar === "e" && (char === "e" || char === "i")) {
      if (char === "i") {
        lastChar = "i";
      }
      continue;
      // console.log("拼接e或者i");
    }
    // 如果原来是字符串i，可以进入窗口的是i和o
    else if (lastChar === "i" && (char === "i" || char === "o")) {
      if (char === "o") {
        lastChar = "o";
      }
      continue;
      // console.log("拼接i或者o");
    }
    // 如果原来是字符串o，可以进入窗口的是o和u
    else if (lastChar === "o" && (char === "o" || char === "u")) {
      if (char === "u") {
        lastChar = "u";
      }
      continue;
      // console.log("拼接o或者u");
    }
    // 如果原来的字符串是u，进来的字符串必须是u
    else if (lastChar === "u" && char === "u") {
      // console.log("拼接u");
      continue;
    } else {
      // 如果结尾的是u，因为当前这个位置已经是导致了中断了，所以是不能要的了，所D=right-left并不需要+1了
      if (lastChar === "u") {
        // console.log(word.substring(left, right));
        console.log("\n");
        const D = right - left;
        if (maxDistance < D) {
          maxDistance = D;
        }
      }
      // 新来的如果是a，要立即参与计算
      if (char !== "a") {
        // 否则重新计算
        lastChar = "";
        left = -1;
      } else {
        lastChar = "a";
        left = right;
      }
    }
  }
  // 如果结尾的是u，因为当前这个位置已经是导致了中断了，所以是不能要的了，所D=right-left并不需要+1了
  if (lastChar === "u" && left != -1) {
    const D = len - left;
    if (maxDistance < D) {
      maxDistance = D;
    }
  }
  return maxDistance;
}
