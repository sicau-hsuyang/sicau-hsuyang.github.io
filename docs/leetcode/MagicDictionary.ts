/**
 * 定义字典树的结构
 */
interface Trie {
  // /**
  //  * 字典树的字符
  //  */
  // char: string;
  /**
   * 字典树的结尾标记
   */
  isEnd: boolean;
  /**
   * 子节点
   */
  children: Record<string, Trie>;
}

export class MagicDictionary {
  root: Record<string, Trie> = {};

  constructor() {}

  buildDict(dictionary: string[]): void {
    dictionary.forEach((word) => {
      this.addWord(word);
    });
  }

  addWord(word: string): void {
    let thisTrie = this.root;
    const len = word.length;
    let lastTrie: Trie;
    for (let i = 0; i < len; i++) {
      const char = word[i];
      // const isEnd = i === len - 1;
      let trie = thisTrie[char];
      if (!trie) {
        trie = {
          isEnd: false,
          children: {},
        };
        // trie.char = char;
        thisTrie[char] = trie;
      }
      thisTrie = trie.children;
      // if (isEnd) {
      //   trie!.isEnd = true;
      // }
      lastTrie = trie;
    }
    lastTrie!.isEnd = true;
  }

  /**
   *
   * @param char
   * @param trie
   * @param word
   * @param offset
   */
  private dfs(
    char: string,
    trie: Trie,
    word: string,
    offset: number,
    once: boolean
  ) {
    // 单词的最后一个字母
    if (offset === word.length - 1) {
      // 之前已经替换过了 或者 之前还没有替换过
      return (
        ((char === word[word.length - 1] && once) ||
          (char !== word[word.length - 1] && !once)) &&
        trie.isEnd
      );
    }
    // 如果当前字母相等
    if (char === word[offset]) {
      return Object.entries(trie.children).some(([childChar, childTrie]) => {
        return this.dfs(childChar, childTrie, word, offset + 1, once);
      });
    } else {
      // 如果还没有失配过，才进行比较，否则直接就是
      return (
        !once &&
        Object.entries(trie.children).some(([childChar, childTrie]) => {
          return this.dfs(childChar, childTrie, word, offset + 1, true);
        })
      );
    }
  }

  search(word: string): boolean {
    return Object.entries(this.root).some(([char, trie]) => {
      return this.dfs(char, trie, word, 0, false);
    });
  }
}

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */
