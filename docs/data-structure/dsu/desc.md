## 并查集

### 基本概念

**并查集**（`Disjoint-Set Union`，简称 `DSU`）是一种常用于处理集合分组和查找问题的数据结构。它通常用于解决以下两种主要类型的问题：

- 合并（**Union**）：将两个集合合并成一个集合，通常是根据元素的某些属性或条件进行合并。

- 查找（**Find**）：确定一个元素所属的集合，通常是查找集合中的某个代表元素。

如果你之前完全没有了解过并查集，其实也不用慌，因为它其实很简单，阅读完本文你可能就掌握了并查集的关键内容。

首先，我们先脑补一个场景，过年回家的时候，如果参加某个亲属的宴会，难免会遇到一些陌生人，为了避免尴尬，可能我们就会跟陌生人聊聊家常，比如你们家族是什么样的一个传承关系，一个不巧，竟然发现两家人的太太太太太爷爷竟然是亲兄弟（开个玩笑，哈哈哈），那你们就有一个共同的祖先，那此刻就成了大型的认亲现场了（你和陌生人合并到了一个家族集合，这就是**并**），为什么会这样呢，这个就是图论里面的传递性。

上述过程中，你在跟“陌生人”聊家族的传承关系的时候，其实就是在查询你们这个家族的祖先，这就是**查**。

### 并查集的应用

- **连通性问题**：并查集可以用于判断图中的节点是否连通。例如，可以用它来判断无向图中是否存在一条路径连接两个节点，或者用来检测图中是否存在环。

- **最小生成树算法**：在最小生成树算法中，如`Kruskal`和`Prim`算法，需要判断边是否连接了不同的分组。并查集可以用来维护每个节点所属的分组，以便在合并边的时候判断是否形成了环。

- **集合合并问题**：并查集可以用于合并多个集合，例如在社交网络中合并用户的好友关系、在图像分割中合并相邻的区域等。它可以高效地将两个集合合并成一个，并快速找到某个元素所属的集合。

- **连通分量统计**：在图论和网络分析中，可以使用并查集来统计图中的连通分量数量，从而帮助理解网络的结构和性质。

- **优化问题**：有时候，并查集也可以用于解决某些优化问题，例如最大连通子图的大小、最小生成树的权重之类的问题。

### 并查集的通用数据结构定义

并查集采用数组来定义，通用的数据结构定义如下：

```ts
interface DsuElement<T> {
  /**
   * 数据域
   */
  data: T;
  /**
   * 父节点的索引，如果为负数，则没有父节点
   */
  parent: number;
}
```

其内部是一个用数组的索引关系描述的引用关系，一般在初始化的时候即需要确定集合中元素的个数。在初始化的时候所有的节点都自成一个集合，因此，可以将其父节点的

```ts
class Dsu<T> {
  /**
   * 集合存储域
   */
  private _set: DsuElement<T>[] = [];

  /**
   * 判等依据，可以由外界设置
   * @param data
   * @param target
   * @returns
   */
  private _equalCondition = (data: T, target: T) => {
    return data === target;
  };

  /**
   * 设置判等条件
   * @param outerEqualCondition
   */
  public setEqual(outerEqualCondition: (data: T, target: T) => boolean) {
    this._equalCondition = outerEqualCondition;
  }

  /**
   * 初始化并查集
   * @param values
   */
  init(values: T[]) {
    values.forEach((v) => {
      this._set.push({
        // 初始化的时候，每个子树只有一个元素
        parent: -1,
        data: v,
      });
    });
  }

  /**
   * 查找元素是否在集合中，若存在，则返回根节点所在的索引，若不在，则返回-1
   * @param target 目标元素
   */
  find(target: T): number {
    for (let i = 0; i < this._set.length; i++) {
      // 元素在数组中能够被找到
      if (this._equalCondition(this._set[i].data, target)) {
        let pos = i;
        // 尝试找这个元素的祖先节点
        while (this._set[pos].parent >= 0) {
          pos = this._set[pos].parent;
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
  union(set1: T, set2: T) {
    // 找到集合1的根节点
    const r1 = this.find(set1);
    // 找到集合2的根节点
    const r2 = this.find(set2);
    // 如果两个集合不在一个集合，才需要进行归并
    if (r1 != r2) {
      // 根节点存储的负号代表根节点，绝对值代表集合的大小
      const val1 = Math.abs(this._set[r1].parent);
      const val2 = Math.abs(this._set[r2].parent);
      // 将小树贴到大树上
      if (val1 < val2) {
        this._set[r1].parent = r2;
      } else {
        // 如果两棵树相同，则需要将树的规模增加
        if (val1 === val2) {
          this._set[r1].parent--;
        }
        this._set[r2].parent = r1;
      }
    }
  }

  /**
   * 统计并查集中子树的个数
   * @returns
   */
  counter() {
    let size = 0;
    this._set.forEach((v) => {
      if (v.parent < 0) {
        size++;
      }
    });
    return size;
  }
}
```
