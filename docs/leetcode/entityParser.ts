export function entityParser(text: string): string {
  const dict = {
    "&quot;": '"',
    "&apos;": "'",
    "&amp;": "&",
    "&gt;": ">",
    "&lt;": "<",
    "&frasl;": "/",
  };
  let dist = "";
  let offset = 0;
  let temp = "";
  while (offset < text.length) {
    const char = text[offset];
    // 来什么就是什么
    if (temp === "" && char !== "&") {
      dist += char;
    }
    // &amp&amp; -> &amp&
    else if ((temp === "" || temp.startsWith("&")) && char === "&") {
      dist += temp;
      temp = "&";
    } else if (temp !== "") {
      temp += char;
      // 命中
      if (dict[temp]) {
        dist += dict[temp];
        temp = "";
      }
      // 没有命中
      else if (!dict[temp] && char === ";") {
        dist += temp;
        temp = "";
      }
    }
    offset++;
  }
  if (temp !== "") {
    dist += temp;
    temp = "";
  }
  return dist;
}
