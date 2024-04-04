class Trie {
  char: string;
  isEnd: boolean = false;
  children: Record<string, Trie> = {};
}

export function longestWord(words: string[]): string {
  const root: Trie = new Trie();
  root.char = "ROOT";
  words.forEach((word) => {
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
  const tries = Object.values(root.children);
  const results = tries
    .map((t) => {
      return findWorld(t, "");
    })
    .reduce((acc, item) => {
      return acc.concat(item);
    }, [])
    .sort((a: string, b: string) => {
      if (a.length !== b.length) {
        return b.length - a.length;
      } else {
        let offset = 0;
        while (offset < a.length) {
          if (a[offset] === b[offset]) {
            offset++;
          } else {
            return a.charCodeAt(offset) - b.charCodeAt(offset);
          }
        }
        return 0;
      }
    });
  return results[0] || '';
}

/**
 * 查找字典树
 * @param root
 */
function findWorld(root: Trie, str: string): string[] {
  if (!root.isEnd) {
    return str === "" ? [] : [str];
  } else {
    const records = Object.values(root.children);
    if (records.length === 0) {
      return [str + root.char];
    } else {
      return records
        .map((v) => {
          return findWorld(v, str + root.char);
        })
        .reduce((acc, item) => {
          return acc.concat(item);
        }, []);
    }
  }
}
