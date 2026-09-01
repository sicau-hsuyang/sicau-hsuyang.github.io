class FindUnion {
  dataSet = [];

  constructor(n) {
    for (let i = 0; i < n; i++) {
      this.dataSet.push({
        parent: -1,
        pos: i,
      });
    }
  }

  find(val) {
    const parentNode = this.dataSet[val];
    // 递归的向上找
    if (parentNode.parent >= 0) {
      const res = this.find(parentNode.parent);
      // 把自己接到根节点上去
      this.dataSet[val] = res;
      return res;
    }
    return parentNode;
  }

  union(num1, num2) {
    const root1 = this.find(num1);
    const root2 = this.find(num2);
    // 不属于一个连通分量
    if (root1.parent < root2.parent) {
      root1.parent += root2.parent;
      this.dataSet[root2.pos].parent = root1.pos;
    } else {
      root2.parent += root1.parent;
      this.dataSet[root1.pos].parent = root2.pos;
    }
  }

  counter() {
    return this.dataSet.filter((v) => v.parent < 0);
  }
}
