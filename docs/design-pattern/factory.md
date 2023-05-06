## 工厂模式

### 1、基本概念

工厂模式是一种创建型设计模式，它提供了一种抽象的方式来创建对象，使得客户端代码无需关心对象的具体实现，而是只需要知道如何创建对象即可。

工厂模式通常包含一个工厂类，它的职责是创建对象，同时隐藏了对象的创建细节。客户端代码只需要通过工厂类的方法来获取需要的对象即可，而不必知道对象是如何创建的。

工厂模式的优点在于它可以帮助客户端代码避免直接依赖具体的类，从而使得代码更加灵活和可维护。它也支持更好的解耦和更高的内聚性。

常见的工厂模式包括**简单工厂模式**、**工厂方法模式**和**抽象工厂模式**。**在实际开发中，最常用的也是简单工厂模式**。

简单工厂模式：一个工厂类负责创建多个产品类的实例。这些产品类通常具有共同的父类或接口。简单工厂模式通过在工厂类中添加条件判断语句来确定要创建的对象类型。

其`UML`类图如下:

<div align="center">
  <img :src="$withBase('/design-pattern/simple-factory-pattern.png')" alt="简单工厂模式的UML图" />
</div>

基于这个`UML`类图所描述的代码设计，外界只需要传入想要生产的操作类类型，工厂负责产出相应的操作类实例，将类的创建收口到了一处，当这些操作类面临调整的时候，仅仅只需要调整一下工程方法内容的代码即可，高效，安全可控。

工厂方法模式：定义一个抽象的工厂类，该工厂类负责定义一个创建对象的接口，而其子类则负责具体实现。客户端代码只需要调用工厂类的方法来获取需要的对象，而不必知道具体的对象类型。

其`UML`类图如下:

<div align="center">
  <img :src="$withBase('/design-pattern/factory-method-pattern.png')" alt="工厂方法模式的UML图" />
</div>

上述`UML`图看起来好像挺复杂，不过，如果我们只看一个就觉得简单了。

假设目前我们只需要加法相关的操作，加法类继承运算类，加法工厂继承自工厂类，加法工厂依赖加法类（因为加法工厂只负责生产加法类的实例），是不是一下就觉得简单了许多？

**因为某些场景下，在调用部分已经明确的知道需要的操作是什么，但是我们仍然想保持以抽象的方式创建对象，这个时候使用工厂方法模式就非常合适了。**

抽象工厂模式：抽象工厂模式是工厂方法模式的扩展，它支持创建多个产品族，每个产品族可以包含多个产品类。抽象工厂模式定义了多个工厂方法，每个工厂方法负责创建一个产品族中的一组相关对象。客户端代码只需要调用工厂类的方法来获取需要的对象即可。

其`UML`类图如下:

<div align="center">
  <img :src="$withBase('/design-pattern/abstract-factory-pattern.png')" alt="抽象工厂模式的UML图" />
</div>

在某些时刻，由于我们有复杂的需求，比如我们代码跨平台（一套代码同时跑`Android`和`iOS`平台），简单工厂模式拿到的是一个一个具像化的业务类，我们不可能把跨平台的处理放到一个业务类里面去以方法名来区分（当然也不可能直接在业务里写平台的判断代码，这样任何时候执行的时候都需要判断一次），这样设计对于使用者来说心智负担太重了，正常的设计是将针对不同的平台的业务逻辑处理抽离到一个类里面去，根据环境决定加载哪个类，这个些类都一套规格（体现在一致的`API`），对于调用者来说就无关平台了，我们可以直接在程序的入口就知道当前的环境就确定使用某个平台的业务逻辑处理类。像这种**一次抽象不够，需要再次抽象的场景就是抽象工厂模式**的绝佳使用场景。

在上述`UML`所描述的内容中，我们是可以在一开始就知道我们当前使用的是那种数据库连接类型（保持了能够支持切换数据库的能力），而业务侧无感知。

### 2、代码示例

以下是简单工厂模式的代码示例，组件类都有相应的规格（体现在实现`Component`接口），用户根据传递参数控制工厂生成对应的组件实例。

