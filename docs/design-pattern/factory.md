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
