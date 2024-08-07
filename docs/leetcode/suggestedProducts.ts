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

function statisticsWord(trie: TrieNode | null): string[] {
  const res: string[] = [];
  if (!trie) return res;

  const queue: TrieNode[] = [trie];
  while (queue.length) {
    const current = queue.shift()!;
    if (current.isEnd) res.push(current.word!);
    queue.push(...Object.values(current.children));
  }
  res.sort();
  return res.slice(0, 3);
}

export function suggestedProducts(
  products: string[],
  searchWord: string
): string[][] {
  const root = buildTrie(products);
  const res: string[][] = [];
  let parent: TrieNode | null = root;
  for (let i = 0; i < searchWord.length; i++) {
    const letter = searchWord[i];
    if (!parent || !parent.children[letter]) {
      res.push([]);
      parent = null; // Ensure we don't proceed further
    } else {
      const words = statisticsWord(parent.children[letter]);
      res.push(words);
      parent = parent.children[letter];
    }
  }
  return res;
}
