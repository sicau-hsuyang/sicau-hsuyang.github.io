// interface Struct {
//   distance: number;
//   word: string;
// }

// export function findLadders(
//   beginWord: string,
//   endWord: string,
//   wordList: string[]
// ): string[][] {
//   let minDistance = Infinity;
//   let res: Array<Set<string>> = [];
//   const alphabet = "abcdefghijklmnopqrstuvwxyz";
//   const wordSet = new Set(wordList);
//   if (!wordSet.has(endWord)) {
//     return [];
//   }
//   const dfs = (
//     startWord: string,
//     path: Set<string>,
//     wordSet: Set<string>
//   ) => {
//     if (startWord === endWord) {
//       if (minDistance > path.size) {
//         minDistance = path.size;
//         res = [path];
//       } else if (minDistance === path.size) {
//         res.push(path);
//       }
//       return;
//     }
//     if (path.size >= minDistance) {
//       return;
//     }
//     for (let i = 0; i < startWord.length; i++) {
//       for (let k = 0; k < 26; k++) {
//         const nextWord =
//           startWord.slice(0, i) + alphabet[k] + startWord.slice(i + 1);
//         // 不在字典里面的跳过
//         if (!wordSet.has(nextWord)) {
//           continue;
//         } else if (!path.has(nextWord)) {
//           // children.push(nextWord);
//           const nextSet = new Set(path);
//           nextSet.add(nextWord);
//           dfs(nextWord, nextSet, wordSet);
//         }
//       }
//     }
//   };
//   const set: Set<string> = new Set();
//   set.add(beginWord);
//   dfs(beginWord, set, wordSet);
//   return res.map((v) => {
//     return [...v];
//   });
// }

export function findLadders(
  beginWord: string,
  endWord: string,
  wordList: string[]
): string[][] {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) {
    return [];
  }

  const res: string[][] = [];
  let found = false;
  let forward: Map<string, string[][]> = new Map();
  let backward: Map<string, string[][]> = new Map();
  forward.set(beginWord, [[beginWord]]);
  backward.set(endWord, [[endWord]]);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const bfs = (
    front: Map<string, string[][]>,
    back: Map<string, string[][]>,
    isForward: boolean
  ) => {
    const nextLayer = new Map<string, string[][]>();
    for (const [word, paths] of front.entries()) {
      for (let i = 0; i < word.length; i++) {
        for (let k = 0; k < 26; k++) {
          const nextWord = word.slice(0, i) + alphabet[k] + word.slice(i + 1);
          if (!wordSet.has(nextWord)) continue;

          if (back.has(nextWord)) {
            found = true;
            for (const path of paths) {
              for (const backPath of back.get(nextWord)!) {
                res.push(
                  isForward
                    ? [...path, ...backPath.reverse()]
                    : [...backPath, ...path.reverse()]
                );
              }
            }
          }

          if (!nextLayer.has(nextWord)) {
            nextLayer.set(nextWord, []);
          }
          for (const path of paths) {
            nextLayer.get(nextWord)!.push([...path, nextWord]);
          }
        }
      }
    }

    for (const word of nextLayer.keys()) {
      wordSet.delete(word);
    }

    return nextLayer;
  };

  while (forward.size > 0 && backward.size > 0 && !found) {
    if (forward.size <= backward.size) {
      forward.clear();
      forward = bfs(forward, backward, true);
    } else {
      backward.clear();
      backward = bfs(backward, forward, false);
    }
  }

  return res;
}
