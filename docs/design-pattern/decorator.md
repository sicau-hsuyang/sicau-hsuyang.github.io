## 装饰模式

### 1、基本概念

装饰模式是为已有功能动态的添加更多功能的一种方式

当系统需要新功能的时候，是向旧的类中添加新的代码，这些新加的代码通常装饰了原有类的核心职责或者主要行为。

<div align="center">
  <img :src="$withBase('/design-pattern/decorate-pattern.png')" alt="装饰模式" />
</div>

上述`UML`图含义如下：`Decorator`不仅需要实现`Component`类，并且其内部还需要依赖一个`Component`类，具体的业务根据需要来继承`Decorator`类

### 2、代码示例

```ts

```
