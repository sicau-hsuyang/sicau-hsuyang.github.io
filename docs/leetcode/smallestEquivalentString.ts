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

class Dsu {
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
  private _equalCondition = (data: string, target: string) => {
    return data === target;
  };

  /**
   * 设置判等条件
   * @param outerEqualCondition
   */
  public setEqual(
    outerEqualCondition: (data: string, target: string) => boolean
  ) {
    this._equalCondition = outerEqualCondition;
  }

  /**
   * 初始化并查集
   * @param values
   */
  init(values: string[]) {
    values.forEach((v) => {
      this._set.push({
        // 初始化的时候，每个子树只有一个元素
        parent: -1 * v.charCodeAt(0),
        data: v,
      });
    });
  }

  findMiniumCharCode(target: string) {
    const pos = this.find(target);
    if (pos === -1) {
      return -1;
    }
    const num = -1 * this._set[pos].parent;
    return num;
  }

  /**
   * 查找元素是否在集合中，若存在，则返回根节点所在的索引，若不在，则返回-1
   * @param target 目标元素
   */
  find(target: string): number {
    for (let i = 0; i < this._set.length; i++) {
      // 元素在数组中能够被找到
      if (this._equalCondition(this._set[i].data, target)) {
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
    // 找不到返回 -1
    return -1;
  }

  /**
   * 合并集合
   * @param set1
   * @param set2
   */
  union(set1: string, set2: string) {
    const r1 = this.find(set1);
    const r2 = this.find(set2);
    if (r1 != r2) {
      const val1 = Math.abs(this._set[r1].parent);
      const val2 = Math.abs(this._set[r2].parent);
      // 将小树贴到大树上
      if (val1 < val2) {
        this._set[r1].parent = r2;
        this._set[r2].parent = -val1;
      } else {
        this._set[r2].parent = r1;
        this._set[r1].parent = -val2;
      }
    }
  }
}

export function smallestEquivalentString(
  s1: string,
  s2: string,
  baseStr: string
): string {
  const dsu = new Dsu();
  const s = "abcdefghijklmnopqrstuvwxyz";
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.set(s.charCodeAt(i), s[i]);
  }
  dsu.init([...s]);
  for (let i = 0; i < s1.length; i++) {
    const left = s1[i];
    const right = s2[i];
    dsu.union(left, right);
  }
  let str = "";
  for (let i = 0; i < baseStr.length; i++) {
    const code = dsu.findMiniumCharCode(baseStr[i]);
    str += code === -1 ? baseStr[i] : map.get(code);
  }
  return str;
}
