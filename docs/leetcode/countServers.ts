/**
 * 简单版本的并查集实现，即数组的索引即代表的是它所存储的数据
 */
export class SimpleDsu {
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
      const size1 = Math.abs(this._set[idx1]);
      const size2 = Math.abs(this._set[idx2]);
      // idx1的秩小于idx2的秩
      if (this._set[idx1] > this._set[idx2]) {
        // 将idx1的跟节点指向idx2的根节点
        this._set[idx1] = idx2;
        this._set[idx2] = -1 * (size1 + size2);
      } else {
        this._set[idx2] = idx1;
        this._set[idx1] = -1 * (size1 + size2);
      }
    }
  }
}

export function countServers(grid: number[][]): number {
  const colLength = grid[0].length;
  const rowLength = grid.length;
  const dsu = new SimpleDsu(rowLength * colLength);
  const map: Map<number, number> = new Map();
  let counter = 0;
  grid.forEach((row, rowIdx) => {
    row.forEach((_, cellIdx) => {
      // 空白，什么都不用做
      if (_ === 0) {
        return;
      }
      // 标记一下是否是服务器
      if (_ === 1) {
        map.set(rowIdx * colLength + cellIdx, 1);
      }
      const current = rowIdx * colLength + cellIdx;
      let tmpRowIdx = rowIdx;
      let tmpColIdx = cellIdx;
      // 除了第一行
      while (tmpRowIdx > 0) {
        // Top的服务器，判断一下是不是服务器
        const idx = (tmpRowIdx - 1) * colLength + cellIdx;
        if (map.get(idx) === 1) {
          dsu.union(idx + 1, current + 1);
        }
        tmpRowIdx--;
      }
      // 除了第一名
      while (tmpColIdx > 0) {
        // Left的服务器
        const idx = rowIdx * colLength + tmpColIdx - 1;
        if (map.get(idx) === 1) {
          dsu.union(idx + 1, current + 1);
        }
        tmpColIdx--;
      }
    });
  });
  dsu.dataSet.forEach((rank) => {
    if (rank < -1) {
      counter += Math.abs(rank);
    }
  });
  return counter;
}
