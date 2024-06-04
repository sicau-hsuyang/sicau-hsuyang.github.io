interface ITreeNode {
  num: number;
  children: ITreeNode[];
}

/**
 * 求以根节点root为数的最小高度树
 * @param root
 * @returns
 */
function countTreeLevel(
  root: ITreeNode,
  set: Set<number>,
  map: Map<number, number>
) {
  // 如果缓存里面有
  if (map.has(root.num)) {
    return {
      height: map.get(root.num)!,
      num: root.num,
    };
  }
  set.add(root.num);
  const children = root.children.filter((v) => !set.has(v.num));
  if (children.length === 0) {
    return {
      height: 1,
      num: root.num,
    };
  }
  const heightArr = root.children.map((v) => countTreeLevel(v, set, map));
  let max = Number.MIN_VALUE;
  let maxRoot!: { height: number; num: number };
  heightArr.forEach((res) => {
    map.set(res.num, res.height);
    if (res.height > max) {
      maxRoot = res;
      max = res.height;
    }
  });
  const { height } = maxRoot;
  return {
    height: height + 1,
    num: root.num,
  };
}

export function findMinHeightTrees(n: number, edges: number[][]): number[] {
  // 只有一个根节点
  if (edges.length === 0) {
    return [0];
  }
  const arr: ITreeNode[] = [];

  edges.forEach((edge) => {
    const [i, j] = edge;
    let node1 = arr[i];
    let node2 = arr[j];
    if (!node1) {
      node1 = arr[i] = {
        num: i,
        children: [],
      };
    }
    if (!node2) {
      node2 = arr[j] = {
        num: j,
        children: [],
      };
    }
    node1.children.push(node2);
    node2.children.push(node1);
  });

  const heightArr = arr.map((treeNode) => {
    const res = countTreeLevel(treeNode, new Set(), new Map());
    return {
      height: res.height,
      num: treeNode.num,
    };
  });

  let minHeight = Number.MAX_VALUE;
  let minHeightArr: number[] = [];
  heightArr.forEach(({ height, num }) => {
    if (minHeight > height) {
      minHeightArr = [num];
      minHeight = height;
    } else if (minHeight === height) {
      minHeightArr.push(num);
    }
  });
  return minHeightArr;
}
