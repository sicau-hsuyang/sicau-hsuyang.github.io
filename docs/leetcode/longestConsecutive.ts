class Dsu<T> {
  private _parent: Map<T, T>;
  private _rank: Map<T, number>;
  private _size: Map<T, number>;

  constructor() {
    this._parent = new Map();
    this._rank = new Map();
    this._size = new Map();
  }

  init(values: T[]) {
    values.forEach((value) => {
      this._parent.set(value, value);
      this._rank.set(value, 0);
      this._size.set(value, 1);
    });
  }

  find(item: T): T {
    if (this._parent.get(item) !== item) {
      this._parent.set(item, this.find(this._parent.get(item)!));
    }
    return this._parent.get(item)!;
  }

  union(x: T, y: T) {
    let rootX = this.find(x);
    let rootY = this.find(y);

    if (rootX !== rootY) {
      const rankX = this._rank.get(rootX);
      const rankY = this._rank.get(rootY);
      if (rankX! > rankY!) {
        this._parent.set(rootY, rootX);
        this._size.set(rootX, this._size.get(rootX)! + this._size.get(rootY)!);
      } else if (rankX! < rankY!) {
        this._parent.set(rootX, rootY);
        this._size.set(rootY, this._size.get(rootY)! + this._size.get(rootX)!);
      } else {
        this._parent.set(rootY, rootX);
        this._size.set(rootX, this._size.get(rootX)! + this._size.get(rootY)!);
        this._rank.set(rootX, rankX! + 1);
      }
    }
  }

  maxConsecutive(): number {
    let max = 0;
    this._size.forEach((size) => {
      if (size > max) {
        max = size;
      }
    });
    return max;
  }
}

export function longestConsecutive(nums: number[]): number {
  const dsu = new Dsu();
  dsu.init(nums);
  const set = new Set(nums);
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (set.has(num - 1)) {
      dsu.union(num - 1, num);
    }
    if (set.has(num + 1)) {
      dsu.union(num, num + 1);
    }
  }
  return dsu.maxConsecutive();
}
