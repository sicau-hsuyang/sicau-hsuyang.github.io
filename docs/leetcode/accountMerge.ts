interface DsuElement<T> {
  dat: T;
  parent: number;
}

class Dsu<T> {
  set: DsuElement<T>[];

  initSection() {}

  find(val: T): number {
    for (let i = 0; i < this.set.length; i++) {
      const cur = this.set[i];
      if (cur.dat === val) {
        let p = cur.parent;
        while (this.set[p].parent >= 0) {
          p = this.set[p].parent;
        }
        return p;
      }
    }
    return -1;
  }

  union(val1: T, val2: T) {
    const idx1 = this.find(val1);
    const idx2 = this.find(val2);
    if (idx1 != idx2) {
      const size1 = Math.abs(this.set[idx1].parent);
      const size2 = Math.abs(this.set[idx2].parent);
      if (size1 > size2) {
        this.set[idx2].parent = idx1;
      } else {
        if (size1 === size2) {
          this.set[idx2].parent--;
        }
        this.set[idx1].parent = idx2;
      }
    }
  }
}

function accountsMerge(accounts: string[][]): string[][] {
  const map: Map<string, string[][]> = new Map();
  accounts.forEach((act) => {
    const userName = act[0];
    if (map.has(userName)) {
      const set = map.get(userName);
      const emailGroup = act.slice(1);
      set?.push(emailGroup);
    } else {
      const set = act.slice(1);
      map.set(userName, [set]);
    }
  });
  return [];
}
