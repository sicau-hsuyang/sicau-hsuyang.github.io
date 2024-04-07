interface MyTreeNode {
  val: number;
  children: MyTreeNode[];
}

export class TreeAncestor {
  root!: MyTreeNode;

  refMap: Map<number, MyTreeNode> = new Map();

  cacheMap: Map<MyTreeNode, Record<number, MyTreeNode | null>> = new Map();

  relationMap: Map<MyTreeNode, MyTreeNode> = new Map();

  constructor(n: number, parent: number[]) {
    const map: Map<number, MyTreeNode> = new Map();
    for (let i = 0; i < n; i++) {
      const parentNodeNum = parent[i];
      const parentNode = map.get(parentNodeNum);
      const node: MyTreeNode = {
        val: i,
        children: [],
      };
      map.set(i, node);
      if (parentNode) {
        parentNode.children.push(node);
        this.relationMap.set(node, parentNode);
      }
    }
    this.root = map.get(0)!;
    this.refMap = map;
    this.getKthAncestor(n - 1, n);
  }

  getKthAncestor(node: number, k: number): number {
    const treeNode = this.refMap.get(node);
    if (!treeNode) {
      return -1;
    }
    const cache = this.cacheMap.get(treeNode);
    if (cache && cache[k]) {
      return cache[k]!.val;
    }
    let offset = k - 1;
    let parentNode = this.relationMap.get(treeNode);
    while (offset > 0 && parentNode) {
      const readCache = this.cacheMap.get(parentNode!);
      if (readCache && readCache[offset]) {
        parentNode = readCache[offset]!;
        break;
      } else {
        const cacheStep = this.cacheMap.get(parentNode);
        if (!cacheStep) {
          this.cacheMap.set(parentNode, {
            [k - offset]: parentNode,
          });
        } else {
          cacheStep[k - offset] = parentNode;
        }
        offset--;
        parentNode = this.relationMap.get(parentNode);
      }
    }
    const ancestorNum = parentNode ? parentNode.val : -1;
    // 设置缓存
    const cacheNode = cache ? cache : {};
    cacheNode[k] = parentNode || null;
    this.cacheMap.set(treeNode, cacheNode);
    return ancestorNum;
  }
}

/**
 * Your TreeAncestor object will be instantiated and called as such:
 * var obj = new TreeAncestor(n, parent)
 * var param_1 = obj.getKthAncestor(node,k)
 */
