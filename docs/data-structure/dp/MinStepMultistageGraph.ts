interface Vertex {
  name: string;
  next: Edge[];
}

interface Edge {
  weight: number;

  next: Vertex;
}

const T: Vertex = {
  name: "T",
  next: [],
};

const D1: Vertex = {
  name: "D1",
  next: [
    {
      weight: 3,
      next: T,
    },
  ],
};

const D2: Vertex = {
  name: "D2",
  next: [
    {
      weight: 4,
      next: T,
    },
  ],
};

const C1: Vertex = {
  name: "C1",
  next: [
    {
      weight: 3,
      next: D1,
    },
    {
      weight: 4,
      next: D2,
    },
  ],
};

const C2: Vertex = {
  name: "C2",
  next: [
    {
      weight: 6,
      next: D1,
    },
    {
      weight: 3,
      next: D2,
    },
  ],
};

const C3: Vertex = {
  name: "C3",
  next: [
    {
      weight: 3,
      next: D1,
    },
    {
      weight: 3,
      next: D2,
    },
  ],
};

const B1: Vertex = {
  name: "B1",
  next: [
    {
      weight: 7,
      next: C1,
    },
    {
      weight: 4,
      next: C2,
    },
  ],
};

const B2: Vertex = {
  name: "B1",
  next: [
    {
      weight: 3,
      next: C1,
    },
    {
      weight: 2,
      next: C2,
    },
    {
      weight: 4,
      next: C2,
    },
  ],
};

const B3: Vertex = {
  name: "B3",
  next: [
    {
      weight: 6,
      next: C1,
    },
    {
      weight: 2,
      next: C2,
    },
    {
      weight: 5,
      next: C2,
    },
  ],
};

const A: Vertex = {
  name: "A",
  next: [
    {
      weight: 2,
      next: B1,
    },
    {
      weight: 4,
      next: B2,
    },
    {
      weight: 3,
      next: B3,
    },
  ],
};

const G: Vertex[][] = [[A], [B1, B2, B3], [C1, C2, C3], [D1, D2], [T]];

function calcMin() {
  let dp: {
    cost: number;
    path: Vertex;
  }[][] = [];
  const map = new Map();
  let pre = G[0];
  for (let i = 1; i < G.length; i++) {
    const step = G[i];
    const cost: any[] = [];
    step.forEach((node) => {
      pre.forEach((preNode) => {
        const edge = preNode.next.find((e) => e.next === node);
        map.set(node, preNode);
        const move = {
          cost: edge?.weight,
          path: node,
        };
      });
    });
    dp.push(cost);
    pre = step;
  }
}
