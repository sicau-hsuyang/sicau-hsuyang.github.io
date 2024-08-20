interface Struct {
  value: number;
  index: number;
}

export class Checkout {
  private queue: number[] = [];

  private monoQueue: Struct[] = [];

  private _right = 0;

  private _left = 0;

  constructor() {}

  get_max(): number {
    return this.monoQueue.length ? this.monoQueue[0].value : -1;
  }

  private enqueue({ value, index }: Struct) {
    while (
      this.monoQueue.length &&
      this.monoQueue[this.monoQueue.length - 1].value <= value
    ) {
      // 从右侧出队
      this.monoQueue.pop();
    }
    this.monoQueue.push({ value, index });
  }

  private dequeue() {
    while (this.monoQueue.length && this.monoQueue[0].index < this._left) {
      this.monoQueue.shift();
    }
  }

  add(value: number): void {
    this.enqueue({
      value,
      index: this._right++,
    });
    this.queue.push(value);
  }

  remove(): number {
    if (!this.queue.length) {
      return -1;
    }
    this._left++;
    this.dequeue();
    return this.queue.shift()!;
  }
}

/**
 * Your Checkout object will be instantiated and called as such:
 * var obj = new Checkout()
 * var param_1 = obj.get_max()
 * obj.add(value)
 * var param_3 = obj.remove()
 */
