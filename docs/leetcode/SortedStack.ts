class SortedStack {
  /**
   * 定义一个单调栈
   */
  monoStack: number[] = [];
  /**
   * 定义一个普通的栈
   */
  stack: number[] = [];

  constructor() {}

  push(val: number): void {
    this.stack.push(val);
  }

  pop(): void {
    return this.stack.pop();
  }

  peek(): number {
    
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}

/**
 * Your SortedStack object will be instantiated and called as such:
 * var obj = new SortedStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.isEmpty()
 */
