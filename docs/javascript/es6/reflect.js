class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

const proto = {
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
};

// 使用 Reflect.construct 创建对象并指定自定义原型
const dog1 = Reflect.construct(Dog, ["Buddy", "Golden Retriever"], proto);
dog1.speak(); // Output: Buddy makes a sound.
console.log(dog1 instanceof Dog); // Output: true

// 使用 new 创建对象，无法直接指定自定义原型
// 以下代码会报错，因为 new 关键字无法传递第三个参数作为原型
// const dog2 = new Dog("Max", "Poodle", proto);
