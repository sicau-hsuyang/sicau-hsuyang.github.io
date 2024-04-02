/**
 * 定义字典树的结构
 */
class Trie {
  /**
   * 字典树的结尾标记
   */
  word?: string;
  /**
   * 字典树的字符
   */
  isEnd: boolean = false;
  /**
   * 子节点
   */
  children: Map<string, Trie> = new Map();
}

export class MagicDictionary {
  root: Trie = new Trie();

  constructor() {}

  buildDict(dictionary: string[]): void {
    dictionary.forEach((word) => {
      this.addWord(word);
    });
  }

  addWord(word: string): void {
    let thisTrie = this.root.children;
    const len = word.length;
    for (let i = 0; i < len; i++) {
      const char = word[i];
      const isEnd = i === len - 1;
      let trie = thisTrie.get(char);
      if (trie) {
        thisTrie = trie!.children;
      } else {
        trie = new Trie();
        thisTrie.set(char, trie);
        thisTrie = trie.children;
      }
      if (isEnd) {
        trie!.isEnd = true;
      }
    }
  }

  search(word: string, isOnce = false, map?: Map<string, Trie>): boolean {
    let thisTrie = map || this.root.children;
    const len = word.length;
    for (let i = 0; i < len; i++) {
      const char = word[i];
      const isEnd = i === len - 1;
      const trie = thisTrie.get(char);
      // 如果找不到的话
      if (!trie) {
        // 如果是第2次遇到，已经超过次数了
        if (isOnce) {
          return false;
        } else {
          const substr = word.substring(i + 1);
          const record = [...thisTrie.values()];
          if (substr === "") {
            return record.findIndex((v) => v.isEnd) >= 0;
          }
          return record.some((trie) => {
            return this.search(substr, true, trie.children);
          });
        }
      } else if (isEnd) {
        return trie.isEnd && isOnce;
      } else {
        thisTrie = trie.children;
      }
    }
    return false;
  }
}

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */
