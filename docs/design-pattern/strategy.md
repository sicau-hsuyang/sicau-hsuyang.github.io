## 策略模式

### 1、基本概念

**策略模式**：定义了一系列的算法家族，分别封装起来，让他们之间可以相互替换，此模式让算法的变化，不会影响到使用算法的客户。

举个实际的例子，大点儿的公司员工很多，每次到了要发工资的时候，总是会让财务焦头烂额的，但是员工基本上也就几大类，能通过进行抽象得到他们发工资的计算方法。

比如客服，客服的工资跟他的接待客诉的数量有关系；销售，销售的工资跟他卖出的产品有关系；研发，研发就比较简单了，基本上就是死工资。那对于公司的会计来说，在统计员工的工资的时候就可以根据员工的工种选择相应的计薪方式，这样就可以方便的得到结果发薪，如果有新的工种，增加相应的计薪方式即可。

策略模式所封装的算法都是在完成相同的工作，只是实现方式不同，它可以以相同的方式调用所有的算法，减少了各种算法类与使用算法类之间的耦合。策略模式的优点是简化了单元测试，每个算法都有自己的类，因此可以单独编写接口测试，比较方便。

<div align="center">
  <img :src="$withBase('/design-pattern/strategy-pattern.png')" alt="策略模式" />
</div>

以上是策略模式的`UML`图，`Strategy`抽象类（或接口），定义一套标准的范式，业务逻辑根据自身的业务实现这套范式，`Context`根据外部传入的`Strategy`进行计算。

另外在实际的开发中，策略模式可能常常会和工厂模式结合使用。

### 2、代码示例

我们就拿第一节提到的公司发工资的这个场景举例，用策略模式来解决这个问题。

```ts
abstract class SalaryStrategy {
  abstract calc(): void;
}

class CustomerServiceSalaryStrategy extends SalaryStrategy {
  calc(): void {
    console.log("客服的工资跟他接待的客诉量有一定的关系，基础工资+绩效奖金");
  }
}

class MarketingSpecialistSalaryStrategy extends SalaryStrategy {
  calc(): void {
    console.log(
      "销售的工资跟他卖出的产品有一定的关系，除此之外，卖出一件东西，公司还会给予他额外的提成，基础工资+绩效奖金+销售提成"
    );
  }
}

class DeveloperSalaryStrategy extends SalaryStrategy {
  calc(): void {
    console.log(
      "研发人员的工资是固定的工资，如果本月研发绩效不达标，会有扣款，固定工资-本月扣款"
    );
  }
}

class NormalSalaryStrategy extends SalaryStrategy {
  calc(): void {
    console.log("没有额外的要求，正常发薪即可");
  }
}

/**
 * 根据员工角色获取计薪方式
 * @param role 员工角色
 * @returns
 */
function getSalaryCalculator(role: string): SalaryStrategy {
  let stg: CustomerServiceSalaryStrategy;
  switch (role) {
    case "客服":
      stg = new CustomerServiceSalaryStrategy();
      break;
    case "销售":
      stg = new MarketingSpecialistSalaryStrategy();
      break;
    case "研发":
      stg = new DeveloperSalaryStrategy();
      break;
    default:
      stg = new NormalSalaryStrategy();
      break;
  }
  return stg;
}

class Employee {
  role: string;

  constructor(role: string) {
    this.role = role;
  }
}

class Accountant extends Employee {
  employeeList: Employee[] = [];

  constructor() {
    super("财务");
    this.addEmployee(this);
  }

  addEmployee(employee: Employee) {
    this.employeeList.push(employee);
  }

  distributeSalary() {
    console.log("~~~~~~~~~~~~~~~~开始发薪~~~~~~~~~~~~~~~");
    this.employeeList.forEach((em) => {
      const salaryStrategy = getSalaryCalculator(em.role);
      salaryStrategy.calc();
    });
    console.log(
      "~~~~~~~~~~~~~~本月工资已全数发放，如有问题请联系公司财务~~~~~~~~~~~"
    );
  }
}

function bootstrap() {
  const xiaoming = new Employee("研发");
  const xiaohong = new Employee("销售");
  const xiaogang = new Employee("客服");
  const andi = new Accountant();

  andi.addEmployee(xiaogang);
  andi.addEmployee(xiaohong);
  andi.addEmployee(xiaoming);

  andi.distributeSalary();
}
```

### 3、在前端开发中的实践

策略模式在前端开发中是非常常见的设计模式之一，也是比较容易掌握的设计模式之一。

本文就拿`vue-router`的源码举例。

`vue-router`支持两种模式：哈希模式和`history`模式

在`vue-router/src/index.js`中，会根据用户选择的模式匹配相应的路由替换规则。（以版本`3.5.4`为例）

```js
// 节选
import { HashHistory } from "./history/hash";
import { HTML5History } from "./history/html5";
import { AbstractHistory } from "./history/abstract";

export default class VueRouter {
  constructor(options: RouterOptions = {}) {
    let mode = options.mode || "hash";
    this.fallback =
      mode === "history" && !supportsPushState && options.fallback !== false;
    if (this.fallback) {
      mode = "hash";
    }
    if (!inBrowser) {
      mode = "abstract";
    }
    this.mode = mode;

    switch (mode) {
      case "history":
        this.history = new HTML5History(this, options.base);
        break;
      case "hash":
        this.history = new HashHistory(this, options.base, this.fallback);
        break;
      case "abstract":
        this.history = new AbstractHistory(this, options.base);
        break;
      default:
        if (process.env.NODE_ENV !== "production") {
          assert(false, `invalid mode: ${mode}`);
        }
    }
  }
}
```

在`vue-router/src/history`目录下，`History`类定义了一些基础的约束，面向不同`API`的实现策略，继承自`History`。

```js
// 节选自vue-router/src/history/base.js
export class History {
  // implemented by sub-classes
  +setupListeners: Function;
}
// 节选自vue-router/src/history/hash.js
export class HashHistory extends History {
  /**
   * 哈希模式用hashchange事件进行监听
   */
  setupListeners() {
    const eventType = supportsPushState ? "popstate" : "hashchange";
    window.addEventListener(eventType, handleRoutingEvent);
    this.listeners.push(() => {
      window.removeEventListener(eventType, handleRoutingEvent);
    });
  }
}
// 节选自vue-router/src/history/history.js
export class HTML5History extends History {
  /**
   * Html5 History模式用popstate事件进行监听
   */
  setupListeners() {
    window.addEventListener("popstate", handleRoutingEvent);
    this.listeners.push(() => {
      window.removeEventListener("popstate", handleRoutingEvent);
    });
  }
}
```
