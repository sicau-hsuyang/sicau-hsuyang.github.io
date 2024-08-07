/**
 * 字典树节点
 */
interface TrieNode {
  /**
   * 当前节点上是否有标记为结尾的标记
   */
  isEnd: boolean;
  /**
   * 字符
   */
  word: string | null;
  /**
   * 子节点
   */
  children: Record<string, TrieNode>;
}

/**
 * 将单词列表构建成字典树
 * @param words
 */
function buildTrie(words: string[]): Record<string, TrieNode> {
  const root: Record<string, TrieNode> = {};
  let parent: Record<string, TrieNode> = root;
  let prefix = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let len = word.length;
    for (let k = 0; k < len; k++) {
      let letter = word[k];
      const isEnd = k === len - 1;
      prefix += letter;
      // 如果树节点已经存在
      if (!parent[letter]) {
        parent[letter] = {
          word: isEnd ? prefix : null,
          isEnd,
          children: {},
        };
      }
      if (!parent[letter].isEnd && isEnd) {
        parent[letter].isEnd = true;
        parent[letter].word = prefix;
      }
      parent = parent[letter].children;
    }
    parent = root;
    prefix = "";
  }
  return root;
}

export function findWords(board: string[][], words: string[]): string[] {
  const root = buildTrie(words);

  const foundWords: Set<string> = new Set();

  /**
   * 尝试从字符串面板中找词
   * @param board
   * @param dict
   */
  function tryFindWord(
    board: string[][],
    x: number,
    y: number,
    dict: Record<string, TrieNode>
  ) {
    // 越界
    if (y < 0 || y >= board.length || x < 0 || x >= board[y].length) {
      return;
    }
    const letter = board[y][x];
    if (!dict[letter]) {
      return;
    }
    if (dict[letter].isEnd) {
      foundWords.add(dict[letter].word!);
    }
    const subDict = dict[letter].children;
    // 修改字符，防止走回头路
    board[y][x] = "";
    // 向左
    tryFindWord(board, x - 1, y, subDict);
    // 向右
    tryFindWord(board, x + 1, y, subDict);
    // 向上
    tryFindWord(board, x, y - 1, subDict);
    // 向下
    tryFindWord(board, x, y + 1, subDict);
    // 改回来
    board[y][x] = letter;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      tryFindWord(board, j, i, root);
    }
  }

  return [...foundWords.values()];
}
