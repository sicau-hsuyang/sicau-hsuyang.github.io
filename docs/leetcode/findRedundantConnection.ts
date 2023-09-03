export module FindRedundantConnectionDemo {
  class Dsu {
    set: number[];

    /**
     * 初始化并查集
     * @param n
     */
    init(n: number) {
      this.set = Array.from({
        length: n,
      }).fill(-1) as number[];
    }

    /**
     * 查找num在集合中是否存在，若存在返回其所在集合的跟节点的索引（即编号），若不存在，则返回-1
     * @param num
     * @returns
     */
    find(num: number) {
      let idx = num - 1;
      while (this.set[idx] >= 0) {
        idx = this.set[idx];
      }
      return idx;
    }

    /**
     * 合并两个集合，按秩归并
     * @param num1
     * @param num2
     */
    union(num1: number, num2: number) {
      let idx1 = this.find(num1);
      let idx2 = this.find(num2);
      // 说明大家不在同一个集合内
      if (idx1 != idx2) {
        // idx1的秩小于idx2的秩
        if (this.set[idx1] > this.set[idx2]) {
          // 将idx1的跟节点指向idx2的根节点
          this.set[idx1] = idx2;
        } else {
          if (this.set[idx1] === this.set[idx2]) {
            this.set[idx1]--;
          }
          this.set[idx2] = idx1;
        }
      }
    }

    /**
     * 统计集合的个数
     * @returns
     */
    count() {
      return this.set.reduce((total, item) => {
        return total + (item < 0 ? 1 : 0);
      }, 0);
    }
  }

  export function findRedundantConnection(edges: number[][]): number[] {
    for (let i = edges.length - 1; i >= 0; i--) {
      const joinEdges = [...edges.slice(0, i), ...edges.slice(i + 1)];
      const dsu = new Dsu();
      dsu.init(edges.length);
      // 将剩余的边加入到并查集中
      joinEdges.forEach((subEdge) => {
        dsu.union(subEdge[0], subEdge[1]);
      });
      // 若留下来的边仍然只有一个跟节点，说明图是连通的，即可以构成树
      const component = dsu.count();
      if (component === 1) {
        return edges[i];
      }
    }
    return [];
  }
}
