abstract class FlyWeight {
  abstract notify(msg: string): void;
}

class ConcreteFlyWeight extends FlyWeight {
  notify(msg: string): void {
    console.log("我是享元对象输出消息：" + msg);
  }
}

class UnsharedConcreteFlyWeight extends FlyWeight {
  notify(msg: string): void {
    console.log("我是非享元对象输出消息：" + msg);
  }
}

class FlyWeightFactory {
  private static map: Map<string, FlyWeight> = new Map();

  static {
    this.map.set("A", new ConcreteFlyWeight());
    this.map.set("B", new ConcreteFlyWeight());
  }

  static getFlyWeight(type: string): FlyWeight {
    let flyWeightInstance = this.map.get(type);
    if (!flyWeightInstance) {
      flyWeightInstance = new ConcreteFlyWeight();
      this.map.set(type, flyWeightInstance);
    }
    return flyWeightInstance;
  }
}

function bootstrap() {
  const flyA = FlyWeightFactory.getFlyWeight("A");
  const flyB = FlyWeightFactory.getFlyWeight("B");
  const flyC = FlyWeightFactory.getFlyWeight("C");
  const normalObj = new UnsharedConcreteFlyWeight();
  flyA.notify("你好，比尔盖茨~");
  flyB.notify("你好，库克~");
  flyC.notify("你好，乔布斯~");
  normalObj.notify("你好，雷军~");
}