```ts
// 简单工厂模式
interface Component {
  render(): void;
}

class Button implements Component {
  constructor(private text: string) {}
  render() {
    console.log(`Rendering button: ${this.text}`);
  }
}

class Input implements Component {
  constructor(private placeholder: string) {}
  render() {
    console.log(`Rendering input: ${this.placeholder}`);
  }
}

class ComponentFactory {
  static create(type: string, props: Record<string, any>): Component {
    switch (type) {
      case "button":
        return new Button(props.text);
      case "input":
        return new Input(props.placeholder);
      default:
        throw new Error(`Type ${type} is not supported`);
    }
  }
}

// 创建按钮组件
const button = ComponentFactory.create("button", { text: "Click me!" });
button.render();
```

以下是工厂方法模式的代码示例，在某个业务场景，我确实需要用到一个`Input`组件，但是不太明确将来对`Input`组件是否会进行调整，为了不影响业务侧，所以此处就不采用硬编码的方式，将来若对`Input`有调整，只需要调整工厂方法产出的内容。

```js
// 工厂方法模式
interface Component {
  render(): void;
}

class Button implements Component {
  constructor(private text: string) {}
  render() {
    console.log(`Rendering button: ${this.text}`);
  }
}

class Input implements Component {
  constructor(private placeholder: string) {}
  render() {
    console.log(`Rendering input: ${this.placeholder}`);
  }
}

abstract class ComponentFactory {
  abstract create(props: Record<string, any>): Component;
}

class ButtonFactory extends ComponentFactory {
  create(props: Record<string, any>) {
    return new Button(props.text);
  }
}

class InputFactory extends ComponentFactory {
  create(props: Record<string, any>) {
    return new Input(props.placeholder);
  }
}

// 创建输入框组件
const inputFactory = new InputFactory();
const input = inputFactory.create({ placeholder: 'Please input' });
input.render();

```

以下是抽象工厂模式的示例，目前暂定使用`ElementUI`，但是将来的某一天想替换成别的组件库，抽象工厂为我们多加入了这层抽象，所以可以应对未来组件库的替换。

```js
// 抽象工厂接口
interface UIComponentFactory {
  createButton(): ButtonComponent;
  createInput(): InputComponent;
}

// 抽象按钮组件
interface ButtonComponent {
  render(): void;
  onClick(handler: () => void): void;
}

// 抽象输入框组件
interface InputComponent {
  render(): void;
  onInput(handler: (value: string) => void): void;
}

// 具体工厂：Bootstrap 组件工厂
class BootstrapUIComponentFactory implements UIComponentFactory {
  createButton(): ButtonComponent {
    return new BootstrapButtonComponent();
  }

  createInput(): InputComponent {
    return new BootstrapInputComponent();
  }
}

// 具体工厂：Material 组件工厂
class MaterialUIComponentFactory implements UIComponentFactory {
  createButton(): ButtonComponent {
    return new MaterialButtonComponent();
  }

  createInput(): InputComponent {
    return new MaterialInputComponent();
  }
}

// 具体按钮组件：Bootstrap 按钮
class BootstrapButtonComponent implements ButtonComponent {
  render() {
    console.log("Rendering Bootstrap button component");
  }

  onClick(handler: () => void) {
    console.log("Attaching onClick event for Bootstrap button component");
  }
}

// 具体按钮组件：Material 按钮
class MaterialButtonComponent implements ButtonComponent {
  render() {
    console.log("Rendering Material button component");
  }

  onClick(handler: () => void) {
    console.log("Attaching onClick event for Material button component");
  }
}

// 具体输入框组件：Bootstrap 输入框
class BootstrapInputComponent implements InputComponent {
  render() {
    console.log("Rendering Bootstrap input component");
  }

  onInput(handler: (value: string) => void) {
    console.log("Attaching onInput event for Bootstrap input component");
  }
}

// 具体输入框组件：Material 输入框
class MaterialInputComponent implements InputComponent {
  render() {
    console.log("Rendering Material input component");
  }

  onInput(handler: (value: string) => void) {
    console.log("Attaching onInput event for Material input component");
  }
}

// 客户端代码
const bootstrapFactory = new BootstrapUIComponentFactory();
const button1 = bootstrapFactory.createButton();
const input1 = bootstrapFactory.createInput();
button1.render();
input1.render();

const materialFactory = new MaterialUIComponentFactory();
const button2 = materialFactory.createButton();
const input2 = materialFactory.createInput();
button2.render();
input2.render();
```

