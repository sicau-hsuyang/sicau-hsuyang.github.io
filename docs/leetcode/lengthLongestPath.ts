interface MyDirectory {
  name: string;
  children: MyDirectory[];
}

function parser(str: string, deepth = 0): MyDirectory {
  // 如果已经解析到底了
  if (!/\n/.test(str)) {
    return {
      name: str,
      children: [],
    };
  }
  const regExp = RegExp("\\n" + "\\t".repeat(deepth) + "(?!\\t)");
  const pattern = str.split(regExp);
  const dir: MyDirectory = {
    name: pattern[0],
    children: [],
  };
  for (let i = 1; i < pattern.length; i++) {
    const subDir = parser(pattern[i], deepth + 1);
    dir.children.push(subDir);
  }
  return dir;
}

export function lengthLongestPath(input: string): number {
  // 一个文件文件名
  if (!/\n/.test(input)) {
    return input.lastIndexOf(".") > 0 ? input.length : 0;
  }
  let root: MyDirectory[];
  // 只有一个根文件夹
  if (!/\n(?!\t)/.test(input)) {
    root = [parser(input, 1)];
  } else {
    const regExp = /\n(?!\t)/;
    const groups = input.split(regExp);
    root = groups.map((g) => {
      return parser(g, 1);
    });
  }

  let maxLength = 0;

  const dfs = (path: string, dir: MyDirectory) => {
    const dist = path + "/" + dir.name;
    if (dir.children.length === 0 && dist.lastIndexOf(".") > 0) {
      if (dist.length > maxLength) {
        console.log(dist);
        maxLength = dist.length;
      }
      return;
    }
    dir.children.forEach((subDir) => {
      dfs(dist, subDir);
    });
  };

  root.forEach((dir) => {
    dfs("", dir);
  });

  return maxLength - 1;
}
