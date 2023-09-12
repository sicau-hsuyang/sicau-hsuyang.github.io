interface Vertex {
  inDegree: Vertex[];
  num: number;
  outDegree: Vertex[];
}

class BuildDAG {
  ref: Vertex[];

  constructor(numCourses: number, prerequisites: number[][]) {
    // 构建依赖关系
    this.ref = Array.from({
      length: numCourses,
    }).map((_, idx) => {
      return {
        inDegree: [],
        num: idx,
        outDegree: [],
      };
    });
    prerequisites.forEach((refer) => {
      const curCourse = refer[0];
      const preCourse = refer[1];
      const cur = this.ref[curCourse];
      const pre = this.ref[preCourse];
      cur.inDegree.push(pre);
      pre.outDegree.push(cur);
    });
  }

  query(num: number, preNum: number) {
    const vertex = this.ref[num];
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

export function checkIfPrerequisite(
  numCourses: number,
  prerequisites: number[][],
  queries: number[][]
): boolean[] {
  const builder = new BuildDAG(numCourses, prerequisites);
  return queries.map((query) => {
    const cur = query[0];
    const dep = query[1];
    return builder.query(cur, dep);
  });
}
