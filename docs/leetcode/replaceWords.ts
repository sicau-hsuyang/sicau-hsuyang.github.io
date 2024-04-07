class Trie {
  char: string;
  isEnd: boolean = false;
  children: Record<string, Trie> = {};
}

export function replaceWords(dictionary: string[], sentence: string): string {
  const root: Trie = new Trie();
  root.char = "ROOT";
  dictionary.forEach((word) => {
    let trie = root;
    const len = word.length;
    for (let i = 0; i < len; i++) {
      const char = word[i];
      if (trie.children[char]) {
        trie = trie.children[char]!;
      } else {
        const _trie = new Trie();
        _trie.char = char;
        trie.children[char] = _trie;
        trie = _trie;
      }
      if (i === len - 1) {
        trie.isEnd = true;
      }
    }
  });
  const words = sentence.split(/\s/);
  return words
    .map((w) => {
      return replaceWord(root, w);
    })
    .join(" ");
}

/**
 * 从字典树中找到一个替换词
 * @param root
 */
function replaceWord(root: Trie, str: string): string {
  let dict = root;
  let result: string = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const subTrie = dict.children[char];
    // 如果没有找到的话，结束
    if (!subTrie) {
      result = str;
      break;
    } else {
      result = result + subTrie.char;
      // 找到了合适的结束
      if (subTrie.isEnd) {
        break;
      }
      // 否则向下找
      else {
        dict = subTrie;
      }
    }
  }
  return result;
}
