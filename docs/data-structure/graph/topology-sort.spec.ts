import { Edge, Graph, Vertex, topologySort } from "./topology-sort";
import { BuildDAG } from "./build-dag";

describe("topology sort", () => {
  // it("case 1", () => {
  //   const c1: Vertex = {
  //     name: "程序设计基础",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   const c2: Vertex = {
  //     name: "离散数学",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   const c3: Vertex = {
  //     name: "数据结构",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c1, c3);

  //   link(c2, c3);

  //   const c4: Vertex = {
  //     name: "微积分（上）",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   const c5: Vertex = {
  //     name: "微积分（下）",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c4, c5);

  //   const c6: Vertex = {
  //     name: "线性代数",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c5, c6);

  //   const c7: Vertex = {
  //     name: "算法分析与设计",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c3, c7);

  //   const c8: Vertex = {
  //     name: "逻辑与计算机设计基础",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   const c9: Vertex = {
  //     name: "计算机组成",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c8, c9);

  //   const c10: Vertex = {
  //     name: "操作系统",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c7, c10);
  //   link(c9, c10);

  //   const c11: Vertex = {
  //     name: "编译原理",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c7, c11);
  //   link(c9, c11);

  //   const c12: Vertex = {
  //     name: "数据库",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c7, c12);

  //   const c13: Vertex = {
  //     name: "计算理论",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c2, c13);

  //   const c14: Vertex = {
  //     name: "计算机网络",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c10, c14);

  //   const c15: Vertex = {
  //     name: "数值分析",
  //     inDegree: [],
  //     outDegree: [],
  //   };

  //   link(c6, c15);

  //   const g: Graph = {
  //     nodes: [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15],
  //     get count() {
  //       return this.nodes.length;
  //     },
  //   };

  //   topologySort(g);
  // });

  it("case 2", () => {
    const builder = new BuildDAG([
      {
        name: "程序设计基础",
        id: "c1",
        deps: "",
      },
      {
        name: "离散数学",
        id: "c2",
        deps: "",
      },
      {
        name: "数据结构",
        id: "c3",
        deps: "c1,c2",
      },
      {
        name: "微积分（上）",
        id: "c4",
        deps: "",
      },
      {
        name: "微积分（下）",
        id: "c5",
        deps: "c4",
      },
      {
        name: "线性代数",
        id: "c6",
        deps: "c5",
      },
      {
        name: "算法分析与设计",
        id: "c7",
        deps: "c3",
      },
      {
        name: "逻辑与计算机设计基础",
        id: "c8",
        deps: "",
      },
      {
        name: "计算机组成",
        id: "c9",
        deps: "c8",
      },
      {
        name: "操作系统",
        id: "c10",
        deps: "c7,c9",
      },
      {
        name: "编译原理",
        id: "c11",
        deps: "c7,c9",
      },
      {
        name: "数据库",
        id: "c12",
        deps: "c7",
      },
      {
        name: "计算理论",
        id: "c13",
        deps: "c2",
      },
      {
        name: "计算机网络",
        id: "c14",
        deps: "c10",
      },
      {
        name: "数值分析",
        id: "c15",
        deps: "c6",
      },
    ]);
    const g = builder.build();
    const res = topologySort(g);
    console.log(res.map((v) => v.name));
  });
});