### 3、在前端开发中的实践

简单工厂模式在前端开发中太常见了，为大家举一些常见的例子。

以下是`typeorm`处理不同数据库连接的[实践](https://github1s.com/typeorm/typeorm/blob/HEAD/src/driver/DriverFactory.ts#L22-L96)。

```ts
/**
 * Helps to create drivers.
 */
export class DriverFactory {
  /**
   * Creates a new driver depend on a given connection's driver type.
   */
  create(connection: DataSource): Driver {
    const { type } = connection.options;
    switch (type) {
      case "mysql":
        return new MysqlDriver(connection);
      case "postgres":
        return new PostgresDriver(connection);
      case "cockroachdb":
        return new CockroachDriver(connection);
      case "sap":
        return new SapDriver(connection);
      case "mariadb":
        return new MysqlDriver(connection);
      case "sqlite":
        return new SqliteDriver(connection);
      case "better-sqlite3":
        return new BetterSqlite3Driver(connection);
      case "cordova":
        return new CordovaDriver(connection);
      case "nativescript":
        return new NativescriptDriver(connection);
      case "react-native":
        return new ReactNativeDriver(connection);
      case "sqljs":
        return new SqljsDriver(connection);
      case "oracle":
        return new OracleDriver(connection);
      case "mssql":
        return new SqlServerDriver(connection);
      case "mongodb":
        return new MongoDriver(connection);
      case "expo":
        return new ExpoDriver(connection);
      case "aurora-mysql":
        return new AuroraMysqlDriver(connection);
      case "aurora-postgres":
        return new AuroraPostgresDriver(connection);
      case "capacitor":
        return new CapacitorDriver(connection);
      case "spanner":
        return new SpannerDriver(connection);
      default:
        throw new MissingDriverError(type, [
          "aurora-mysql",
          "aurora-postgres",
          "better-sqlite3",
          "capacitor",
          "cockroachdb",
          "cordova",
          "expo",
          "mariadb",
          "mongodb",
          "mssql",
          "mysql",
          "nativescript",
          "oracle",
          "postgres",
          "react-native",
          "sap",
          "sqlite",
          "sqljs",
          "spanner",
        ]);
    }
  }
}
```

其实在`Vue`（或`React`）中，我们每天都在使用简单工厂模式，如果觉得我这句话有问题的人，一定是没有研究或框架底层的处理过程的人。

在`Vue`中有一个方法，叫做`$createElement`(即`render`函数的`h`入参)，我们可以用它得到一个一个不同类型的`VNode`，因为有了这个方法，所以`<component />`组件才能支持根据不同的参数创建不同类型的组件。

下面代码是我最近在一个组件库里面的实现，榜单需要根据参数创建不同的榜单类型，因为不同的榜单类型需要处理的业务逻辑，差异较大，为了降低业务逻辑处理的复杂度，我将其封装到了对应的组件里面去，但是对于使用者来说，仅仅只需要一个`type`参数就控制榜单的类型。

```jsx
import NormalRank from "./NormalRank.vue";
import DoubleRank from "./DoubleRank.vue";
export default {
  name: "Rank",
  props: {
    type: {
      type: String,
      required: true,
      default: "normal",
    },
  },
  inheritAttrs: false,
  components: {
    NormalRank,
    DoubleRank,
  },
  render(h) {
    const componentType = this.getRankType(this.type);
    return h(componentType, {
      // 透传props
      props: this.$attrs,
      // 透传事件
      on: this.$listeners,
      // 透传插槽，需要处理作用域插槽和普通插槽
      scopedSlots: this.$scopedSlots,
      slots: this.$slots,
    });
  },
  methods: {
    getRankType(type) {
      switch (type) {
        case "double":
          return "DoubleRank";
        default:
          return "NormalRank";
      }
    },
  },
};
```

在前端的实际开发中，工厂方法模式和抽象工厂模式不常用，因此本文不给出具有实际说服力的例子。