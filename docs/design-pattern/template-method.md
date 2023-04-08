## 模板方法模式

### 1、基本概念

模板方法模式是一个十分简单且容易掌握的设计模式，如果你在之前没有看过设计模式相关的知识点，但是在大学的课程中，面向对象编程的基本功非常扎实，你可能不由自主的就掌握了这个设计模式。

模板方法模式是一个基于继承的设计模式，它的核心思路很简单，将一些抽象化的操作抽离到基类中，将一些不太容易抽象的操作交给子类根据对应的业务实现，利用了多态的特性，从而实现代码复用。

尤其是在前几年`React Hook`没出现的时候，当时还需要用`class`编写类组件，使用模板方法模式将一些抽象的渲染内容（或公共的内容）父类渲染，子类继承父类，然后根据对应的业务重写父类的某些方法（又有点儿像`Vue`的插槽），开发效率相当高。

虽然模板方法模式是基于继承的设计模式，在`ES6`的`class`出现之前，仍然在实际开发中常用，而且，模板方法模式往往可以和很多设计模式结合使用（如：`工厂模式`，`命令模式`，`状态模式`，`职责链模式`，`策略模式`等）。

现如今的`JavaScript`已经拥抱了函数式编程，模板方法模式在使用框架编写业务代码时可能应用的场景会相对较少一些了，但是如果你开发一些库的话，这个设计模式是一个你不得不掌握的设计模式。

模板方法模式的`UML`结构图如下：

<div align="center">
  <img :src="$withBase('/design-pattern/template-method-pattern.png')" alt="模板方法模式" />
</div>

### 2、代码范式

以下是基于一个股票交易场景给出的一个实现方式，由于科创板和创业板有资产的限制，因此，将验证方法抽离到子类

```ts
abstract class ContractTransaction {
  validVolume(num: number) {
    return num % 100 === 0;
  }

  validTransactionTime(time: Date) {
    const am = [9.5 * 3600 * 1000, 11.5 * 3600 * 1000];
    const pm = [13 * 3600 * 1000, 15 * 3600 * 1000];
    const tick =
      (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()) *
        1000 +
      time.getMilliseconds();
    return (tick >= am[0] && tick <= am[1]) || (tick >= pm[0] && tick <= pm[1]);
  }

  abstract validContractRestrict(stockCode: string, assets: number): boolean;

  buy(stockCode: string, volume: number, assets: number): void {
    if (!this.validTransactionTime(new Date("2023/04/07 10:00:00"))) {
      console.log("非交易时间，无法交易");
      return;
    }
    if (!this.validVolume(volume)) {
      console.log("买卖数量必须是100的整数");
      return;
    }
    if (!this.validContractRestrict(stockCode, assets)) {
      console.log("因您的资产限制，无法买卖当前合约");
      return;
    }
    console.log(`您已成功买入合约：${stockCode}，数量：${volume}`);
  }
}

class ShangHaiContractTransaction extends ContractTransaction {
  validContractRestrict(stockCode: string, assets: number): boolean {
    if (!/^(SHSE)?688/i.test(stockCode)) {
      return true;
    }
    return /^(SHSE)?688/i.test(stockCode) && assets >= 500000;
  }
}

class ShenzhenContractTansaction extends ContractTransaction {
  validContractRestrict(stockCode: string, assets: number): boolean {
    if (!/^(SZSE)?30/i.test(stockCode)) {
      return true;
    }
    return /^(SZSE)?30/i.test(stockCode) && assets >= 100000;
  }
}

function getTransactionStrategy(stockCode): ContractTransaction {
  let stg: ContractTransaction;
  if (/^(SHSE)?6/i.test(stockCode)) {
    stg = new ShangHaiContractTransaction();
  } else {
    stg = new ShenzhenContractTansaction();
  }
  return stg;
}

(function bootstrap() {
  const stocks = ["6000036", "688688", "002230", "300059"];
  stocks.forEach((code) => {
    const stg = getTransactionStrategy(code);
    stg.buy(code, 100 * Math.floor(Math.random() * 10), 30000);
  });
  // 您已成功买入合约：6000036，数量：200
  // 因您的资产限制，无法买卖当前合约
  // 您已成功买入合约：002230，数量：800
  // 因您的资产限制，无法买卖当前合约
})();
```

