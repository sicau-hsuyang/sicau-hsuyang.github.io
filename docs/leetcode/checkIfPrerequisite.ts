interface Vertex {
  inDegree: Vertex[];
  num: number;
  outDegree: Vertex[];
}

class BuildDAG {
  refMap: number[][];

  size = 0;

  buildMap: Map<number, Vertex> = new Map();

  constructor(numCourses: number, prerequisites: number[][]) {
    this.size = numCourses;
    // 构建依赖关系
    this.refMap = Array.from({
      length: numCourses,
    }).map(() => {
      return [];
    });
    prerequisites.forEach((refer) => {
      const curCourse = refer[0];
      const preCourse = refer[1];
      this.refMap[curCourse].push(preCourse);
    });
  }

  /**
   * 生成一条由a指向b的边
   * @param a
   * @param b
   */
  link(a: Vertex, b: Vertex) {
    a.outDegree.push(b);
    b.inDegree.push(a);
  }

  /**
   * 构建一个顶点
   * @param num
   */
  buildVertex(num: number): Vertex {
    // 如果已经生成了，直接返回
    if (this.buildMap.get(num)) {
      return this.buildMap.get(num)!;
    }
    const vertex: Vertex = {
      inDegree: [],
      num,
      outDegree: [],
    };
    const deps = this.refMap[num];
    // 解析依赖的前置节点
    deps.forEach((preNum) => {
      const preVertex = this.buildVertex(preNum);
      this.link(preVertex, vertex);
    });
    this.buildMap.set(num, vertex);
    return vertex;
  }

  build() {
    const vertexList: Vertex[] = [];
    for (let num = 0; num < this.size; num++) {
      const built = this.buildVertex(num);
      vertexList.push(built);
    }
    return vertexList;
  }

  query(num: number, preNum: number) {
    const vertex = this.buildMap.get(num)!;
    const queue: Vertex[] = [];
    const map: Map<Vertex, boolean> = new Map();
    vertex.inDegree.forEach((v) => {
      map.set(v, true);
      queue.push(v);
    });
    while (queue.length) {
      const node = queue.shift()!;
      if (node.num === preNum) {
        return true;
      }
      if (node.inDegree.length) {
        node.inDegree.forEach((v) => {
          if (!map.get(v)) {
            queue.push(v);
            map.set(v, true);
          }
        });
      }
    }
    return false;
  }
}

// function topologicalSort(vertexList: Vertex[]) {
//   const map: Map<Vertex, number> = new Map();
//   const queue: Vertex[] = [];
//   let count = 0;
//   const lines: number[][] = [];
//   vertexList.forEach((v) => {
//     if (v.inDegree.length === 0) {
//       queue.push(v);
//       // 设置起点
//       lines.push([v.num]);
//     } else {
//       map.set(v, v.inDegree.length);
//     }
//   });
//   while (queue.length) {
//     const current = queue.shift()!;
//     count++;
//     current.outDegree.forEach((adjVertex) => {
//       const nextInDegree = map.get(adjVertex)!;
//       if (nextInDegree === 1) {
//         queue.push(adjVertex);
//         lines.forEach((line) => {
//           // 如果当前邻接点的入度之一是课程线中的最后一个课，说明这条线走的通
//           if (
//             adjVertex.inDegree.some((vertex) => {
//               return line[line.length - 1] === vertex.num;
//             })
//           ) {
//             // 把它加到课程线中去
//             line.push(adjVertex.num);
//           }
//         });
//       } else {
//         map.set(adjVertex, nextInDegree - 1);
//       }
//     });
//   }
//   if (count < vertexList.length) {
//     throw new Error("图中存在环，无法进行拓扑排序");
//   }
//   return lines;
// }

export function checkIfPrerequisite(
  numCourses: number,
  prerequisites: number[][],
  queries: number[][]
): boolean[] {
  const builder = new BuildDAG(numCourses, prerequisites);
  builder.build();
  return queries.map((query) => {
    const cur = query[0];
    const dep = query[1];
    return builder.query(cur, dep);
  });
}
