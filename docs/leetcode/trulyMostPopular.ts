interface DsuElement {
  /**
   * 数据域
   */
  data: string;
  /**
   * 父节点的索引，如果为负数，则没有父节点
   */
  parent: number;
}

/**
 * 静态并查集
 */
export class Dsu {
  /**
   * 集合存储域
   */
  private _set: DsuElement[] = [];

  /**
   * 判等依据
   * @param data
   * @param target
   * @returns
   */
  private getValFunc: (data: string) => unknown = (data) => data;

  /**
   * 设置判等条件
   * @param getValFunc
   */
  public setFunc(getValFunc: (data: string) => unknown) {
    this.getValFunc = getValFunc;
  }

  /**
   * 初始化并查集
   * @param v
   */
  addElement(v: string, total: number) {
    this._set.push({
      // 初始化的时候，每个子树只有一个元素，树高为1
      parent: -1 * total,
      data: v,
    });
  }

  /**
   * 比较名称
   * @param name1
   * @param name2
   */
  getSmallerName(name1: string, name2: string) {
    let i = 0;
    while (
      i < name1.length &&
      i < name2.length &&
      name1.charCodeAt(i) === name2.charCodeAt(i)
    ) {
      i++;
    }
    // 如果名称前缀不相同，谁小就返回谁
    if (i < name1.length && i < name2.length) {
      return name1.charCodeAt(i) < name2.charCodeAt(i) ? name1 : name2;
    } else {
      // 相同，返回长度较短的那个
      return name1.length < name2.length ? name1 : name2;
    }
  }

  /**
   * 查找元素是否在集合中，若存在，则返回根节点所在的索引，若不在，则返回-1
   * @param target 目标元素
   */
  find(target: unknown): number {
    for (let i = 0; i < this._set.length; i++) {
      // 元素在数组中能够被找到
      if (this.getValFunc(this._set[i].data) === target) {
        let pos = i;
        // 尝试找这个元素的祖先节点
        while (this._set[pos].parent >= 0) {
          pos = this._set[pos].parent;
        }
        // 路径压缩
        let p = i;
        while (p != pos) {
          const next = this._set[p].parent;
          this._set[p].parent = pos;
          p = next;
        }
        // 找到了，返回根节点的索引
        return pos;
      }
    }
    // INFO: 对于静态并查集，看起来似乎是为了不让程序报错的兜底返回
    // 找不到返回 -1
    return -1;
  }

  /**
   * 合并集合
   * @param set1
   * @param set2
   */
  union(set1: string, set2: string) {
    let r1 = this.find(set1);
    let r2 = this.find(set2);
    if (r1 === -1) {
      this.addElement(set1, Infinity);
      r1 = this._set.length - 1;
    }
    if (r2 === -1) {
      this.addElement(set2, Infinity);
      r2 = this._set.length - 1;
    }
    if (r1 != r2) {
      const val1 = Number.isFinite(this._set[r1].parent)
        ? Math.abs(this._set[r1].parent)
        : 0;
      const val2 = Number.isFinite(this._set[r2].parent)
        ? Math.abs(this._set[r2].parent)
        : 0;
      // NOTE: 这儿parent的绝对值代表的是树高
      // 将小树贴到大树上
      if (val1 < val2) {
        this._set[r2].parent = -1 * (val1 + val2);
        this._set[r1].parent = r2;
        const smallerName = this.getSmallerName(
          this._set[r2].data,
          this._set[r1].data
        );
        // 如果根节点较大，那就把较小的换到根节点的位置去
        if (smallerName === this._set[r1].data) {
          this._set[r1].data = this._set[r2].data;
          this._set[r2].data = smallerName;
        }
      } else {
        this._set[r1].parent = -1 * (val1 + val2);
        this._set[r2].parent = r1;
        const smallerName = this.getSmallerName(
          this._set[r1].data,
          this._set[r2].data
        );
        if (smallerName === this._set[r2].data) {
          this._set[r2].data = this._set[r1].data;
          this._set[r1].data = smallerName;
        }
      }
    }
  }

  /**
   * 统计并查集中子树的个数
   * @returns
   */
  statistics() {
    return this._set
      .filter((v) => {
        return v.parent < 0 && Number.isFinite(v.parent);
      })
      .map((v) => {
        return v.data + "(" + Math.abs(v.parent) + ")";
      }) as string[];
  }
}

export function trulyMostPopular(
  names: string[],
  synonyms: string[]
): string[] {
  const dsu = new Dsu();
  for (let i = 0; i < names.length; i++) {
    const name = names[i].replace(/\(\d+\)/, "");
    const results = names[i].match(/\((\d+)\)/) || [];
    const total = results[1];
    // @ts-ignore
    dsu.addElement(name, total);
  }
  synonyms.forEach((similar) => {
    const [a, b] = similar.replace(/[\(\)]/g, "").split(",");
    dsu.union(a, b);
  });
  return dsu.statistics();
}