对于`JS`中，如果需要抽象类，可以使用如下形式：

```js
class SomeClass {
  someMethod() {
    throw new Error("this method must be implemented by sub-class");
  }
}
```

### 3、在前端开发中的实践

在前端开发中，模板方法模式应用场景太多了，凡是在业务中有某些业务具有一定的通用性，某些场景下又具有一些特殊性，这类场景都可以用模板方法模式。

因此，就给大家看一下开源库中的模板方法模式的应用吧。

#### 在`vue-router`中的应用

它可以根据用户选择的模式决定应用特定模式的实现。

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
  // 已省略无关代码
  // implemented by sub-classes
  +setupListeners: Function;
}

// 节选自vue-router/src/history/hash.js
export class HashHistory extends History {
  // 已省略无关代码
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
  // 已省略无关代码
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

#### 在`typeorm`中的应用

在`typeorm`中（`nodejs`生态中大名鼎鼎的一个`ORM`库），它可以根据用户连接数据库，决定生成对应数据库的`SQL`**方言**（这个词能够确切的阐述不同的数据库`SQL`语句的差异，所以就像我们普通话和四川话、湖南话的差异一样，所以叫做方言特别的贴切）：

[BaseQueryRunner](https://github1s.com/typeorm/typeorm/blob/HEAD/src/query-runner/BaseQueryRunner.ts)

```ts
export abstract class BaseQueryRunner {
  // 省略代码，有兴趣的读者可以直接在github查看
}
```

[MySQLQueryRunner](https://github1s.com/typeorm/typeorm/blob/HEAD/src/driver/mysql/MysqlQueryRunner.ts)

```ts
export class MysqlQueryRunner extends BaseQueryRunner implements QueryRunner {
  // 省略无关代码，有兴趣的读者可以直接在github查看
}
```

[SqlServerRunner](https://github1s.com/typeorm/typeorm/blob/HEAD/src/driver/sqlserver/SqlServerQueryRunner.ts)

```ts
export class SqlServerQueryRunner
  extends BaseQueryRunner
  implements QueryRunner {
  // 省略代码，有兴趣的读者可以直接在github查看
}
```

其余数据库的 runner，有兴趣的同学可以自行查看。

以下是两个`Driver`的示例：

[MysqlDriver](https://github1s.com/typeorm/typeorm/blob/HEAD/src/driver/mysql/MysqlDriver.ts)

```ts
/**
 * Organizes communication with MySQL DBMS.
 */
export class MysqlDriver implements Driver {
  // 省略其他无关方法
  /**
   * Creates a query runner used to execute database queries.
   */
  createQueryRunner(mode: ReplicationMode) {
    return new MysqlQueryRunner(this, mode);
  }
}
```

[SqlServerDriver](https://github1s.com/typeorm/typeorm/blob/HEAD/src/driver/sqlserver/SqlServerDriver.ts)

```ts
/**
 * Organizes communication with SQL Server DBMS.
 */
export class SqlServerDriver implements Driver {
  // 省略其他无关方法
  /**
   * Creates a query runner used to execute database queries.
   */
  createQueryRunner(mode: ReplicationMode) {
    return new SqlServerQueryRunner(this, mode);
  }
}
```

然后在调用侧，根据数据库的环境，选择对应的`Runner`就可以了（`typeorm`是选择跟对应的`Driver`绑定，这个无关紧要，因为最终还是会根据数据库类型选择对应的`Driver`），而且日后将来需要新增新的数据库支持，再编写一套对应的`QueryRunner`实现即可，这样的设计是符合**开闭原则**的。

以下是`typeorm`的`Driver`工厂：

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
