## 并查集应用之验证二叉树

> 二叉树上有`n`个节点，按从`0`到 `n - 1` 编号，其中节点`i`的两个子节点分别是`leftChild[i] 和 rightChild[i]。

只有 所有 节点能够形成且 只 形成 一颗 有效的二叉树时，返回 true；否则返回 false。

如果节点 i 没有左子节点，那么 leftChild[i] 就等于 -1。右子节点也符合该规则。

注意：节点没有值，本问题中仅仅使用节点编号。

```ts
class SimpleDsu {
  protected _set!: number[];

  public get dataSet() {
    return this._set;
  }

  constructor(n: number) {
    this.init(n);
  }

  /**
   * 初始化并查集
   * @param n
   */
  public init(n: number) {
    this._set = Array.from({
      length: n,
    }).fill(-1) as number[];
  }

  /**
   * 查找num在集合中是否存在，若存在返回其所在集合的跟节点的索引（即编号），若不存在，则返回-1
   * @param num
   * @returns
   */
  public find(num: number) {
    let idx = num - 1;
    // 查找并查集中不存在的元素
    if (idx < 0 || idx >= this._set.length) {
      return -1;
    }
    // 向上迭代寻找父元素
    while (this._set[idx] >= 0) {
      idx = this._set[idx];
    }
    return idx;
  }

  /**
   * 合并两个集合，按秩归并
   * @param num1
   * @param num2
   */
  public union(num1: number, num2: number) {
    let idx1 = this.find(num1);
    let idx2 = this.find(num2);
    // 说明大家不在同一个集合内
    if (idx1 != idx2) {
      // idx1的秩小于idx2的秩
      if (this._set[idx1] > this._set[idx2]) {
        // 将idx1的跟节点指向idx2的根节点
        this._set[idx1] = idx2;
      } else {
        if (this._set[idx1] === this._set[idx2]) {
          this._set[idx1]--;
        }
        this._set[idx2] = idx1;
      }
    }
  }

  /**
   * 统计集合的个数
   * @returns
   */
  public count() {
    return this._set.reduce((total, item) => {
      return total + (item < 0 ? 1 : 0);
    }, 0);
  }
}
function validateBinaryTreeNodes(
  n: number,
  leftChild: number[],
  rightChild: number[]
): boolean {
  const dsu = new SimpleDsu(n);
  const refMap: Map<number, number> = new Map();

  for (let i = 0; i < leftChild.length; i++) {
    const val = leftChild[i];
    if (val === -1) {
      continue;
    }
    let node1 = i + 1;
    let node2 = val + 1;
    const node1Idx = dsu.find(node1);
    const node2Idx = dsu.find(node2);
    // 当前节点已经用被用过了，并且归属于同一个集合内
    if (
      // node1所在的集合多余2个点
      (dsu.dataSet[node1Idx] < -1 &&
        // node1和node2不在一个集合内
        node1Idx === node2Idx &&
        // node2不是一个孤立的点
        dsu.dataSet[node2Idx] != -1) ||
      // node2还没有被谁引用过
      refMap.get(node2)
    ) {
      return false;
    }
    dsu.union(node1, node2);
    // 设置引用
    refMap.set(node2, node1);
  }

  for (let i = 0; i < rightChild.length; i++) {
    const val = rightChild[i];
    if (val === -1) {
      continue;
    }
    let node1 = i + 1;
    let node2 = val + 1;
    const node1Idx = dsu.find(node1);
    const node2Idx = dsu.find(node2);
    // 当前节点已经用被用过了，并且归属于同一个集合内
    if (
      (dsu.dataSet[node1Idx] < -1 &&
        dsu.dataSet[node2Idx] != -1 &&
        node1Idx === node2Idx) ||
      // node2还没有被引用过
      refMap.get(node2)
    ) {
      return false;
    }
    dsu.union(node1, node2);
    // 设置引用
    refMap.set(node2, node1);
  }
  return dsu.count() === 1;
}
```
