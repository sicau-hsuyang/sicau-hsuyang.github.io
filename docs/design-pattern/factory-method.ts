abstract class Product {
  abstract play(): void;
}

class iPhone extends Product {
  play(): void {
    console.log("Hi, Siri~");
  }
}

export abstract class Factory {
  abstract createDevice(): Product;
}

class TelephoneFactory extends Factory {
  createDevice(): Product {
    return new iPhone();
  }
}

// 每个工厂只需要生产一种产品
const factory: Factory = new TelephoneFactory();

const product: Product = factory.createDevice();

product.play();
