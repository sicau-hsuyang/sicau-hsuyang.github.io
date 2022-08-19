## 字典树

我们每天都可能会用到的有道词典，但是却没有思考过计算机是如何在几十万级别的数据中快速的查出单词的含义及例句的，本文即讲述一个词频统计的高效的数据结构`字典树`。

`字典树`，也叫前缀树，是一颗`N-叉树`，典型应用是用于统计，排序和保存大量的字符串，所以经常被搜索引擎系统用于文本词频统计。

它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率非常高。

### 基本概念

如果大家不了解字典树的话，有业务需要存储一堆单词，传统的手段一般都是会考虑使用数组进行存储，然后要查找一个单词是否存在的话，我们需要对这个数组进行遍历，这个时间复杂度至少是`O(N*K)`，`N`是单词的个数，`K`是单词的长度。

这儿有个问题，就是可能有些单词是相同的，但是我们却不得不把它的共同的前缀存`M`遍，其实也是大大的浪费了空间的。

`字典树`是一种聪明的办法，它将单词拆分成字母，然后对于个字符成为一个树节点，并且指向它的后面的字符节点。这样，其实对于一些单词拥有相同的前缀的话，只需要存储一份即可，并且这样设计查询效率非常快，`O(K)`，`K`为单词的长度。

下图表示的就是一个字典树：

<div align="center">
  <img :src="$withBase('/tree/trie/trie.png')" alt="字典树" />
</div>

这个字典树目前存储的单词有：`wc`， `word`，`world`，`app`, `apple`，非蓝色节点表示的就是当前单词的结尾。

### 字典树的插入和查询

将字典树的节点定义为如下，主要是为了方便找词和统计相同单词出现的业务（如果不需要，可以去掉`times`和`word`域）

```ts
interface TrieNode {
  /**
   * 字典树当前对应的字符
   */
  char: string;

  /**
   * 如果这个位置对应的是一个单词，则次数不为0，否则为0
   */
  times: number;

  /**
   * 当前字符是否存在以当前字符结尾的单词
   */
  word: string | null;

  /**
   * 子树
   */
  children: Map<string, TrieNode> | null;
}
```

根据上述的树节点定义，字典树的查询和插入实现如下：

```ts
/**
 * 字典树
 */
class Trie {
  /**
   * 前缀树的根节点
   */
  private root = new Map<string, TrieNode>();

  /**
   * 向字典树中插入单词
   * @param word
   */
  insert(word: string) {
    let parentNode = this.root;
    let lastIndex = word.length - 1;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const isLast = i === lastIndex;
      let trieNode = parentNode.get(char);
      if (!trieNode) {
        trieNode = {
          char,
          times: isLast ? 1 : 0,
          word: isLast ? word : null,
          children: isLast ? new Map() : null,
        };
        parentNode.set(char, trieNode);
      } else if (trieNode && isLast) {
        // 更新词频和单词
        trieNode.times++;
        trieNode.word = word;
      }
      // 如果当前节点是早些时候的叶节点，继续向后插入
      if (!trieNode.children) {
        trieNode.children = new Map();
      }
      // 将父节点指针向下沉
      parentNode = trieNode.children;
    }
  }
  /**
   * 在字典树中查询单词
   * @param word
   * @returns
   */
  search(word: string) {
    let parentNode = this.root;
    let lastIndex = word.length - 1;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const isLast = i === lastIndex;
      let trieNode = parentNode.get(char);
      // 如果当前字幕不匹配。或者如果找到了尽头还没有找到，说明单词不匹配
      if (!trieNode || !trieNode.children) {
        return false;
      }
      // 如果遇到了结尾标志，需要判断以当前字母结尾的单词是不是我们想找的单词
      if (isLast) {
        return trieNode.word === word;
      }
      // 将父节点指针向下沉
      parentNode = trieNode.children;
    }
  }
}
```

### 应用场景——统计词频

<div align="center">
  <img :src="$withBase('/tree/trie/frequency_statistics.png')" alt="统计词频" />
</div>
