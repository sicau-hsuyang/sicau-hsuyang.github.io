// interface Component {
//   run(): void;
// }

// class Decorator implements Component {
//   protected component: Component | null;

//   constructor(component?: Component) {
//     this.component = component || null;
//   }

//   run(): void {
//     if (this.component) {
//       this.component.run();
//     }
//   }

//   decorate(com: Component): Component {
//     this.component = com;
//     return this;
//   }
// }

// class GotoWork implements Component {
//   run(): void {
//     console.log("去上班了，不上班没有钱啊");
//   }
// }

// class TakePhotoDecorator extends Decorator {
//   run(): void {
//     console.log("拍照，记录下春天美美的花草");
//     super.run();
//   }
// }

// class LookBeautyDecorator extends Decorator {
//   run(): void {
//     console.log("男人至死是少年，不看美女怎么行呢");
//     super.run();
//   }
// }

// let work = new GotoWork();

// const take = new TakePhotoDecorator();

// const look = new LookBeautyDecorator();

// work = take.decorate(work);

// work = look.decorate(work);

// look.run();

// interface Component {
//   run(): void;
// }

// class Decorator implements Component {
//   /**
//    *
//    */
//   protected components: Set<Component> = new Set();

//   run(): void {
//     this.components.forEach((com) => {
//       com.run();
//     });
//   }

//   decorate(com: Component) {
//     // 保证唯一值
//     this.components.add(com);
//   }
// }

// class TakePhotoComponent implements Component {
//   run(): void {
//     console.log("拍照，记录下春天美美的花草");
//   }
// }

// class LookBeautyComponent implements Component {
//   run(): void {
//     console.log("男人至死是少年，不看美女怎么行呢");
//   }
// }

// class Work extends Decorator {
//   run(): void {
//     super.run();
//     console.log("要上班啊，不上班怎么有钱呢?");
//   }
// }

// const work = new Work();

// const take = new TakePhotoComponent();

// const look = new LookBeautyComponent();

// work.decorate(take);

// work.decorate(look);

// work.run();

// function log(msg: string) {
//   debugger;
//   return function (
//     value: Function,
//     prop: string,
//     descriptor: PropertyDescriptor
//   ) {
//     debugger;
//   };
// }

function log(target: Object, name: string, descriptor: PropertyDescriptor) {
  var oldValue = descriptor.value;
  descriptor.value = function () {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

class MyClass {
  @log
  handleClick() {
    console.log("用户点击了按钮");
  }
}
