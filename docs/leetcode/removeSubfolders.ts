interface TrieNode {
  /**
   * 字符标识
   */
  char: string;
  /**
   * 是否含义结尾标识
   */
  isEnd: boolean;
  /**
   * 子串
   */
  children: TrieNode[];
}

// https://leetcode.cn/problems/remove-sub-folders-from-the-filesystem/
export function removeSubfolders(folder: string[]): string[] {
  const structure: TrieNode[] = [];
  let levelList = structure;
  folder.forEach((dir) => {
    const hierarchy = dir.split("/").filter((v) => v !== "");
    hierarchy.forEach((dirName, idx) => {
      const targetNode = levelList.find((v) => v.char === dirName);
      if (!targetNode) {
        // 如果是最后一个的话，说明是结尾标记
        const node: TrieNode = {
          char: dirName,
          children: [],
          isEnd: idx === hierarchy.length - 1,
        };
        levelList.push(node);
      } else {
        levelList = targetNode.children;
      }
    });
  });
  return structure.map((v) => "/" + v.char);
}
