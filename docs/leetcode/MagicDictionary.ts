/**
 * 定义字典树的结构
 */
class Trie {
  /**
   * 字典树的字符
   */
  char: string;
  /**
   * 字典树的结尾标记
   */
  isEnd: boolean = false;
  /**
   * 子节点
   */
  children: Record<string, Trie> = {};
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
      let trie = thisTrie[char];
      if (!trie) {
        trie = new Trie();
        trie.char = char;
        thisTrie[char] = trie;
      }
      thisTrie = trie.children;
      if (isEnd) {
        trie!.isEnd = true;
      }
    }
  }

  search(word: string, isOnce = false, record?: Record<string, Trie>): boolean {
    let thisTrie = record || this.root.children;
    const len = word.length;
    for (let i = 0; i < len; i++) {
      const char = word[i];
      const isEnd = i === len - 1;
      const trie = thisTrie[char];
      // 如果找不到的话
      if (!trie) {
        // 如果是第2次遇到，已经超过次数了
        if (isOnce) {
          return false;
        } else {
          const substr = word.substring(i + 1);
          const record = Object.values(thisTrie);
          // 如果前面的N个字符已经匹配，最后一个字符不匹配，需要看看一下最后一个字符对应的节点上是否有结尾标记即可
          if (substr === "") {
            return record.findIndex((v) => v.isEnd) >= 0;
          }
          // 继续在子树上找一个可能性存在的结果
          return record.some((trie) => {
            return this.search(substr, true, trie.children);
          });
        }
      } else {
        // 尝试找寻另外几种可能性
        if (!isOnce) {
          const substr = word.substring(i + 1);
          const record = Object.values(thisTrie);
          const exist = record.some((trie) => {
            // 要排除当前相同的路径，因为已经假设替换了
            if (trie.char === substr[0]) {
              return false;
            }
            return this.search(substr, true, trie.children);
          });
          if (exist) {
            return true;
          }
        }
        if (isEnd) {
          return trie.isEnd && isOnce;
        } else {
          thisTrie = trie.children;
        }
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
