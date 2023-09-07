## 并查集

### 基本概念

**并查集**（`Disjoint-Set Union`，简称 `DSU`）是一种常用于处理集合分组和查找问题的数据结构。它通常用于解决以下两种主要类型的问题：

- 合并（**Union**）：将两个集合合并成一个集合，通常是根据元素的某些属性或条件进行合并。

- 查找（**Find**）：确定一个元素所属的集合，通常是查找集合中的某个代表元素。

如果你之前完全没有了解过并查集，其实也不用慌，因为它其实很简单，阅读完本文你可能就掌握了并查集的关键内容。

首先，我们先脑补一个场景，过年回家的时候，如果参加某个亲属的宴会，难免会遇到一些陌生人，为了避免尴尬，可能我们就会跟陌生人聊聊家常，比如你们家族是什么样的一个传承关系，一个不巧，竟然发现两家人的太太太太太爷爷竟然是亲兄弟（开个玩笑，哈哈哈），那你们就有一个共同的祖先，那此刻就成了大型的认亲现场了（你和陌生人合并到了一个家族集合，这就是**并**），为什么会这样呢，这个就是图论里面的传递性。

上述过程中，你在跟“陌生人”聊家族的传承关系的时候，其实就是在查询你们这个家族的祖先，这就是**查**。

### 并查集的通用数据结构定义及实现

并查集是基于数组实现的，数组的索引代表的节点，节点的值会存储一个指向它的父节点索引的域从而实现索引关系

并查集通用的数据结构定义如下：

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

先给大家看一下它的通用实现，然后我们再进行解释。

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
        // 路径压缩
        let p = i;
        while (p != pos) {
          const next = this._set[p].parent;
          this.set[p].parent = pos;
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
   * 合并集合，按秩归并
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

#### 初始化

每个节点的数据域初始化为数据内容，父节点初始化为-1，**在初始化的时候所有的节点都自成一个集合，负数可以代表其已经是根节点（非根节点的索引值肯定是大于等于 0 的），1 代表这个集合只有一个元素。**

#### 查找

要查找一个元素在集合中是否存在，先决条件肯定是需要将数据都挨个遍历一遍，如果能够找的到目标元素，说明存在，但是我们并不是直接返回这个元素的索引，而是要返回这个元素所在集合的根节点的索引，所以还需要沿着这个节点回溯到它的根节点。

```ts
class Dsu<T> {
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
        // 路径压缩
        // let p = i;
        // while (p != pos) {
        //   const next = this._set[p].parent;
        //   this.set[p].parent = pos;
        //   p = next;
        // }
        // 找到了，返回根节点的索引
        return pos;
      }
    }
    // 找不到返回 -1
    return -1;
  }
}
```

这儿会存在一个优化问题，可以看到，在 while 循环内，执行的快慢取决于链的长度（这个链的长度怎么影响的后文会阐述），我们仅需要这个集合的根节点，对于这个集合来说，所有元素的根节点都是同一个，那么，最简单的场景是不是大家都是根节点的儿子节点不就万事大吉了吗？

正是因为这个问题，所以这儿就存在一个路径压缩的优化措施。

在能够查找到目标节点的前提下，每次向上回溯尝试寻找根节点的时候我们都把当前经过的节点直接它放到最终的根节点下面去，那么下次再次查询的时候，链路就变短了，性能自然就提高了。

#### 合并

合并，首先需要找到两个元素，假设这两个元素都能找的到，如果他们都不在一个集合内的话，那肯定根节点绝对不是同一个的，如果是同一个，那么就说明这两个节点已经在一个集合内了，没必要继续操作了。

合并，怎么合并，那肯定是把一个节点的根节点的父节点指向另一个集合的根节点，但是这儿就出现了我们前文所提到的链的长度，假设 A 树高，把 B 树接到 A 树上，A 树最终的总长度肯定还是之前的高度，反之则不是了，因此这儿有一个概念就集合的**秩**，树高是秩的一种衡量方式，但前文我们已经提到了路径压缩的问题了，我们会尽量的把树压扁，因此，树的节点个数也是秩的一种衡量方式，大多数情况下推荐以节点个数结合路径压缩来做合并依据。

```ts
class Dsu<T> {
  /**
   * 合并集合，按秩归并
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
}
```

根节点存储的 parent 的绝对值代表的就是集合的节点个数，因此小的就是节点数多的那个，即代码中注释所说的将小树贴到大树上，如果两个集合的节点树相同的话，那么集合的秩需要增加 1，因为是负数，所以是将 parent 减 1

#### 统计联通性

从上文可知，如果大家都属于一个集合的话，那么只有一个根节点，如果大于 1，则说明存在多个集合。

```ts
class Dsu<T> {
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

如果不用并查集，我们要判断一个图是否是连通图，我们必须使用 DFS 或者 BFS 沿着某个节点开始遍历图，然后最后看一下有没有节点没有遍历到的。

使用并查集我们只需要描述它们之间的关系最终就能确定图是否联通。

### 并查集的应用

- **连通性问题**：并查集可以用于判断图中的节点是否连通。例如，可以用它来判断无向图中是否存在一条路径连接两个节点，或者用来检测图中是否存在环。

- **最小生成树算法**：在最小生成树算法中，如`Kruskal`和`Prim`算法，需要判断边是否连接了不同的分组。并查集可以用来维护每个节点所属的分组，以便在合并边的时候判断是否形成了环。

- **集合合并问题**：并查集可以用于合并多个集合，例如在社交网络中合并用户的好友关系、在图像分割中合并相邻的区域等。它可以高效地将两个集合合并成一个，并快速找到某个元素所属的集合。

- **连通分量统计**：在图论和网络分析中，可以使用并查集来统计图中的连通分量数量，从而帮助理解网络的结构和性质。

- **优化问题**：有时候，并查集也可以用于解决某些优化问题，例如最大连通子图的大小、最小生成树的权重之类的问题。
