/**
 * 简单版本的并查集实现，即数组的索引即代表的是它所存储的数据
 */
// class SimpleDsu {
//   protected _set!: number[];

//   public get dataSet() {
//     return this._set;
//   }

//   constructor(n: number) {
//     this.init(n);
//   }

//   /**
//    * 初始化并查集
//    * @param n
//    */
//   public init(n: number) {
//     this._set = Array.from({
//       length: n,
//     }).fill(-1) as number[];
//   }

//   /**
//    * 查找num在集合中是否存在，若存在返回其所在集合的跟节点的索引（即编号），若不存在，则返回-1
//    * @param num
//    * @returns
//    */
//   public find(num: number) {
//     let idx = num - 1;
//     // 查找并查集中不存在的元素
//     if (idx < 0 || idx >= this._set.length) {
//       return -1;
//     }
//     while (this._set[idx] >= 0) {
//       idx = this._set[idx];
//     }
//     return idx;
//   }

//   /**
//    * 合并两个集合，按秩归并
//    * @param num1
//    * @param num2
//    */
//   public union(num1: number, num2: number) {
//     let idx1 = this.find(num1);
//     let idx2 = this.find(num2);
//     // 说明大家不在同一个集合内
//     if (idx1 != idx2) {
//       // idx1的秩小于idx2的秩
//       if (this._set[idx1] > this._set[idx2]) {
//         // 将idx1的跟节点指向idx2的根节点
//         this._set[idx1] = idx2;
//       } else {
//         if (this._set[idx1] === this._set[idx2]) {
//           this._set[idx1]--;
//         }
//         this._set[idx2] = idx1;
//       }
//     }
//   }

//   /**
//    * 统计集合的个数
//    * @returns
//    */
//   public count() {
//     return this._set.reduce((total, item) => {
//       return total + (item < 0 ? 1 : 0);
//     }, 0);
//   }
// }

// export interface GeneralDsuElement<T> {
//   /**
//    * 数据域
//    */
//   dat: T;
//   /**
//    * 父节点的索引，如果为负数，则没有父节点
//    */
//   parent: number;
// }

// export class GeneralDsu<T> {
//   /**
//    * 集合存储域
//    */
//   private _set: GeneralDsuElement<T>[] = [];

//   /**
//    * 判等依据
//    * @param data
//    * @param target
//    * @returns
//    */
//   private _equalCondition = (data: T, target: T) => {
//     return data === target;
//   };

//   /**
//    * 设置判等条件
//    * @param outerEqualCondition
//    */
//   public setEqual(outerEqualCondition: (data: T, target: T) => boolean) {
//     this._equalCondition = outerEqualCondition;
//   }

//   /**
//    * 初始化并查集
//    * @param values
//    */
//   init(values: T[]) {
//     values.forEach((v) => {
//       this._set.push({
//         // 初始化的时候，每个子树只有一个元素
//         parent: -1,
//         dat: v,
//       });
//     });
//   }

//   /**
//    * 查找元素是否在集合中，若存在，则返回根节点所在的索引，若不在，则返回-1
//    * @param target 目标元素
//    */
//   find(target: T): number {
//     for (let i = 0; i < this._set.length; i++) {
//       // 元素在数组中能够被找到
//       if (this._equalCondition(this._set[i].dat, target)) {
//         let pos = i;
//         // 尝试找这个元素的祖先节点
//         while (this._set[pos].parent >= 0) {
//           // 继续向上查找根节点
//           pos = this._set[pos].parent;
//         }
//         // 路径压缩：将路径上的节点都直接连接到根节点
//         let current = i;
//         while (current !== pos) {
//           const next = this._set[current].parent;
//           this._set[current].parent = pos;
//           current = next;
//         }
//         return pos;
//       }
//     }
//     // 未找到
//     return -1;
//   }

//   /**
//    * 合并集合
//    * @param set1
//    * @param set2
//    */
//   union(set1: T, set2: T) {
//     const r1 = this.find(set1);
//     const r2 = this.find(set2);
//     if (r1 != r2) {
//       const val1 = Math.abs(this._set[r1].parent);
//       const val2 = Math.abs(this._set[r2].parent);
//       // 将小树贴到大树上
//       if (val1 < val2) {
//         this._set[r1].parent = r2;
//       } else {
//         // 如果两棵树相同，则需要将树的规模增加
//         if (val1 === val2) {
//           this._set[r1].parent--;
//         }
//         this._set[r2].parent = r1;
//       }
//     }
//   }

//   /**
//    * 统计并查集中子树的个数
//    * @returns
//    */
//   counter() {
//     let size = 0;
//     this._set.forEach((v) => {
//       if (v.parent < 0) {
//         size++;
//       }
//     });
//     return size;
//   }
// }

import { GeneralDsu } from 'leetcode-test-utils'

export function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number
): boolean {
  const dsu = new GeneralDsu();
  let counter = 1;
  dsu.init(
    Array.from({
      length: n,
    }).map(() => {
      return counter++;
    })
  );
  edges.forEach((edge) => {
    dsu.union(edge[0] + 1, edge[1] + 1);
  });
  return dsu.find(source + 1) === dsu.find(destination + 1);
}
