interface Subject {
  profit(number: number): void;
}

class RealSubject implements Subject {
  profit(number: number): void {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(`you can earn money ${number} every day`);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  }
}

class ProxySubject implements Subject {
  private readSubject = new RealSubject();

  profit(number: number): void {
    if (number <= 0) {
      console.warn("salary must bigger than zero");
      return;
    }
    this.readSubject.profit(number);
  }
}

(function bootstrap() {
  const sub = new ProxySubject();
  for (let i = 0; i < 10; i++) {
    const rnd = Math.random();
    sub.profit(rnd > 0.5 ? Number.parseInt((rnd * 1000).toFixed(0)) : 0);
  }
})();
