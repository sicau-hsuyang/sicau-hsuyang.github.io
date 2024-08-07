interface TrieNode {
  isEnd: boolean;
  word: string | null;
  children: Record<string, TrieNode>;
}

function buildTrie(words: string[]): TrieNode {
  const root: TrieNode = {
    isEnd: false,
    word: null,
    children: {},
  };

  for (const word of words) {
    let parent = root;
    for (let k = 0; k < word.length; k++) {
      const letter = word[k];
      const isEnd = k === word.length - 1;

      if (!parent.children[letter]) {
        parent.children[letter] = {
          word: isEnd ? word : null,
          isEnd,
          children: {},
        };
      }

      parent = parent.children[letter];

      if (isEnd) {
        parent.isEnd = true;
        parent.word = word;
      }
    }
  }
  return root;
}

export function longestWord(words: string[]): string {
  const root = buildTrie(words);
  const set: Set<string> = new Set(words);

  let maxLength = -Infinity;
  let maxWord = "";
  function dfs(
    word: string,
    offset: number,
    preTire: TrieNode | null,
    trieDict: Record<string, TrieNode>
  ) {
    const targetWord = word.substring(offset);
    // 如果剩下的 就可以凑的出来，并且当前位置一定是有结尾表示
    if (offset > 0 && set.has(targetWord) && preTire && preTire.isEnd) {
      if (maxLength < word.length) {
        maxWord = word;
        maxLength = maxWord.length;
      } else if (maxLength === word.length) {
        maxWord = word > maxWord ? maxWord : word;
      }
      return;
    }
    let hasSameSuffix = true;
    Object.entries(trieDict).forEach(([prop, trie]) => {
      if (word[offset] === prop) {
        dfs(word, offset + 1, trie, trie.children);
      } else {
        hasSameSuffix = false;
      }
    });
    // 如果此刻已经没有相同的前缀了，从头又开始找
    if (!hasSameSuffix && offset > 0) {
      dfs(targetWord, 0, null, root.children);
    }
  }

  for (let i = 0; i < words.length; i++) {
    if (set.has(words[i])) {
      dfs(words[i], 0, null, root.children);
    }
  }
  return maxWord;
}
