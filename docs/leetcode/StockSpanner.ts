export class StockSpanner {
  monoStack: number[] = [];

  constructor() {}

  next(price: number): number {
    let k = this.monoStack.length - 1;
    while (k >= 0 && this.monoStack[k] <= price) {
      k--;
    }
    const distance = this.monoStack.length - k;
    this.monoStack.push(price);
    return distance;
  }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
