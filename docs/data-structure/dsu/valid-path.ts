class Dsu {
  /**
   * 集合存储域
   */
  private _set: number[];

  init(len: number) {
    this._set = Array.from({
      length: len,
    }).fill(-1) as number[];
  }

  /**
   * 查找元素是否在集合中，若存在，则返回根节点所在的索引，若不在，则返回-1
   * @param target 目标元素
   */
  find(target: number): number {
    let idx = target;
    while (this._set[idx] >= 0) {
      idx = this._set[idx];
    }
    return idx;
  }

  /**
   * 合并集合
   * @param set1
   * @param set2
   */
  union(set1: number, set2: number) {
    const r1 = this.find(set1);
    const r2 = this.find(set2);
    if (r1 != r2) {
      const val1 = Math.abs(this._set[r1]);
      const val2 = Math.abs(this._set[r2]);
      // 将小树贴到大树上
      if (val1 < val2) {
        this._set[r1] = r2;
      } else {
        // 如果两棵树相同，则需要将树的规模增加
        if (val1 === val2) {
          this._set[r1]--;
        }
        this._set[r2] = r1;
      }
    }
  }
}

export function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number
): boolean {
  const dsu = new Dsu();
  dsu.init(n);
  edges.forEach((edge) => {
    dsu.union(edge[0], edge[1]);
  });
  return dsu.find(source) === dsu.find(destination);
}
