class TimeLimitedCache {
  constructor() {}

  map: Map<number, number> = new Map();

  timerMap: Map<number, NodeJS.Timer> = new Map();

  private clear(key: number, duration) {
    const timer = setTimeout(() => {
      this.map.delete(key);
    }, duration);
    this.timerMap.set(key, timer);
  }

  private resetExpire(key: number) {
    const timer = this.timerMap.get(key);
    clearTimeout(timer);
    this.timerMap.delete(key);
  }

  set(key: number, value: number, duration: number): boolean {
    let flag = this.map.has(key);
    if (flag) {
      this.resetExpire(key);
    }
    this.map.set(key, value);
    this.clear(key, duration);
    return flag;
  }

  get(key: number): number {
    return this.map.get(key) || -1;
  }

  count(): number {
    return this.map.size;
  }
}

/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 */
