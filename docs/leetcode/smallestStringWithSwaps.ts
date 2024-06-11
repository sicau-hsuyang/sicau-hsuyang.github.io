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

function smallestStringWithSwaps(s: string, pairs: number[][]): string {
  const dsu = new SimpleDsu(s.length);
}
