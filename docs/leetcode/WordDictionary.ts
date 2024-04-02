export class WordDictionary {
  root: Trie = new Trie();

  constructor() {}

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

  search(word: string, map?: Map<string, Trie>): boolean {
    let thisTrie = map || this.root.children;
    const len = word.length;
    for (let i = 0; i < len; i++) {
      const char = word[i];
      const isEnd = i === len - 1;
      if (char !== ".") {
        const trie = thisTrie.get(char);
        if (!trie) {
          return false;
        } else if (isEnd) {
          return trie.isEnd;
        } else {
          thisTrie = trie.children;
        }
      } else {
        const substr = word.substring(i + 1);
        const record = [...thisTrie.values()];
        if (substr === "") {
          return record.findIndex((v) => v.isEnd) >= 0;
        }
        return record.some((trie) => {
          const flag = this.search(substr, trie.children);
          return flag;
        });
      }
    }
    return false;
  }
}

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

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
